import Home from "./features/home/home";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./features/dashboard/dashboard";

// user features
import {
  Login,
  Register,
  Verify,
  ForgotPassword,
  VerifyForgot,
} from "./features/user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/register/verify" element={<Verify />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot/verify_forgot" element={<VerifyForgot />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
