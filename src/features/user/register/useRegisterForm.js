import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { handleRegisterRequest } from "../../../shared/services/handleRequest";
import { handleRegisterResponse } from "../../../shared/services/handleResponse";
import { checkEmptyObject } from "../../../shared/services/checkEmpty";
export default function useRegisterForm() {
  const navigate = useNavigate();
  const popup = useRef(null);
  const loader = useRef(null);
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
    repass: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    username: "",
    password: "",
    repass: "",
  });

  //handle change on input field function
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  //handle error function
  const handleError = (field, error) => {
    setErrorMessages((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check empty fields
    const errors = checkEmptyObject(input)
    if(errors){
      setErrorMessages(errors)
      return
    }

    //check matching
    if (input.password !== input.repass) {
      handleError("repass", "Password does not match !");
      return;
    }

    //handle register api
    loader.current.showModal();
    const response = await handleRegisterRequest(input.email, input.username, input.password)
    console.log(response)
    handleRegisterResponse(response,{navigate, email: input.email,setErrorMessages,setPopupContent,popup})
    loader.current.close()
  };

  const [popupContent, setPopupContent] = useState("");

  return {
    input,
    popup,
    loader,
    popupContent,
    errorMessages,
    handleChange,
    handleSubmit
  };
}
