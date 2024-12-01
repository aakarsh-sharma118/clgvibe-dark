import { Routes, Route } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";

// Importing the pages components
import LoginPage from "./components/Login/LoginPage";
import RegistrationPage from "./components/Registration/RegistrationPage";
import HomePage from "./components/Home/HomePage";

const App = () => {
  return (
    <>
      <Routes>
        {/* Home page route wrapped with Preloader */}
        <Route path="/" element={<HomePage />} />

        {/* Other pages routes without Preloader */}
        <Route path="/login" element={<LoginPage isLoginPage={true} />} />
        <Route path="/signup" element={<LoginPage isLoginPage={false} />} />
      </Routes>

      <ButtonGradient />
    </>
  );
};

export default App;
