import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { handleRegisterRequest } from "../../../shared/services/handleRequest";
import { processRegisterResponse } from "../../../shared/services/handleResponse";
import { checkEmptyObject } from "../../../shared/services/checkEmpty";
export default function useRegisterForm() {
  const navigate = useNavigate(); // navigate function from react-router
  const popup = useRef(null); //popup modal reference
  const loader = useRef(null); //loader modal reference

  //state for input fields and error messages
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
    repass: "",
  });

  //state for error messages
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    username: "",
    password: "",
    repass: "",
  });

  //state for popup content
  const [popupContent, setPopupContent] = useState("");

  //object to pass ui props to response handler
  const uiProps = {
    navigate,
    setErrorMessages,
    setPopupContent,
    popup,
  }

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
    processRegisterResponse(response,uiProps,input.email)
    loader.current.close()
  };

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
