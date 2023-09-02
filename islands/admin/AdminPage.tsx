import { useState } from 'preact/hooks'

import CreateSchool from './components/CreateSchool.tsx'
import CreateUser from './components/CreateUser.tsx'
import ManageSchools from './components/ManageSchools.tsx'

export default () => {
  const [password, setPassword] = useState('')
  return <div class='mx-5'>
    <div class='text-3xl'>Schoolink Admin Panel</div>
    <p>SchoolinkのAdmin用パネルです。操作にはパスワードが必要です。</p>
    <div>
      <div class='my-4'>
        <label>Password:</label>
        <input type='password border p-1 ml-2' onInput={(evt) => {
          setPassword(evt.target.value)
        }} value={password} />
      </div>
      <p></p>
    </div>
    <div class='flex-col gap-4'>
      <div class='border p-2 rounded my-2 bg-white drop-shadow-md'>
        <CreateSchool password={password} />
      </div>
      <div class='border p-2 rounded my-2 bg-white drop-shadow-md'>
        <CreateUser password={password} />
      </div>
      <div class='border p-2 rounded my-2 bg-white drop-shadow-md'>
        <ManageSchools password={password} />
      </div>
    </div>
  </div>
}
