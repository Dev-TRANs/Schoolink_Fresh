import { useState } from 'preact/hooks'
import ky from 'ky'

export interface Props {
  password: string
}


export default (props: Props) => {
  const [schoolName, setSchoolName] = useState('')
  const [createdSchoolId, setCreatedSchoolId] = useState('')
  const [schoolsData, setSchoolsData] = useState<{
    schoolId: `${string}-${string}-${string}-${string}`,
    schoolName: string
  }[]>([])
  const syncSchoolsData = async () => {
            let result
            try {
              result = await ky.post('/admin/api', {
                json: {
                  type: 'get_schools_data',
                  password: props.password
                }
              }).json()
            } catch (error) {
              alert('エラーが発生しました。パスワードが間違っている可能性があります。')
              throw error
            }
    setSchoolsData(result.schoolsData)
  }
  return <div>
    <div>
      <div class="text-2xl">Manage Schools</div>
      <p>学校を管理する</p>
    </div>
    <div>
      <div>
        <div>
          <button class='border bg-gray-200' onClick={syncSchoolsData}>学校の情報を取得する</button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>学校ID</th>
              <th>学校名</th>
              <th>編集</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            {
              schoolsData.map(schoolData => {
                return <tr>
                  <th>{ schoolData.schoolId }</th>
                  <th>{ schoolData.schoolName }</th>
                  <th></th>
                  <th></th>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
}
