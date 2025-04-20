import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Coupon } from "../constants/Coupon";
import LazyImage from "./LazyImage.tsx";

interface CouponPopupProps {
    coupon: Coupon;
    onClose: () => void;
    onConfirm: () => Promise<void>; // 변경: async 처리 고려
}

const DetailPopup: React.FC<CouponPopupProps> = ({ coupon, onClose, onConfirm }) => {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isUsed, setIsUsed] = useState(coupon.isUsed);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const origOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = origOverflow;
        };
    }, []);

    const handleUseClick = () => {
        setIsConfirming(true);
    };

    const handleConfirm = async () => {
        await onConfirm();
        setIsUsed(true);
        setIsConfirming(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    };

    return (
        <Overlay onClick={onClose}>
            <Dialog onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>x</CloseButton>
                <ImageWrapper>
                    <Image src={coupon.image} alt={coupon.couponName} />
                </ImageWrapper>
                <Body>
                    <MarketName>{coupon.marketName}</MarketName>
                    <CouponName>{coupon.couponName}</CouponName>
                    <Description>{coupon.couponDetail}</Description>
                    <DividerWrapper>
                        <Dot />
                        <DividerLine />
                        <Dot />
                    </DividerWrapper>
                    {isConfirming ? (
                        <ConfirmWrapper>
                            <ConfirmText>쿠폰은 한 번만 사용할 수 있어요.<br />사용하시겠어요?</ConfirmText>
                            <ButtonRow>
                                <CancelBtn onClick={() => setIsConfirming(false)}>취소</CancelBtn>
                                <ConfirmBtn onClick={handleConfirm}>사용하기</ConfirmBtn>
                            </ButtonRow>
                        </ConfirmWrapper>
                    ) : (
                        <ActionButton disabled={isUsed} onClick={handleUseClick}>
                            {isUsed ? "사용완료" : "쿠폰 사용하기"}
                        </ActionButton>
                    )}
                    <Note>※ 매장에서 쿠폰 사용 시 [쿠폰 사용하기] 버튼을 눌러주세요.</Note>
                </Body>
                {showToast && <Toast>✅ 쿠폰이 정상적으로 사용되었습니다.</Toast>}
            </Dialog>
        </Overlay>
    );
};

export default DetailPopup;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Dialog = styled.div`
    position: relative;
    max-width: 70%;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    padding-bottom: 12px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: transparent;
    border: none;
    font-size: 20px;
    color: #aaa;
    cursor: pointer;
    &:hover {
        color: #333;
    }
`;

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 0 auto;
`;

const Image = styled(LazyImage)`
    aspect-ratio: 1 / 1;
    max-width: 50%;
    max-height: 50%;
    display: block;
    margin-top: 26px;
    object-fit: cover;
`;

const Body = styled.div`
    padding: 4px 0 8px 0;
    text-align: center;
`;

const MarketName = styled.p`
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: #121212;
`;

const CouponName = styled.p`
    margin: 2px 0 0;
    font-size: 18px;
    font-weight: 700;
    color: #121212;
`;

const Description = styled.p`
    margin: 3px 0 3px;
    font-size: 12px;
    color: #555;
`;

const DividerWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`;

const DividerLine = styled.div`
    flex: 1;
    border-top: 1px dashed #ccc;
    height: 1px;
    position: relative;
    z-index: 1;
    max-width: 90%;
    margin: 0 4px;
`;

const Dot = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #999;
    z-index: 2;
`;

const ActionButton = styled.button`
    width: 80%;
    padding: 12px 0;
    margin: 12px 0;
    background: ${({ disabled }) => (disabled ? "#aaa" : "#303030")};
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const Note = styled.p`
    margin: 0 0 4px 0;
    font-size: 10px;
    color: #888;
`;

const Toast = styled.div`
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 14px;
    animation: fadein 0.3s ease-out;

    @keyframes fadein {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;

const ConfirmWrapper = styled.div`
    margin-top: 12px;
`;

const ConfirmText = styled.div`
    font-size: 13px;
    color: #333;
    line-height: 1.4;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 12px;
`;

const CancelBtn = styled.button`
    background: #f0f0f0;
    color: #333;
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    font-size: 13px;
`;

const ConfirmBtn = styled.button`
    background: #ff6600;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    font-size: 13px;
    font-weight: 600;
`;
