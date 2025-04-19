import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utilis/Axios'
import AxiosToastError from '../utilis/AxiousToastError'
import SummaryApi from '../common/SummaryApi'
import { updatedAvatar } from '../redux/userSlice'
import {IoClose} from 'react-icons/io5'

const AvatarUpload = ({close}) => {
    const user = useSelector(state => state.user)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

    const handleUploadAvatar = async(e) =>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        const formData = new FormData()
        formData.append('avatar',file)


        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data : formData
    
            })
            const {data : responseData} = response
            dispatch(updatedAvatar(responseData.data.avatar))
            if (close) close()
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)

        }

        
    }
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center z-50'>
        <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
            <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
                <IoClose size={20}/>
            </button>

            <div className='w-20 h-20 mx-auto flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                {
                    user.avatar ? (
                        <img src={user.avatar} alt={user.name} 
                        className='w-full h-full '/>
                    ) :(
                        <FaRegUserCircle size={60} />
                    )
                }

            </div>
            <form action="" onSubmit={handleSubmit} className='mt-4 text-center'>
                <label htmlFor="uploadProfile">
                    <div className='text-xs min-w-20 cursor-pointer border-amber-400 hover:border-amber-500 hover:bg-amber-400 hover:text-white  px-3 py-1 rounded-full mt-3'>
                        
                        {
                            loading ? "Loading..." : "Upload"
                        }
                    </div>
                    <input onChange={handleUploadAvatar} type="file" id="uploadProfile" className='hidden' />
                    {/* <button className='border-amber-500 bg-amber-600 px-4 py-1 rounded tect-sm my-3'>Upload</button> */}
                </label>
            </form>
            

        </div>

    </section>
  )
}

export default AvatarUpload
