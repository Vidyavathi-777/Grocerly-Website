import React, { use, useState } from 'react'
import { FaRegEyeSlash } from 'react-icons/fa6'
import { FaRegEye } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utilis/Axios'
import AxiosToastError from '../utilis/AxiousToastError'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const [data,setData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange =(e) =>{
    const{name,value} = e.target
    setData((prev)=>{
      return{
        ...prev,[name] : value
      }

    })

  }

  const validateValues = Object.values(data).every(el => el)

  const handleSubmit =async(e) =>{
    e.preventDefault();

    if(data.password !== data.confirmPassword){
      toast.error("Passowrd and ConfirmPassword must be Same")
      return;

    }
    try{
      const response = await Axios({
        ...SummaryApi.register,
        data : data
      })

      if(response.data.error){
        toast.error(response.data.message)
      }
      if(response.data.success){
        toast.success(response.data.message)
        setData({
          name:"",
          email:"",
          password:"",
          confirmPassword:""
        })
        navigate("/login")
      }
    }catch(error){
      AxiosToastError(error)
    }

    
  }

  return (
    <section className=' w-full conatainer mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-8'>
        <p>Welcome to Grocerly</p>
        <form action="" onSubmit={handleSubmit} className='grid gap-4 mt-5'>
          <div className='grid gap-1 '>
            <label htmlFor="name">Name :</label>
            <input 
              type="text"
              autoFocus 
              name='name'
              id='name'
              placeholder='Enter Your Name'
              className='bg-blue-50 p-2 border rounded focus:border-amber-400'
              value={data.name} 
              onChange={handleChange}/>
          </div>

          <div className='grid gap-1 '>
            <label htmlFor="email">Email :</label>
            <input 
              type="email"
              autoFocus 
              name='email'
              id='email'
              placeholder='Enter Your Email'
              className='bg-blue-50 p-2 border rounded  focus:border-amber-400'
              value={data.email} 
              onChange={handleChange}/>
          </div>

          <div className='grid gap-1 '>
            <label htmlFor="password">Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-amber-400'>
              <input 
                type={showPassword ? "text" : "password"} 
                
                name='password'
                id='password'
                placeholder='Enter Your Password'
                className='w-full outline-none'
                value={data.password} 
                onChange={handleChange}/>

              <div 
                className='cursor-pointer ml-2'
                onClick={()=>setShowPassword(prev => !prev)} 
              >
                {
                  showPassword ?(
                    <FaRegEye/>
                  ) :(
                    <FaRegEyeSlash />
                  )
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1 '>
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-amber-400'>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                
                name='confirmPassword'
                id='confirmPassword'
                placeholder='Enter Your ConfirmPassword'
                className='w-full outline-none'
                value={data.confirmPassword} 
                onChange={handleChange}/>

              <div 
                className='cursor-pointer ml-2'
                onClick={()=>setShowConfirmPassword(prev => !prev)} 
              >
                {
                  showConfirmPassword ?(
                    <FaRegEye/>
                  ) :(
                    <FaRegEyeSlash />
                  )
                }
              </div>
            </div>
            
          </div>

          <button disabled={!validateValues} className={`${validateValues ? "bg-emerald-700 hover:bg-emerald-600" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide `}>
            Register
          </button>
        </form>

        <p>Already have account ? <Link to={'/login'}
        className='font-semibold text-cyan-600'>Login</Link></p>
      </div>
        
    </section>

  )
}

export default Register
