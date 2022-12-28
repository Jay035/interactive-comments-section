import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./pages/LoginForm";
import { Main } from "./pages/main/Main";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AddComment from "./pages/addNewComment/AddComment";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <Navbar />
        <Routes>
          <Route exact path="/" element={
            // <ProtectedRoute>
            <Main />
            //  </ProtectedRoute> 
          } />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/addComment" element={<AddComment />} />
        </Routes>
      </AuthContextProvider>
      
    </div>
  );
}

export default App;
