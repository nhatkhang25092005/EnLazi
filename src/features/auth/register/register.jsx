import EmailInput from "../components/emailInput";
import { PasswordRegister } from "./components";
import googleImage from "../../../assets/googleIcon.png";
import ImgButton from "../../../shared/components/ImgButton";
import "./register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={()=>{navigate("/login")}}
        className="btnStyle2"
        style={{
          position: "absolute",
          right: "20px",
          top: "20px",
          width: "10rem",
        }}
      >
        <strong>login</strong>
      </button>
      <form action="POST" id="register_form">
        <p style={{ align: "center", fontSize: "3rem" }}>
          <strong>Register</strong>
        </p>
        <EmailInput />
        <br />
        <PasswordRegister placeholder={"Password"} />
        <br />
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
