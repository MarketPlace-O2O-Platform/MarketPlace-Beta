import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CouponListPage from "./pages/CouponPage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/coupons" element={<CouponListPage />} />
            </Routes>
        </Router>
    );
};

export default App;
