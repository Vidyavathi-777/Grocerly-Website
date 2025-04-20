import React, { useState } from "react";
import logo from "../assets/grocerly-logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import {GoTriangleDown} from "react-icons/go"
import { GoTriangleUp } from "react-icons/go";
import UseMobile from "../hooks/userMobile";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { DisplayPriceInRupees } from '../utilis/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplyCartItem';

const Header = () => {
  const [isMobile] = UseMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate()
  const [openUserMenu,setOpenUserMenu] = useState(false)
  const cartItem = useSelector(state => state.cartItem.cart)

  const user = useSelector((state) =>state?.user)
  // console.log("userdata-eader",user)

  const { totalPrice, totalQty} = useGlobalContext()
  const [openCartSection,setOpenCartSection] = useState(false)

  const redirectToLoginPage = ()=>{
    navigate('/login')

  }

  const handleUserMenu =()=>{
    setOpenUserMenu(false)
  }

  const handleMobileUser =() =>{
    if (user && user._id) {
      navigate("/user");
    } else {
      navigate("/login");
    }
    
  }

  return (
    <header className="h-30 lg:h-25 shadow-md sticky top-0 z-40 flex  flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center ">
              <img
                src={logo}
                alt="Grocerly"
                className="hidden lg:block max-h-16 object-contain"
              />
              <img
                src={logo}
                alt="Grocerly"
                className="lg:hidden max-h-16 object-contain w-auto"
              />
            </Link>
          </div>
          <div className="hidden lg:block ">
            <Search />
          </div>
          <div className="">
            {/* {mobileversion} */}
            <button onClick={handleMobileUser} className="text-neutral-600 lg:hidden" >
              <FaRegCircleUser size={26} />
            </button>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-10">
              {
                
                user?._id ? (
                  
                  <div className="relative">
                    <div onClick={()=>setOpenUserMenu(prev => !prev)} className="flex select-none items-center gap-2 cursor-pointer">
                      <p>Account</p>
                      {
                        openUserMenu ? (
                           <GoTriangleUp size={25}/> 

                        ) :(

                          <GoTriangleDown size={25}/>
                        )
                      }
                      

                    </div>
                    {
                      openUserMenu && (
                        <div className="absolute right-0 top-12">
                          <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                            <UserMenu close={handleUserMenu}/>

                          </div>
                        </div>

                      )
                    }
                    
                  </div>
                ) : (
                  
                  <button onClick={redirectToLoginPage} className="text-lg px-2"> Login </button>
                )
              }


               <button onClick={()=>setOpenCartSection(true)} className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-500 px-2 py-2 rounded text-white">
                <div className="animate-bounce">
                  <FaShoppingCart size={30}/>
                </div>
                <div className="font-semibold text-sm">
                {
                  cartItem[0] ? (
                    <div>
                        <p>{totalQty} Items</p>
                        <p>{DisplayPriceInRupees(totalPrice)}</p>
                    </div>
                  ) : (
                      <p>My Cart</p>
                      )
                }
                </div>
               </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
