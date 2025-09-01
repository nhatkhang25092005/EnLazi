import { useState, useRef } from "react";
import { handleLoginRequest } from "../../../shared/services/handleApi";
import { useNavigate } from "react-router-dom";
import { handleLoginResponse } from "../../../shared/services/handleResponse";
import { checkEmptyObject } from "../../../shared/services/checkEmpty";

/* prettier-ignore */
export default function useLoginForm() {
  const navigate = useNavigate();
  //input state
  const [input, setInput] = useState({ email: "", password: "" });

  //field error state, it will be override if error occurs
  const [errorMessages, setErrorMessages] = useState({});

  //popup error state
  const [popupContent, setPopupContent] = useState("");

  const popup = useRef(null);
  const loader = useRef(null);

  //handle input state
  function handleInput(event) {
    const { value, name } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //handle submit
  async function handleSubmit(e) {
    e.preventDefault();

    //handle empty fields
    const emptyFields = checkEmptyObject(input);
    if (emptyFields != null) {
      setErrorMessages(emptyFields);
      return;
    }

    //loader on
    loader.current.showModal();

    //handle Api req and res =)
    try{
      const response = await handleLoginRequest(input.email, input.password); //call api
      await handleLoginResponse(response, {navigate, setErrorMessages, setPopupContent, popup,}); //handle api
    }
    finally{loader.current.close()}
  }

  return {
    input,
    errorMessages,
    popup,
    loader,
    popupContent,
    handleInput,
    handleSubmit,
  };
}
