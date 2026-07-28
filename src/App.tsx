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
import ManagerDashboard from "./pages/ManagerDashboard";


function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Vazirmatn, sans-serif",
        },
      }}
      direction="rtl"
      locale={faIR}
    >
      <Router>
        <Routes>

          {/* مسیر پیش‌فرض */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* صفحات بدون Layout */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />


          {/* صفحات داخل Layout */}
          <Route path="/layout" element={<Layout />}>
            <Route
              path="managerDashboard"
              element={<ManagerDashboard />}
            />
          </Route>


          {/* مسیرهای اشتباه */}
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />

        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;