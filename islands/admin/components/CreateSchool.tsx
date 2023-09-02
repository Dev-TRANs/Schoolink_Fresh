import { useState } from 'preact/hooks'
import ky from 'ky'

export interface Props {
  password: string
}

export default (props: Props) => {
  const [schoolName, setSchoolName] = useState('')
  const [createdSchoolId, setCreatedSchoolId] = useState('')
  
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
            <input className='border' placeholder='正式名称' value={schoolName} onInput={e => setSchoolName(e.target.value)}/>
          </div>
        </div>
        <div>
          <button class='border bg-gray-200' onClick={async () => {
            if (!confirm(`${schoolName}という学校を作成しますか？`)) {
              return
            }
            let result
            try {
              result = await ky.post('/admin/api', {
                json: {
                  type: 'create_school',
                  schoolName: schoolName,
                }
              }).json()
            } catch (_error) {
              alert('エラーが発生しました。パスワードが間違っている可能性があります。')
              alert(_error)
            }
            setCreatedSchoolId(result.schoolId)
          }}>学校を作成する</button>
        </div>
        {
          createdSchoolId &&<div>
            <div>{ schoolName }の作成に成功しました！</div>
            <div>
              <div>IDは、 {createdSchoolId}です。</div>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
}
