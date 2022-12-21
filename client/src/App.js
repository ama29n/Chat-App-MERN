import ChatPage from "./Pages/ChatPage";
import StartPage from "./Pages/StartPage";
import { Route, Routes, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;