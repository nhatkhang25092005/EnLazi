import { useState, useRef, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import codeImg from "../../../assets/password.png";
import "./verify.css";
import userApi from "../../../api/userApi";
import PopupModal from "../components/PopupModal";
import errorImg from "../../../assets/error.png";
import successfulImg from "../../../assets/successful.png"



export default function Verify() {
  const navigate = useNavigate()
  const popup = useRef(null)
  const location = useLocation();
  const email = location.state?.email;
  const [notification, setNotification] = useState({
    title:"",
    colorTitle:"#000000",
    content:"",
    image:"",
    handleButton:null
  })

  function handleButton(){
    navigate("/login")
  }

  //state of code
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // reference of each input code
  const inputRefs = useRef([]);
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

  //validate code function
  function isValid(code){
    return /^\d{6}$/.test(code);
  }

  //send to server
  function handleClick() {
    //  get code
    const finalCode = code.join("");

    //final code validation
    if(!isValid(finalCode)){
      setNotification(()=>({
        title:"Invalid",
        colorTitle:"red",
        content:"Verify code should not be empty!",
        image:errorImg
      }))
      popup.current.showModal()
      return
    }

    // call api after validation
    userApi
      .verify(email, finalCode)
      .then((res) =>{
        console.log(res)
        setNotification(()=>({
          title:"Verify Successful",
          colorTitle:"green",
          content:res.data.message,
          image:successfulImg,
          handleButton:handleButton
        }))
        popup.current.showModal()
        
      })
      .catch(
        (err) =>{setNotification(()=>({
          title:"Invalid",
          colorTitle:"red",
          content:err.response?.data?.message || "Something went wrong!",
          image:errorImg
        }))
        popup.current.showModal()
        console.log(err)
      });
  }

  return (
    <div id="verify">
      <PopupModal handleButton={notification.handleButton}  image={notification.image} colorTitle={notification.colorTitle} title={notification.title} content={notification.content} ref={popup}/>
      <h1>Validation</h1>
      <p id="p1">
        <strong>We've sent you an email with a code.</strong>
      </p>
      <p id="p2">
        <strong>Please check it and fill in the field below.</strong>
      </p>
      <div id="code-input">
        <img src={codeImg} alt="code" />
        {code.map((digit, index) => (
          <input
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
      <button className="btnStyle1" onClick={handleClick}>
        <strong>Submit</strong>
      </button>
    </div>
  );
}
