import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CouponListPage from "./pages/CouponPage";

const App: React.FC = () => {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get("utm_source");
        const utmCampaign = params.get("utm_campaign");
        const utmMedium = params.get("utm_medium");

        if (utmSource) localStorage.setItem("utm_source", utmSource);
        if (utmCampaign) localStorage.setItem("utm_campaign", utmCampaign);
        if (utmMedium) localStorage.setItem("utm_medium", utmMedium);
    }, []);

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
