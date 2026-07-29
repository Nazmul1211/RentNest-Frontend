"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useActionState, useEffect } from 'react'
import LoginAction from '../_actions/authAction'


const LoginForm = () => {
  const [state, action, pending] = useActionState(LoginAction, false);


  return (
    <form action={action} className='space-y-4'>
      <Card className='p-5 space-y-4 '>
        <Input name='email' type='email' placeholder='Enter Your Email' required/>
        <Input name='password' type='password' placeholder='Enter Your Password' required/>
        <Button className='bg-cyan-500' type='submit'>
          {
            pending ? "Submitting..." : "Login"
          }
        </Button>
      </Card>
    </form>
  )
}

export default LoginForm