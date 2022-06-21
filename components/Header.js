import React from 'react'
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DescriptionIcon from '@mui/icons-material/Description';
import AppsIcon from '@mui/icons-material/Apps';
import Avatar from '@mui/material/Avatar';
import { signOut, useSession} from 'next-auth/react';
         
const Header = () => {

  const {data: session} = useSession();

  return (
    <header className='flex items-center sticky top-0 z-50 px-4 py-2 shadow-md bg-white p-0 m-0'>
        
        <IconButton sx={{ p: '15px' }} aria-label="menu">
              <MenuIcon style={{ color: "#5f6368",}}/>
        </IconButton>

        <DescriptionIcon style={{ fontSize: "40px", color: "#4285f4" }}/>
        
        <h1 className='text-gray-700 text-2xl ml-2'>Docs</h1>

        <div className='flex flex-grow item-center bg-gray-100 text-gray-600 rounded-lg md:mx-20 mx-5 px-5 py-2 focus-within:text-gray-500 focus-within:shadow-md'>
          <Icon style={{ fontSize: "25px", color: "#686c71",}}>search</Icon>
          <input type="text" placeholder="Search" className='flex-grow px-5 text-base bg-transparent outline-none' />
        </div>

        <IconButton sx={{ p: '10px' }} aria-label="menu">
              <AppsIcon style={{ fontSize: "25px", color: "#5f6368",}}/>
        </IconButton>
        
        <IconButton sx={{ p: '7px' }} aria-label="menu" className='ml-3' onClick={signOut}>
          <Avatar src={session.user.image} alt="" />
        </IconButton>
        
    
    </header>
  )
}

export default Header