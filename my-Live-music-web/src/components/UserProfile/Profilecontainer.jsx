import React from 'react'
import Profilesidebar from './Profilesidebar'
import Profilecontent from './Profilecontent'
import { Outlet } from 'react-router-dom'

const Profilecontainer = () => {
  return (
    <section className='flex '>
        <Profilesidebar/>
        <Profilecontent/>
        <Outlet/>
    </section>
  )
}

export default Profilecontainer