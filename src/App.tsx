import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../node_modules/bootstrap/dist/css/bootstrap.css'


import "./App.css";
import Home from "./pages/Home";
//import AddEditUser from "./pages/AddEditUser";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import UserInfo from "./pages/UserInfo";
import NavBar from "./layout/NavBar";
import AboutUs from "./layout/AboutUs";
import ContactUs from "./layout/ContactUs";


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
      <div>
        <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/update/:id" element={<EditUser />} />
        <Route path="/view/:id" element={<UserInfo />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

      </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
