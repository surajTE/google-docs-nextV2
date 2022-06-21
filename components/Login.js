import React from 'react'
import Button from '@mui/material/Button';
import Image from 'next/image'
import { signIn } from "next-auth/react"

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <Image 
            src="https://www.esasd.net/cms/lib/PA01001915/Centricity/Domain/1594/googleDocLogo.png"
            width={240}
            height={250}
            objectFit="contain"
        />

        <Button 
          style={{
            background: "#1f84f8", 
            color:"white", 
            width: "10%", 
            height: "30px" 
          }} 
          className="mt-10 font-semibold text-xs login" 
          onClick={signIn}
          >Login</Button>

    </div>
  )
}

export default Login