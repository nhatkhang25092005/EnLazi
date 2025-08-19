import "./login.css";
import ImgButton from "../../../shared/components/ImgButton";
import PasswordInput from "../components/passwordInput";
import EmailInput from "../components/EmailInput";
import google from "../../../assets/googleIcon.png";
import NavigateButton from "../components/NavigateButton";

export default function Login() {
  return (
    <>
      <NavigateButton name={"Register"} destination={"/register"} />
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
      <ImgButton image={google}>
        <strong>Google</strong>
      </ImgButton>
    </>
  );
}
