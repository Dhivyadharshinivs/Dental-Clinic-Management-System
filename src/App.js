import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login/Login";
import Main from "./Main";
import Billing from "./pages/Billing";
function App() {
  return (
   
    <BrowserRouter>
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main/*" element={<Main />} />
        <Route path="/Billing" element={<Billing />} />
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}
export default App;
