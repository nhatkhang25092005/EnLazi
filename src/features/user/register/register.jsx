import EmailInput from "../components/EmailInput";
import { PasswordRegister } from "./components";
import googleImage from "../../../assets/googleIcon.png";
import ImgButton from "../../../shared/components/ImgButton";
import "./register.css";
import { useState } from "react";
import NavigateButton from "../components/NavigateButton";
import UsernameInput from "../components/UsernameInput";
import Notification from "../components/Notification";

export default function Register() {
  let errorNotification = "error(Test)";
  const [classStatus, setClassStatus] = useState({
    emailStatus: true,
    usernameStatus: true,
    passwordStatus: true,
    repassStatus: true,
  });

  return (
    <>
      <NavigateButton name="Login" destination="/login" />
      <form action="POST" id="register_form">
        <h1 style={{ align: "center", fontSize: "3rem" }}>
          <strong>Register</strong>
        </h1>
        {!classStatus.emailStatus && (
          <Notification message={errorNotification} />
        )}
        <EmailInput />
        <br />
        {!classStatus.usernameStatus && (
          <Notification message={errorNotification} />
        )}
        <UsernameInput />
        <br />
        {!classStatus.passwordStatus && (
          <Notification message={errorNotification} />
        )}
        <PasswordRegister placeholder={"Password"} />
        <br />
        {!classStatus.repassStatus && (
          <Notification message={errorNotification} />
        )}
        <PasswordRegister placeholder={"Re-password"} />
        <button
          action="submit"
          className="btnStyle1"
          style={{ marginTop: "20px" }}
        >
          <strong>Register</strong>
        </button>
        <hr
          style={{ width: "20rem", marginTop: "20px", marginBottom: "20px" }}
        />
      </form>

      <ImgButton image={googleImage} style={{ marginTop: "20px" }}>
        <strong>Google</strong>
      </ImgButton>
    </>
  );
}
