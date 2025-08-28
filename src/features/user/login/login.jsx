import "./login.css";
import ImgButton from "../../../shared/components/ImgButton";
import PasswordInput from "../components/passwordInput";
import EmailInput from "../components/EmailInput";
import google from "../../../assets/googleIcon.png";
import errImg from "../../../assets/error.png";
import NavigateButton from "../components/NavigateButton";
import Notification from "../components/Notification";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../../api/userApi";
import PopupModal from "../components/PopupModal";
import Loader from "../../../shared/components/Loader";

export default function Login() {
  const navigate = useNavigate();
  //input state
  const [input, setInput] = useState({ email: "", password: "" });

  //field error state
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

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
  function handleSubmit(e) {
    e.preventDefault();

    //handle empty fields
    setErrorMessages({
      email: "",
      password: "",
    });
    let isEmpty = false;
    for (const [field, value] of Object.entries(input)) {
      if (value == "") {
        isEmpty = true;
        setErrorMessages((prev) => ({
          ...prev,
          [field]: `${field} can not be empty!`,
        }));
      }
    }
    if (isEmpty) return;

    //handle call api
    loader.current.showModal();
    userApi
      .login(input.email, input.password)
      //if success
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      //if error catch
      .catch((err) => {
        console.log(err);
        const messages = err?.response?.data?.message;

        if (Array.isArray(messages)) {
          // when message is an array
          messages.forEach((msg) => {
            Object.keys(errorMessages).forEach((key) => {
              if (msg.toLowerCase().includes(key))
                setErrorMessages((prev) => ({
                  ...prev,
                  [key]: msg,
                }));
            });
          });
        } else {
          setPopupContent(messages);
          popup.current.showModal();
        }
      })
      .finally(() => {
        if (loader.current?.open) {
          loader.current.close();
        }
      });
  }

  const handleGoogleLogin = () => {
      userApi.google()
      .then()
      .catch()
  };

  return (
    <>
      <PopupModal
        title="Error"
        colorTitle="red"
        content={popupContent}
        image={errImg}
        ref={popup}
      />
      <Loader ref={loader} />
      <NavigateButton name={"Register"} destination={"/register"} />
      <form id="login_form">
        <h2 style={{ textAlign: "center", fontSize: "3rem" }}>
          <strong>Login</strong>
        </h2>
        <Notification message={errorMessages.email} />
        <EmailInput value={input.email} changeFunc={handleInput} />
        <br /> 
        <Notification message={errorMessages.password} />
        <PasswordInput value={input.password} changeFunc={handleInput} />
        <br />
        <button onClick={(e) => handleSubmit(e)} className="btnStyle1">
          <strong>Login</strong>
        </button>
        <br />
        <hr style={{ width: "100%" }} /> <br />
      </form>
      <ImgButton image={google} onClick={handleGoogleLogin}>
        <strong>Google</strong>
      </ImgButton>
    </>
  );
}
