import Home from "./features/home/home";
import Login from "./features/user/login/login";
import Register from "./features/user/register/register";
import Verify from "./features/user/verify/Verify";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./features/user/forgotPassword/forgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="/register/verify" element={<Verify/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
