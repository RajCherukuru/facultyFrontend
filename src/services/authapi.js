import toast from "react-hot-toast"
import { setToken, setLoading } from "../Components/reducer/slices/authSlice"
import { apiConnector } from "./apiconnector"
import { setUser } from "../Components/reducer/slices/profileSlice"
import { useSelector } from "react-redux"
import {login_api, password_reset_token_api, password_reset_api} from "./apis"


export function login(email, password, navigate) {




    return async (dispatch, getState) => {
      const toastId = toast.loading("Loading...")
      console.log("we are at login method")

      dispatch(setLoading(true))
      try {

        const response = await apiConnector("POST", login_api, {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        dispatch(setUser(response.data.dbuser.role))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.dbuser.role))

        const {user}= getState().profile;

        if(user !== "Committee"){
          navigate("/faculty")
        }
        else{
          navigate("/sabbatical")
        }
        
        
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }



  export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")

      console.log("did we enter getpasswordresetotken")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", password_reset_token_api, {
          email,
        })
  
        console.log("RESETPASSTOKEN RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Reset Email Sent")
        setEmailSent(true)
      } catch (error) {
        console.log("RESETPASSTOKEN ERROR............", error)
        toast.error("Failed To Send Reset Email")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }


  export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", password_reset_api, {
          password,
          confirmPassword,
          token,
        })
  
        console.log("RESETPASSWORD RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Password Reset Successfully")
        navigate("/login")
      } catch (error) {
        console.log("RESETPASSWORD ERROR............", error)
        toast.error("Failed To Reset Password")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }