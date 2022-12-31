import ChatPage from "./Pages/ChatPage";
import StartPage from "./Pages/StartPage";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/chat" /> : <StartPage />} />
        <Route path="/chat" element={isLoggedIn ? <ChatPage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
