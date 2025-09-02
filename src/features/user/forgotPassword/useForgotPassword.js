import { useRef, useState } from "react"
import { handleForgotPasswordRequest } from "../../../shared/services/handleRequest"
import { useNavigate } from "react-router-dom"
import { handleForgotPasswordResponse } from "../../../shared/services/handleResponse"
import errorImage from "../../../assets/error.png"

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
        handleForgotPasswordResponse(response,{navigate,setErrorMessage,setPopupContent,errorImage,email})
        popupRef.current.showModal()
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