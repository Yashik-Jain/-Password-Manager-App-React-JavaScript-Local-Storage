import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-purple-900 text-black flex justify-between items-center gap-10 px-4 h-12'>
    <div className="logo font-bold">
        Logo
    </div>
    <ul>
        <li className='flex gap-10'>
            <a className='hover:font-bold' href="">Home</a>
            <a className='hover:font-bold' href="">About</a>
            <a className='hover:font-bold' href="">Contact</a>
        </li>
    </ul>
   </nav>
  )
}

export default Navbar
