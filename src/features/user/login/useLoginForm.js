import { useNavigate } from "react-router-dom";
import { useState,useRef } from "react";
import userApi from "../../../api/userApi"
export default function useLoginForm() {
  const navigate = useNavigate();
  //input state
  const [input, setInput] = useState({ email: "", password: "" });

  //field error state
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  //popup error state
  const [popupContent, setPopupContent] = useState("");

  const popup = useRef(null);
  const loader = useRef(null);

  //handle input state
  function handleInput(event) {
    const { value, name } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //handle submit
  function handleSubmit(e) {
    e.preventDefault();

    //handle empty fields
    setErrorMessages({
      email: "",
      password: "",
    });
    let isEmpty = false;
    for (const [field, value] of Object.entries(input)) {
      if (value == "") {
        isEmpty = true;
        setErrorMessages((prev) => ({
          ...prev,
          [field]: `${field} can not be empty!`,
        }));
      }
    }
    if (isEmpty) return;

    //handle call api
    loader.current.showModal();
    userApi
      .login(input.email, input.password)
      //if success
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      //if error catch
      .catch((err) => {
        if(err.code === "ERR_NETWORK"){
          setPopupContent(err.message)
          popup.current.showModal();
          return
        }
        const messages = err?.response?.data?.message

        if (Array.isArray(messages)) {
          // when message is an array
          messages.forEach((msg) => {
            Object.keys(errorMessages).forEach((key) => {
              if (msg.toLowerCase().includes(key))
                setErrorMessages((prev) => ({
                  ...prev,
                  [key]: msg,
                }));
            });
          });
        } else {
          setPopupContent(messages);
          popup.current.showModal();
        }
      })
      .finally(() => {
        if (loader.current?.open) {
          loader.current.close();
        }
      });
  }

  return{
    input,
    errorMessages,
    popup,
    loader,
    popupContent,
    handleInput,
    handleSubmit
  }
}


