import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utilis/Axios";
import AxiosToastError from "../utilis/AxiousToastError";
import fetchUserDetails from "../utilis/getUserDetails"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validateValues = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('accessToken',response.data.data.accesstoken)
        localStorage.setItem('refreshToken',response.data.data.refreshtoken)
        

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails))
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=" w-full conatainer mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-8">
        <p>Welcome to Grocerly</p>

        <form action="" onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-1 ">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              autoFocus
              name="email"
              id="email"
              placeholder="Enter Your Email"
              className="bg-blue-50 p-2 border rounded  focus:border-amber-400"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-1 ">
            <label htmlFor="password">Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-amber-400">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Your Password"
                className="w-full outline-none"
                value={data.password}
                onChange={handleChange}
              />

              <div
                className="cursor-pointer ml-2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link to={'/forgot-password'} className="block ml-auto hover:text-amber-500">Forgot Password ?</Link>
          </div>

          <button
            disabled={!validateValues}
            className={`${
              validateValues
                ? "bg-emerald-700 hover:bg-emerald-600"
                : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide `}
          >
            Login
          </button>
        </form>

        <p>
          Don't have account ?{" "}
          <Link to={"/register"} className="font-semibold text-cyan-600">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
