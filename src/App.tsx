import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";


function App() {
  return (
    <ConfigProvider direction="rtl" locale={faIR}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="layout" element={<Layout />}>
          
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
