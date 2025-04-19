import React, { useState ,useRef, useEffect} from "react";

import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utilis/Axios";
import AxiosToastError from "../utilis/AxiousToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";


const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([])
  const location = useLocation()

  useEffect(() =>{
    if(!location?.state?.email){
        navigate("/forgot-password")
    }

  },[])

  const validateValues = data.every((el) => el);

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp,
        data: {
            otp : data.join(""),
            email : location?.state?.email
        }
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password",{
          state :{
            data : response.data,
            email:location.state?.email,
          }
        });

      }

      console.log("OTP:", data.join(""));
      console.log("Email from location.state:", location?.state?.email);

    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=" w-full conatainer mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-8">
        <p className="font-bold text-lg">Enter Otp</p>

        <form action="" onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-1 ">
            <label htmlFor="otp">Enter Your Otp :</label>
            <div className="flex items-center gap-2 justify-between mt-2">
              {data.map((element, index) => {
                return (
                  <input
                    key={"otp"+index}
                    type="text"
                    id="otp"
                    ref={(ref)=>{
                        inputRef.current[index] = ref
                        return ref

                    }}
                    value={data[index]}
                    onChange={(e) =>{
                        const value = e.target.value
                        const newData = [...data]
                        newData[index] = value
                        setData(newData)

                        if(value && index < 5){
                            inputRef.current[index + 1].focus()
                        }
                    }}
                    maxLength={1}
                    className="bg-blue-50 w-full max-w-16 p-2  border rounded outline-none focus:border-amber-400 text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!validateValues}
            className={`${
              validateValues
                ? "bg-emerald-700 hover:bg-emerald-600"
                : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide `}
          >
            Verify Otp
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

export default OtpVerification;
