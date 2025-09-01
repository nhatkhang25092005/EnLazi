import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import userApi from "../../../api/userApi";
import errorImg from "../../../assets/error.png";
import successfulImg from "../../../assets/successful.png";
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
  const email = useLocation()?.email;

  const isValid = (code) => /^\d{6}$/.test(code);

  const handleSubmit = async () => {
    const finalCode = code.join("");

    if (!isValid(finalCode)) {
      setNotification({
        title: "Invalid",
        colorTitle: "red",
        content: "Verify code should not be empty!",
        image: errorImg,
      });
      return popupRef.current.showModal();
    }

    loaderRef.current.showModal();
    userApi
      .verify(email, finalCode)
      .then((res) => {
        setNotification({
          title: "Verify Successful",
          colorTitle: "green",
          content: res.data.message,
          image: successfulImg,
          handleButton: () => navigate("/login"),
        });
      })
      .catch((err) => {
        setNotification({
          title: "Invalid",
          colorTitle: "red",
          content: err.response?.data?.message || "Something went wrong!",
          image: errorImg,
        });
      })
      .finally(() => {
        popupRef.current.showModal();
        loaderRef.current.close();
      });
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
