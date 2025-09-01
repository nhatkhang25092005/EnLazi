import userApi from "../../api/userApi";
import {DISPLAY} from "../constants/type"

export  function handleLoginRequest(email, password){
    return userApi.login(email,password)
    //login successfully
    .then((res)=>{
        console.log(res)
        return null
    })
    .catch((err)=>{
        if(err.code === "ERR_NETWORK") return err.message
        const messages = err?.response?.data?.message

        if(Array.isArray(messages)){
            return {type:DISPLAY.type1,errors:messages}
        }
        else{
            return {type:DISPLAY.type2,error:messages}
        }
    })
    .finally()
}

export function handleRegisterRequest({email, username, password}){

}

export function handleVerifyRequest({code}){

}