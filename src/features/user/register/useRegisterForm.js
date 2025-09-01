import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../../api/userApi";
import {PATH} from "../../.././shared/constants/path"
export default function useRegisterForm() {
  const navigate = useNavigate();
  const popup = useRef(null);
  const loader = useRef(null);
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
    repass: "",
  });
  const [errorLabels, setErrorLabels] = useState({
    email: "",
    username: "",
    password: "",
    repass: "",
  });

  //handle change on input field function
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  //handle error function
  const handleError = (field, error) => {
    setErrorLabels((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorLabels({ email: "", username: "", password: "", repass: "" });

    let isEmpty = false;
    for (const [field, value] of Object.entries(input)) {
      if (!value) {
        isEmpty = true;
        handleError(field, `${field} can not be null`);
      }
    }

    if (isEmpty) return;

    if (input.password !== input.repass) {
      handleError("repass", "Password does not match !");
      return;
    }

    loader.current?.showModal();

    userApi
      .register(input.email, input.username, input.password)
      .then(() => {
        navigate(PATH.VERIFY, { state: { email: input.email } });
      })
      .catch((err) => {
        const messages = err.response?.data?.message;
        if (Array.isArray(messages)) {
          messages.forEach((msg) => {
            Object.keys(errorLabels).forEach((key) => {
              if (msg.toLowerCase().includes(key)) handleError(key, msg);
            });
          });
        } else if (typeof messages === "string") {
          setPopupContent(messages);
          popup.current?.showModal();
        }
      })
      .finally(() => {
        loader.current?.close();
      });
  };

  const [popupContent, setPopupContent] = useState("");

  return {
    input,
    popup,
    loader,
    popupContent,
    errorLabels,
    handleChange,
    handleSubmit
  };
}
