import { toHashString } from '$std/crypto/to_hash_string.ts'
import type { School } from '~/types/schools.ts'

const kv = await Deno.openKv()

const encoder = new TextEncoder()

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
        await kv.atomic()
          .set(['schools', schoolId], {
            schoolName: data.schoolName,
            schoolId,
          })
          .commit()
        return jsonResp({
          schoolId: schoolId,
        })
        break
      }
      case 'get_schools_data': {
        const result: School[] = []
        
        const entries = kv.list({ prefix: ["schools"] }) // schools一覧をDBから取得
        for await (const entry of entries) {
          const data = entry.value as School
          result.push(data)
        }
        return jsonResp({
          schoolsData: result,
        })
        break
      }
      case 'rename_school': {
        // Rename School
        await kv.set(['schools', data.schoolId], {
          schoolId: data.schoolId,
          schoolName: data.newName,
        })
        return jsonResp({
          status: 'ok',
        })
      }
      case 'remove_school': {
        // Rename School
        await kv.delete(['schools', data.id])
        return jsonResp({
          status: 'ok',
        })
      }
    }
    return new Response('400 Bad Request', {
      status: '400',
    })
  },
}
