import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import UseMobile from '../hooks/userMobile'

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage,setIsSearchPage]  = useState(false)
    const [isMobile] = UseMobile()

    useEffect(()=>{
        const page = location.pathname === '/search'
        setIsSearchPage(page)
    },[location])

    
    const redirectToSearchPage =() =>{
        navigate("/search")

    }



  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h -11 lg: h-12 rounded-lg border overflow-hidden flex items-center  text-neutral-500 bg-slate-50 group focus-within:border-amber-300'>
        <div className='flex justify-center items-center h-full p-2 m-1'>
            
            {
                (isMobile && isSearchPage) ?(
                    <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-yellow-300 bg-white rounded-full shadow-md'>
                        <FaArrowLeft size={15} />
                    </Link>

                ) :(
                    <button className='flex justify-center items-center h-full p-3 group-focus-within:text-yellow-300'>
                        <FaSearch size={15}/>
                    </button>

                )
            }

           
        </div>
         <div className='w-full h-full'>
            {
                !isSearchPage ? (
                    <div onClick={redirectToSearchPage} className='w-full h-full flex  items-center'>
                    <TypeAnimation
                    sequence={[
                        'Search "milk"',1000,
                        'Search "bread"',1000,
                        'Search "rice"',1000
        
        
                    ]}
                    wrapper='span'
                    speed={50}
                    repeat={Infinity}
                    />
                    </div>

                ) : (
                   <div className='w-full h-full'> 
                    <input type='text' placeholder='Search for atta dal and more '
                    autoFocus
                    className='bg-transparent w-full h-full outline-none' />
                   </div>


                )
            }

         </div>

       
      
    </div>
  )
}

export default Search
