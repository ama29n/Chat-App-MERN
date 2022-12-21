import ChatPage from "./Pages/ChatPage";
import MainPage from "./Pages/MainPage";
import { Route, Routes, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;