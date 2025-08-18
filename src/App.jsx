import Home from "./features/home/home";
import Login from "./features/auth/login/login";
import Register from "./features/auth/register/register";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./features/auth/forgotPassword/forgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot" element={<ForgotPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
