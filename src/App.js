import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { Main } from "./components/comment/Main";
import { Footer } from "./Footer";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/main" element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthContextProvider>
      <Footer />
    </div>
  );
}

export default App;
