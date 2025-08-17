import "./login.css";
import ImgButton from "../../../shared/components/ImgButton";
import PasswordInput from "./components/passwordInput";
import EmailInput from "./components/emailInput";
import google from "../../../assets/googleIcon.png";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate("/register")}
        className="btnStyle2"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "10rem",
        }}
      >
        <strong>Register</strong>
      </button>
      <form action="" id="login_form">
        <h2 style={{ textAlign: "center", fontSize: "3rem" }}>
          <strong>Login</strong>
        </h2>
        <EmailInput />
        <br />
        <PasswordInput />
        <br />
        <button className="btnStyle1">
          <strong>Login</strong>
        </button>{" "}
        <br />
        <hr style={{ width: "100%" }} /> <br />
      </form>
      <ImgButton image={google} className="btnStyle3">
        <strong>Google</strong>
      </ImgButton>
    </>
  );
}
