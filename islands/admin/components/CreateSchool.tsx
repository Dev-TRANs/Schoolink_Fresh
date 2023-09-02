import { useState } from 'preact/hooks'

export interface Props {
  password: string
}

export default (props: Props) => {
  return <div>
    <div>
      <div class="text-2xl">Create School</div>
      <p>学校を作成する</p>
    </div>
    <div>
      <div>
        <div>新しい学校について</div>
        <div>
          <div>
            <label>正式名称</label>
            <input className='border' placeholder='正式名称' />
          </div>
        </div>
        <div><button>学校を作成する</button></div>
      </div>
    </div>
  </div>
}
