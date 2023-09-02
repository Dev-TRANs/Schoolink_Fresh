import { toHashString } from '$std/crypto/to_hash_string.ts'

const encoder = new TextEncoder();

async function sha256(input: string): Promise<string> {
  const data = encoder.encode(input)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return toHashString(digest)
}

export const handler: Handlers<User | null> = {
  async POST(req, _ctx) {
    const data = await req.json()
    if (await sha256(data.password) !== Deno.env.get('ADMIN_PASSWORD_SHA256')) {
      return new Response('401 Unauthorized... Admin password is invalid.', {
        status: 401,
      })
    }
    const jsonResp = (data: any) => {
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }
    switch (data.type) {
      case 'create_school': {
        const schoolId = crypto.randomUUID()
        return jsonResp({
          schoolId: schoolId,
        })
        break;
      }
    }
    return new Response('400 Bad Request', {
      status: '400',
    })
  },
}
