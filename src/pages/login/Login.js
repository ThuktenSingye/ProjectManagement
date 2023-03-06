import React from 'react'
import { useState } from 'react'
import "./Login.css"
// import login hooks
import useLogin from '../../hooks/useLogin'

function Login() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {isPending, error, login} = useLogin()

  const handleSubmit = (e)=>{
    e.preventDefault()
    login(email, password)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input 
          type="email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password"
          onChange={(e)=> setPassword(e.target.value)} 
          value={password}
          required
          />
      </label>

      {!isPending && <button className='btn' onClick={handleSubmit}>Login</button>}
      {isPending && <button className='btn' disabled>Loading...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login