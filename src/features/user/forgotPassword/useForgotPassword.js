import { useRef, useState } from "react"
import { handleForgotPasswordRequest } from "../../../shared/services/handleRequest"
import { useNavigate } from "react-router-dom"
import { processForgotPasswordResponse } from "../../../shared/services/handleResponse"
import {Status} from "../../../imageAccess"

export default function useForgotPassword(){
    //loader
    const loader = useRef()

    //popup
    const popupRef = useRef()
    const [popupContent, setPopupContent] = useState({
        title:"",
        colorTitle:"black",
        content:"",
        image:"",
        handleButton : null
    })

    //navigation
    const navigate = useNavigate()

    //email input
    const [email, setEmail] = useState("")

    //magic message
    const [errorMessage,setErrorMessage] = useState("")

    //UI Props need to handle response
    const uiProps = { 
        navigate, 
        setErrorMessage,
        setPopupContent, 
        errorImg:Status.error,
        popupRef
    }

    //handle email input
    function handleChange(e){ setEmail(e.target.value) }


    //handle submit
    async function handleSubmit(e){
        e.preventDefault()

        //check empty field
        if(email==""){
            setErrorMessage("Email can not be empty!")
            return
        }
        else setErrorMessage("")

        //call api right here
        loader.current.showModal()
        const response = await handleForgotPasswordRequest(email)
        processForgotPasswordResponse(response,uiProps,email)
        loader.current.close()
    }

    return{
        popupContent,
        popupRef,
        loader,
        email,
        errorMessage,
        handleChange,
        handleSubmit
    }
}