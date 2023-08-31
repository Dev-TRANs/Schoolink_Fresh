import { useState } from 'preact/hooks'

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
    <div>
      <div>

      </div>
    </div>
  </div>
}
