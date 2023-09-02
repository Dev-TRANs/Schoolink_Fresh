import { useState } from 'preact/hooks'

import CreateSchool from './components/CreateSchool.tsx'
import CreateUser from './components/CreateUser.tsx'

export default () => {
  const [password, setPassword] = useState('')
  return <div>
    <div>Schoolink Admin Page</div>
    <div>
      <div>
        <label>Password:</label>
        <input type='password' onInput={(evt) => {
          setPassword(evt.target.value)
        }} value={password} />
      </div>
    </div>
    <div class='flex-col gap-4'>
      <div class='border p-2 rounded'>
        <CreateSchool password={password} />
      </div>
      <div class='border p-2 rounded'>
        <CreateUser password={password} />
      </div>
    </div>
  </div>
}
