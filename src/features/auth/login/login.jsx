import "./login.css"
import InputField from "../../../shared/components/InputField";
import ImgButton from "../../../shared/components/ImgButton";
import emailImg from "../../../assets/email.png"
import PasswordInput from "./components/passwordInput";
import google from "../../../assets/googleIcon.png"


export default function Login() {
  return <>
    <form action="" id="login_form">
        <h2 style={{textAlign:'center', fontSize:'3rem'}}><strong>Login</strong></h2>
        <InputField image={emailImg} type="text" className="inputStyle1" placeholder = "email" autoComplete="off"/><br/>
        <PasswordInput /><br />
        <button className="btnStyle1"><strong>Login</strong></button> <br />
        <hr style={{width:'100%'}}/> <br />
    </form>   
    <ImgButton image={google} className="btnStyle3"><strong>Google</strong></ImgButton> 
  </>;
}
