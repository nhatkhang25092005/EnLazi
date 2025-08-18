import EmailInput from "../components/EmailInput";
import { PasswordRegister } from "./components";
import googleImage from "../../../assets/googleIcon.png";
import ImgButton from "../../../shared/components/ImgButton";
import "./register.css";
import NavigateButton from "../components/NavigateButton";

export default function Register() {
  return (
    <>
      <NavigateButton name="Login" destination="/login"/>
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
