import { Router } from "express";
import {forgetPasswordController, loginController, logoutController, refreshToken, registerUserController, resetPassword, updateUserDetails, uploadAvatarController,  userDetails,  verifyEmailController, verifyForgotPasswordOtp} from "../controllers/users.Controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";



const userRouter = Router()

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginController)
userRouter.get('/logout',auth,logoutController)
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatarController)
userRouter.put('/update-user',auth,updateUserDetails)
userRouter.put('/forgot-password',forgetPasswordController)
userRouter.put('/verify-password-otp',verifyForgotPasswordOtp)
userRouter.put('/reset-password',resetPassword)
userRouter.post('/refresh-token',refreshToken)
userRouter.get('/user-details',auth,userDetails)

export default userRouter