import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import errorImg from "../../../assets/error.png";
import successfulImg from "../../../assets/successful.png";
import { handleVerifyRequest } from "../../../shared/services/handleRequest";
import { handleVerifyResponse } from "../../../shared/services/handleResponse";
export default function useVerifyLogic() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const popupRef = useRef(null);
  const loaderRef = useRef(null);
  const [notification, setNotification] = useState({
    title: "",
    colorTitle: "#000000",
    content: "",
    image: "",
    handleButton: null,
  });
  const navigate = useNavigate();
  const email = useLocation().state;

  const isValid = (code) => /^\d{6}$/.test(code);

  const handleSubmit = async () => {
    //join characters
    const finalCode = code.join("");

    // Do not proceed until the verification code is fully entered (must be 6 digits)
    if(finalCode.length < 6) return

    //check code
    if (!isValid(finalCode)) {
      setNotification({ title: "Invalid", colorTitle: "red", content: "Verify code should not be empty!", image: errorImg});
      return popupRef.current.showModal();
    }

    //handle verify api
    loaderRef.current.showModal();
    const response = await handleVerifyRequest(email, finalCode);
    handleVerifyResponse(response, {setNotification, navigate, img: { successfulImg, errorImg }});
    popupRef.current.showModal();
    loaderRef.current.close();
  };
  return {
    loaderRef,
    code,
    setCode,
    popupRef,
    notification,
    handleSubmit,
  };
}
