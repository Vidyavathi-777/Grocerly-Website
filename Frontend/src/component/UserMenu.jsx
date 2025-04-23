import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Divider from './Divider'
import Axios from '../utilis/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../redux/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utilis/AxiousToastError'
import {HiOutlineExternalLink} from 'react-icons/hi'

const UserMenu = ({close}) => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async()=>{
      try {
        const response = await Axios({
          ...SummaryApi.logOut

        })
        if(response.data.success){
          if(close){
            close()

          }
          
          dispatch(logout())
          localStorage.clear()
          toast.success(response.data.message)
          window.history.back()
          navigate("/")


        }
      } catch (error) {
        AxiosToastError(error)
        
      }

    }

    const handleClose = ()=>{
      if(close){
        close()
      }
    }
  return (
    
    <div>
      <div className='font-semibold'>My Account</div>
      <div className='text-sm flex items-center gap-2'>
        <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} </span>
        <Link  onClick={handleClose} className=" hover:bg-amber-600" to={"/dashboard/profile"} > <HiOutlineExternalLink/></Link></div>
      <Divider />
      <div className='text-sm grid gap-2 '>
        <Link onClick={handleClose} to={"/dashboard/category"} className="px-2 hover:bg-orange-200 py-1">Category</Link>
        <Link onClick={handleClose} to={"/dashboard/subcategory"} className="px-2 hover:bg-orange-200 py-1">Sub Category</Link>
        <Link onClick={handleClose} to={"/dashboard/upload-product"} className="px-2 hover:bg-orange-200 py-1">Upload Product</Link>
        <Link onClick={handleClose} to={"/dashboard/product"} className="px-2 hover:bg-orange-200 py-1">Products</Link>
        <Link onClick={handleClose} to={"/dashboard/myorders"} className="px-2 hover:bg-orange-200 py-1">My Orders</Link>
        <Link onClick={handleClose} to={"/dashboard/address"} className="px-2 hover:bg-orange-200 py-1">Save Address</Link>
        <button onClick={handleLogout} className='text-left px-2 hover:bg-orange-800 py-1' >Log Out</button>
      </div>
    </div>  
  )
}

export default UserMenu
