import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {Coupon} from "../constants/Coupon.tsx";

interface KakaoPopupProps {
    coupon?: Coupon;
    onClose: () => void;
    onTodayNoSee: () => void;
}

const KakaoPopup: React.FC<KakaoPopupProps> = ({ coupon, onClose, onTodayNoSee }) => {
    const [isHidden, setIsHidden] = useState<boolean>(() => {
        const today = new Date().toDateString();
        return localStorage.getItem("kakaoPopupNoShowDate") === today;
    });

    useEffect(() => {
        const origOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = origOverflow;
        };
    }, []);

    useEffect(() => {
        const today = new Date().toDateString();
        const storedDate = localStorage.getItem("kakaoPopupNoShowDate");
        setIsHidden(storedDate === today);
    }, []);

    const handleTodayNoSee = () => {
        const today = new Date().toDateString();
        localStorage.setItem("kakaoPopupNoShowDate", today);

        onTodayNoSee();
        setIsHidden(true);
        onClose();
    };

    return (
        <Overlay onClick={onClose}>
            <PopupContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>×</CloseButton>
                <Title>
                    <BoldText>쿠러미 채널 추가</BoldText>만 해도
                    <br />
                    <BoldText>GS 1,000원 기프티콘</BoldText>
                </Title>
                <Description>
                    신규 혜택을 놓치지 않고
                    <br />
                    확인할 수 있어요!
                </Description>
                <ButtonGroup>
                    <ChannelButton
                        href="http://pf.kakao.com/_XkZnn"
                        rel="noopener noreferrer"
                        onClick={() => {
                            const source = localStorage.getItem("utm_source") || "unknown";
                            const medium = localStorage.getItem("utm_medium") || "unknown";
                            const campaign = localStorage.getItem("utm_campaign") || "unknown";

                            if (coupon) {
                                window.gtag?.("event", "click_kakao_channel", {
                                    source: source,
                                    medium: medium,
                                    campaign: campaign,
                                    market_name: coupon.marketName,
                                    coupon_name: coupon.couponName,
                                });
                            } else {
                                window.gtag?.("event", "click_kakao_channel", {
                                    source,
                                    medium,
                                    campaign,
                                });
                            }
                        }}

                    >
                        채널 추가하기
                    </ChannelButton>
                    {!isHidden && (
                        <TodayNoSeeButton onClick={handleTodayNoSee}>
                            오늘 보지 않기
                        </TodayNoSeeButton>
                    )}
                </ButtonGroup>
            </PopupContainer>
        </Overlay>
    );
};

export default KakaoPopup;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
`;

const PopupContainer = styled.div`
    position: relative;
    width: 70%;
    max-width: 80%;
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
`;

const Title = styled.h2`
    font-size: 17px;
    font-weight: 500;
    margin: 12px 0;
    line-height: normal;
    color: #000;
`;

const BoldText = styled.span`
    font-weight: 700;
`;

const Description = styled.p`
    font-size: 14px;
    color: #9d9d9d;
    line-height: normal;
    margin: 0 0 15px;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const ChannelButton = styled.a`
    display: inline-block;
    background-color: #fee500;
    color: #000;
    font-weight: 600;
    padding: 6px;
    border-radius: 5px;
    text-decoration: none;

    &:hover {
        background-color: #fbcf0a;
    }
`;

const TodayNoSeeButton = styled.button`
    background-color: transparent;
    color: #999;
    border: none;
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        color: #666;
        text-decoration: underline;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 6px;
    right: 6px;
    background: transparent;
    font-size: 20px;
    border: none;
    color: #aaa;
    cursor: pointer;
`;