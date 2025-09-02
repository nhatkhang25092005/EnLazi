import { useRef, useEffect } from "react";
import "./componentsStyle.css"
import codeImg from "../../../assets/password.png"
export default function CodeInput({ code, setCode }) {
  const inputRefs = useRef([]);

  //focus on the first input code when start page
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  //adjust the pointer position to the start of input field
  function adjustPointer(index) {
    requestAnimationFrame(() => {
      const input = inputRefs.current[index];
      if (input) {
        input.selectionStart = input.selectionEnd = input.value.length;
      }
    });
  }

  //input
  function handleChange(event, index) {
    let value = event.target.value.slice(-1);
    // Allow only number (0–9)
    if (!/^\d$/.test(value)) {
      return;
    }
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    adjustPointer(index);
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  //Key Down Handle
  function handleKeyDown(event, index) {
    if (event.key === "Space" || event.code === "Space") {
      event.preventDefault();
      return;
    }
    if (event.key === "Backspace") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      if (index != 0) inputRefs.current[index - 1].focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
      adjustPointer(index - 1);
    }
    if (event.key === "ArrowRight" && index < 6) {
      inputRefs.current[index + 1].focus();
      adjustPointer(index + 1);
    }
  }

  return (
    <div id="code-input">
      <img src={codeImg} alt="code" />
      {code.map((digit, index) => (
        <input
          autoComplete="one-time-code"
          className="code-box"
          key={index}
          placeholder="_"
          type="text"
          pattern="[0-9]*"
          value={digit}
          ref={(element) => (inputRefs.current[index] = element)} //reference to focus in DOM
          onInput={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
}
