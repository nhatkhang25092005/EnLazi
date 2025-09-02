import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleVerifyForgotPassword } from "../../../shared/services/handleRequest";
import { handleVerifyForgotPasswordResponse } from "../../../shared/services/handleResponse";
import { errorImg, successfulImg } from "../../../assets";

export function useVerifyForgotPassword() {
  //navigate
  const navigate = useNavigate();

  //popup modal
  const popupRef = useRef();

  //error message
  const [errorMessage, setErrorMessage] = useState("");

  //popup
  const [popupContent, setPopupContent] = useState({});

  //code state
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  //password state
  const [password, setPassword] = useState();

  //get email from user
  const email = useLocation().state;

  //handle password state
  function handleChangePassword(e) {
    const password = e.target.value;
    setPassword(password);
  }

  //handle api
  async function handleSubmit(e) {
    e.preventDefault();

    //check code field
    const finalCode = code.join("");
    if (finalCode.length < 6) return;

    //check password field
    if (password == "") {
      setErrorMessage("please enter your new password");
      return;
    } else setErrorMessage("");

    //handle api here =)
    const response = await handleVerifyForgotPassword(
      email,
      finalCode,
      password
    );
    handleVerifyForgotPasswordResponse(response, {
      navigate,
      setPopupContent,
      popupRef,
      setErrorMessage,
      image: { successfulImg: successfulImg, errorImg: errorImg },
    });
    console.log(response);
  }

  return {
    popupContent,
    errorMessage,
    popupRef,
    handleChangePassword,
    code,
    setCode,
    password,
    handleSubmit,
  };
}
