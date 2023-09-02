import { useState } from 'preact/hooks'

export interface Props {
  password: string
}

export default (props: Props) => {
  return <div>
    <div>
      <div class="text-2xl">Create User</div>
      <p>ユーザーを作成する</p>
    </div>
    <div>
      <div>
        <div>新しいユーザーについて</div>
        <div>
          <div>
            <label>ID</label>
            <input className='border' placeholder='新しいユーザーID' />
          </div>
          <div>
            <label>Name</label>
            <input className='border' placeholder='表示名' />
          </div>
          <div>
            <label>School ID</label>
            <input className='border p-2' placeholder='School ID' />
          </div>
          <div>
            <label>連絡先</label>
            <input className='border p-2' placeholder='連絡先' />
          </div>
        </div>
      </div>
    </div>
  </div>
}
