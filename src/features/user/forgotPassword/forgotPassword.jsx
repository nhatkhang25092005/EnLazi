import EmailInput from "../components/EmailInput";
import NavigateButton from "../components/NavigateButton";
export default function ForgotPassword() {
  return (
    <>
    <NavigateButton name="Login" destination="/login"/>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop:"4rem"
        }}
      >
        <h1>
          <strong>Forgot Password</strong>
        </h1>
        <p>Enter your email, we will send you your password</p>
        <EmailInput />
        <button className="btnStyle1" style={{ marginTop: "20px" }}>
          <strong>Submit</strong>
        </button>
      </form>
    </>
  );
}
