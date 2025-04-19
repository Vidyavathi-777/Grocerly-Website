import React, { useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utilis/Axios";
import AxiosToastError from "../utilis/AxiousToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
   
  });

  

  const navigate = useNavigate();

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
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification-otp",{
          state : data
        });
        setData({
          email: "",
          
        });
       
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=" w-full conatainer mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-8">
        <p className="font-bold texxt-lg">Forgot Password</p>

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

          

          <button
            disabled={!validateValues}
            className={`${
              validateValues
                ? "bg-emerald-700 hover:bg-emerald-600"
                : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide `}
          >
            Send Otp
          </button>
        </form>

        <p>
          Already have Account?{" "}
          <Link to={"/login"} className="font-semibold text-cyan-600">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
