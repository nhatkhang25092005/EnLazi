import PasswordImg from "../../../../assets/password.png";
import openEye from "../../../../assets/openEye.png";
import closeEye from "../../../../assets/closeEye.png";
import { useState } from "react";
export default function RegisterPassword({name, value, changeFunc, placeholder }) {
  const [show, setShow] = useState(false);

  function handleOnClick() {
    setShow((show) => !show);
  }

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
      <img
        src={show ? closeEye : openEye}
        onClick={handleOnClick}
        style={{
          position: "absolute",
          width: "25px",
          top: "25%",
          right: "10px",
          cursor: "pointer",
        }}
      />

      <input
        name={name}
        value={value}
        onChange={(e)=>changeFunc(e)}
        id="passwordInput"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        style={{
          borderRadius: "15px",
          boxSizing: "border-box",
          width: "20rem",
          height: "3rem",
          paddingLeft: "50px",
        }}
      />
    </label>
  );
}


