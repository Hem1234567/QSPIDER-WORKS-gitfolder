import React from 'react'
import Profilesidebar from './Profilesidebar'
import Profilecontent from './Profilecontent'

const Profilecontainer = () => {
  return (
    <section className='flex '>
        <Profilesidebar/>
        <Profilecontent/>
    </section>
  )
}

export default Profilecontainer