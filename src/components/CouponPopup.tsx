import React from "react";
import styled from "styled-components";

interface CouponPopupProps {
    onClose: () => void;
    onConfirm: () => void;
}

const CouponPopup: React.FC<CouponPopupProps> = ({ onClose, onConfirm }) => {
    return (
        <Overlay onClick={onClose}>
            <PopupContainer onClick={(e) => e.stopPropagation()}>
                <Message>쿠폰을 사용하시겠습니까?</Message>
                <ButtonContainer>
                    <YesButton onClick={onConfirm}>Yes</YesButton>
                    <NoButton onClick={onClose}>No</NoButton>
                </ButtonContainer>
            </PopupContainer>
        </Overlay>
    );
};

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PopupContainer = styled.div`
    background: white;
    padding: 0 0 20px;
    border-radius: 8px;
    text-align: center;
    width: 65%;
    
    @media (max-width: 400px) {
        width: 65%;
    }
`;

const Message = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #000;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
`;

const YesButton = styled.button`
    background: black;
    color: white;
    padding: 10px;
    width: 90%;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 auto;
    border: 1px solid black;
`;

const NoButton = styled.button`
    background: white;
    color: black;
    padding: 10px;
    border: 1px solid black;
    width: 90%;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 auto;
`;

export default CouponPopup;