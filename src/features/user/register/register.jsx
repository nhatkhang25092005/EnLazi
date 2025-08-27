import EmailInput from "../components/EmailInput";
import { PasswordRegister } from "./components";
import googleImage from "../../../assets/googleIcon.png";
import ImgButton from "../../../shared/components/ImgButton";
import "./register.css";
import { useState, useRef } from "react";
import NavigateButton from "../components/NavigateButton";
import UsernameInput from "../components/UsernameInput";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";

import errorImg from "../../../assets/error.png";

import userApi from "../../../api/userApi";
import PopupModal from "../components/PopupModal";
import Loader from "../../../shared/components/Loader";

export default function Register() {
  const navigate = useNavigate();
  const popup = useRef(null);
  const loader = useRef(null);
  const [popupContent, setPopupContent] = useState("");

  //input : variable that store email, username, password and repass as a object, it is under controls of useState()
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
    repass: "",
  });

  //store error of each field when server response
  const [errorsLabels, setErrorLabels] = useState({
    email: "",
    username: "",
    password: "",
    repass: "",
  });

  //update input state after input field was changed
  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  //update error fields
  function handleError(field, error) {
    setErrorLabels((prev) => ({
      ...prev,
      [field]: error,
    }));
  }

  //handle submit action
  function handleSubmit(e) {
    e.preventDefault(); // prevent reload page while using button

    //reset error state
    setErrorLabels(() => ({
      email: "",
      username: "",
      password: "",
      repass: "",
    }));

    //check empty field
    let isEmpty = false;
    for (const [field, value] of Object.entries(input)) {
      if (value === "") {
        isEmpty = true;
        handleError(field, `${field} can not be null`);
      }
    }

    //Ensure that all fields was filled
    if (!isEmpty) {
      //check password and repass is similar or not
      if (input.password != input.repass) {
        setErrorLabels((prev) => ({
          ...prev,
          repass: "Password does not match !",
        }));
        return;
      }

      //fetching api if all conditions was reached
      else {
        loader.current.showModal();
        userApi
          .register(input.email, input.username, input.password)
          .then(() => {
            //navigate to verify account page with email
            navigate("./verify", { state: { email: input.email } });
          })
          .catch((err) => {
            const messages = err.response?.data?.message;
            console.log(err);

            if (Array.isArray(messages)) {
              // when message is an array
              messages.forEach((msg) => {
                Object.keys(errorsLabels).forEach((key) => {
                  if (msg.toLowerCase().includes(key)) handleError(key, msg);
                });
              });
            } else if (typeof messages === "string") {
              // Another error => open popup to notification
              setPopupContent(messages);
              popup.current.showModal();
            } else {
              console.error("Unexpected error:", err.response?.data);
            }
          })
          .finally(() => {
            if (loader.current?.open) {
              loader.current.close();
            }
          });
      }
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/auth/signin/google`;
  };

  return (
    <div id="register-page">
      <Loader ref={loader} />
      <PopupModal
        image={errorImg}
        title="Error!"
        content={popupContent}
        ref={popup}
      />
      <NavigateButton name="Login" destination="/login" />
      <form id="register_form" onSubmit={(e) => handleSubmit(e)}>
        <h1 style={{ align: "center", fontSize: "3rem" }}>
          <strong>Register</strong>
        </h1>
        <Notification message={errorsLabels.email} />
        <EmailInput value={input.email} changeFunc={handleChange} />
        <br />
        <Notification message={errorsLabels.username} />
        <UsernameInput value={input.username} changeFunc={handleChange} />
        <br />
        <Notification message={errorsLabels.password} />
        <PasswordRegister
          name="password"
          value={input.password}
          changeFunc={handleChange}
          placeholder={"Password"}
        />
        <br />
        <Notification message={errorsLabels.repass} />
        <PasswordRegister
          name="repass"
          value={input.repass}
          changeFunc={handleChange}
          placeholder={"Re-password"}
        />
        <button
          type="submit"
          className="btnStyle1"
          style={{ marginTop: "20px" }}
        >
          <strong>Register</strong>
        </button>
        <hr
          style={{ width: "20rem", marginTop: "20px", marginBottom: "20px" }}
        />
      </form>

      <ImgButton
        image={googleImage}
        handleClick={handleGoogleLogin}
        style={{ marginTop: "20px", marginBottom: "30rem" }}
      >
        <strong>Google</strong>
      </ImgButton>
    </div>
  );
}
