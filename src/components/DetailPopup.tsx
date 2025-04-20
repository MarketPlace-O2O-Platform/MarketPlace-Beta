import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Coupon } from "../constants/Coupon";
import LazyImage from "./LazyImage";

interface CouponPopupProps {
    coupon: Coupon;
    onClose: () => void;
    onConfirm: () => void;
}

const DetailPopup: React.FC<CouponPopupProps> = ({ coupon, onClose, onConfirm }) => {
    const [isConfirming, setIsConfirming] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isUsed, setIsUsed] = useState(coupon.isUsed);

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

    const handleConfirm = () => {
        onConfirm();
        setIsUsed(true);
        setIsConfirming(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    };

    return (
        <>
            <Overlay onClick={onClose}>
                <Dialog onClick={(e) => e.stopPropagation()}>
                    <CloseButton onClick={onClose}>×</CloseButton>
                    <ImageWrapper>
                        <StyledImage src={coupon.image} alt={coupon.couponName} />
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

                        {!isUsed && isConfirming ? (
                            <>
                                <ConfirmText>
                                    쿠폰은 한 번만 사용할 수 있어요.<br />
                                    정말 사용하시겠어요?
                                </ConfirmText>
                                <ButtonRow>
                                    <CancelBtn onClick={() => setIsConfirming(false)}>취소</CancelBtn>
                                    <ConfirmBtn onClick={handleConfirm}>사용하기</ConfirmBtn>
                                </ButtonRow>
                            </>
                        ) : (
                            <ActionButton onClick={handleUseClick} disabled={isUsed}>
                                {isUsed ? "사용완료" : "쿠폰 사용하기"}
                            </ActionButton>
                        )}
                        <Note>
                            ※ <BoldNote>매장에서 </BoldNote> 쿠폰 사용 시 [쿠폰 사용하기] 버튼을 눌러주세요.
                        </Note>
                    </Body>
                </Dialog>
            </Overlay>

            {showToast && <Toast> ✅ 쿠폰이 정상적으로 사용되었습니다.</Toast>}
        </>
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
`;

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 0 auto;
`;

const StyledImage = styled(LazyImage)`
    aspect-ratio: 1 / 1;
    max-width: 50%;
    max-height: 50%;
    display: block;
    margin-top: 26px;
    object-fit: cover;

    @media (max-width: 400px) {
        width: 50%;
        height: 50%;
        object-fit: cover;
    }
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
`;

const DividerLine = styled.div`
    flex: 1;
    border-top: 1px dashed #ccc;
    height: 1px;
    margin: 0 4px;
`;

const Dot = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #999;

    &:first-child {
        transform: translateX(-50%);
    }

    &:last-child {
        transform: translateX(50%);
    }
`;

const ActionButton = styled.button<{ disabled?: boolean }>`
    width: 80%;
    padding: 12px 0;
    margin: 12px 0;
    background: ${({ disabled }) => (disabled ? '#ccc' : '#303030')};
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

const Note = styled.p`
    margin: 0 0 4px 0;
    font-size: 10px;
    color: #888;
`;

const BoldNote = styled.span` 
    font-size: 10px;
    font-weight: 600;
    color: #888;
`

const ConfirmText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 10px 0;
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
  background: #303030;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-size: 13px;
  font-weight: 600;
`;

const Toast = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 12px 16px;
  border-radius: 20px;
  font-size: 13px;
  z-index: 1500;
  white-space: nowrap;
`;
