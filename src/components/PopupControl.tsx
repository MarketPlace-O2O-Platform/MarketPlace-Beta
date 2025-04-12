import React, { useEffect, useState } from "react";
import KakaoPopup from "./KakaoPopup";

const PopupControl: React.FC = () => {
    console.log("PopupControl");
    const [showPopup, setShowPopup] = useState<boolean>(false);

    // 컴포넌트가 마운트될 때 로컬 스토리지에 저장된 날짜와 오늘 날짜를 비교합니다.
    useEffect(() => {
        const noShowDate = localStorage.getItem("kakaoPopupNoShowDate");
        const today = new Date().toDateString();
        if (noShowDate !== today) {
            setShowPopup(true);
        }
    }, []);

    // 팝업 닫기 처리
    const handleClose = () => {
        setShowPopup(false);
    };

    // "오늘 보지 않기" 버튼 클릭 시 오늘 날짜를 로컬 스토리지에 저장
    const handleTodayNoSee = () => {
        console.log("Button Clicked"); // 디버그 로그 추가
        const today = new Date().toDateString();
        localStorage.setItem("kakaoPopupNoShowDate", today);
        console.log("저장된 날짜:", localStorage.getItem("kakaoPopupNoShowDate"));

        setShowPopup(false);
    };

    return (
        <>
            {showPopup && (
                <KakaoPopup onClose={handleClose} onTodayNoSee={handleTodayNoSee} />
            )}
        </>
    );
};

export default PopupControl;