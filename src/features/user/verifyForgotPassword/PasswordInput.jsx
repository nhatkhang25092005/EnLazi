import PasswordImg from "../../../assets/password.png";
export default function PasswordInput({name, value, changeFunc }) {
  return (
    <label
      for="passwordInput"
      style={{
        display: "inline-block",
        position: "relative",
      }}
    >
      <img
        src={PasswordImg}
        style={{
          position: "absolute",
          width: "25px",
          top: "25%",
          left: "8px",
        }}
      />

      <input
        name={name}
        value={value}
        type="password"
        onChange={(e)=>changeFunc(e)}
        id="passwordInput"
        placeholder="new password"
        style={{
          borderRadius: "15px",
          boxSizing: "border-box",
          width: "26.5rem",
          height: "3rem",
          paddingLeft: "50px",
        }}
      />
    </label>
  );
}


