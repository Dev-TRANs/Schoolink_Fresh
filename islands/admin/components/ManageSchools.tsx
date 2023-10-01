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
      alert(error)
      throw error
    }
    alert(JSON.stringify(result))
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
                  <td>{ schoolData.schoolId }</td>
                  <td>{ schoolData.schoolName }</td>
                  <td onClick={async () => {
                    if (!confirm(`Do you want to edit '${schoolData.schoolName}' name?`)) return
                    const newNameInfo = prompt('What is new name?')
                    if (!newNameInfo) {
                      alert('作業を拒否しました！')
                      return
                    }
                    const newName: string = newNameInfo
                    if (!confirm(`I'm going to rename ${newName}, Ok?`)) return

                    try {
                      await ky.post('/admin/api', {
                        json: {
                          type: 'rename_school',
                          schoolId: schoolData.schoolId,
                          newName,
                          password: props.password,
                        }
                      })
                      alert('成功')
                    } catch (error) {
                      alert('エラーが発生しました。パスワードが間違っている可能性があります。')
                      alert(error)
                      throw error
                    }                 
                  }}>✏️</td>
                  <td onClick={async () => {
                    try {
                      await ky.post('/admin/api', {
                        json: {
                          type: 'remove_school',
                          password: props.password,
                          id: schoolData.schoolId,
                          password: props.password,
                        }
                      }).json()
                    } catch (error) {
                      alert('エラーが発生しました。パスワードが間違っている可能性があります。')
                      alert(error)
                      throw error
                    }
                  }}>🗑️</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
}
