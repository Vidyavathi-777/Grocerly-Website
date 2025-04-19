import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'
import AvatarUpload from '../component/AvatarUpload'
import Axios from '../utilis/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utilis/AxiousToastError'
import toast from 'react-hot-toast'
import { setUserDetails } from '../redux/userSlice'
import fetchUserDetails from '../utilis/getUserDetails'

const Profile = () => {
    const user = useSelector(state => state.user)
    const[openAvatarEdit,setAvatarEdit] = useState(false)
    const [userData,setUserData] = useState({
        name : user.name,
        email : user.email,
        mobile : user.mobile
    })
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleOnChange = (e)=>{
        const {name,value} = e.target
        setUserData((prev) => ({
            ...prev,
            [name]: value
          }))
    }

    useEffect(()=>{
        setUserData({
            name : user.name,
            email : user.email,
            mobile : user.mobile,
        })

    },[user])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data : userData

            })
            const {data : responseData} = response
            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }
        } catch (error) {
            AxiosToastError(error)
            
        }finally{
            setLoading(false)
        }
        

    }
  return (
    <div>
        <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
            {
                user.avatar ? (
                    <img src={user.avatar} alt={user.name} 
                    className='w-full h-full '/>
                ) :(
                    <FaRegUserCircle size={60} />
                )
            }

        </div>
        <button onClick={()=>setAvatarEdit(true)} className='text-xs min-w-20  border-amber-400 hover:border-amber-500 hover:bg-amber-400  px-3 py-1 rounded-full mt-3'>
            Change Profile
        </button>
        {
            openAvatarEdit &&(

                <AvatarUpload close={()=>setAvatarEdit(false)} />
            )
        }

        {/* user details */}
        <form action="" onSubmit={handleSubmit} className='my-4 grid gap-4'>
            <div className='grid'>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' placeholder='Enter Your name' className='p-2 bg-blue-50 outline-none border focus-within:border-amber-500 rounded'  value={userData.name} name='name' onChange={handleOnChange} required/>

            </div>

            <div className='grid'>
                <label htmlFor="email">Email</label>
                <input type="email"id='email' placeholder='Enter Your email' className='p-2 bg-blue-50 outline-none border focus-within:border-amber-500 rounded'  value={userData.email} name='email' onChange={handleOnChange} required/>

            </div>

            <div className='grid'>
                <label htmlFor="mobile">Email</label>
                <input type="number"id='mobile' placeholder='Enter Your mobile number' className='p-2 bg-blue-50 outline-none border focus-within:border-amber-500 rounded'  value={userData.mobile} name='mobile' onChange={handleOnChange} required/>

            </div>

            <button className='border px-4 py-2 font-semibold hover:bg-amber-300 border-amber-300 rounded'>
                {
                    loading ? "Loading..." : "Submit" 
                }
            </button>



        </form>


      
    </div>
  )
}

export default Profile
