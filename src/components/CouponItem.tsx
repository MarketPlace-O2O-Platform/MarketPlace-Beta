import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Popup from "./CouponPopup";
import {callUseCoupons} from "../api/api";
import { CouponProps} from "../constants/Coupon.tsx";

const CouponItem: React.FC<CouponProps> = ({coupon}) => {
    const [isUsed, setIsUsed] = useState(coupon.isUsed);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // 팝업열기
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    }

    // 팝업닫기
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    }

    const handleUseCoupons = async () => {
        try {
            await callUseCoupons(coupon.betaCouponId);
            setIsUsed(true);
            setIsPopupOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setIsUsed(coupon.isUsed);
    }, [coupon.isUsed]);

    return (
        <>
            <Container>
                <Image src={`https://marketplace.inuappcenter.kr/image/${coupon.image}`} alt={coupon.couponName}/>
                <Content>
                    <Text>
                        <Store>{coupon.marketName}</Store>
                        <CouponName>{coupon.couponName}</CouponName>
                        <Description>{coupon.couponDetail}</Description>
                    </Text>

                    <UseContent>
                        <Divider/>
                        <Button disabled={isUsed} onClick={handleOpenPopup}>
                            {isUsed ? "사용완료" : "사용하기"}
                        </Button>
                    </UseContent>
                </Content>
            </Container>

            {isPopupOpen && <Popup onClose={handleClosePopup} onConfirm={handleUseCoupons}/>}
        </>
    );
};

const Container = styled.div`
    display: flex;
    background: white;
    overflow: hidden;
    margin: 16px 20px;
    height: 102px;
`;


const Image = styled.img`
    width: 102px;
    height: 102px;
    object-fit: cover;

    @media (max-width: 400px) {
        width: 80px;
        height: 102px;
        object-fit: cover;

    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    width: 100%;
`;

const Text = styled.div`
    flex-direction: column;
    margin-left: 12px;
`;

const Store = styled.p`
    color: #121212;
    font-size: 14px;
    font-weight: 600;
    line-height: 140%; /* 19.6px */
    margin: 5px 3px 0 0;
    white-space: nowrap; /* 한 줄 유지 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis;
    width: 130px;

    @media (max-width: 400px) {
        font-size: 12px;
        width: 100px;
    }
`;

const CouponName = styled.p`
    color: #121212;
    font-size: 16px;
    font-weight: 600;
    margin: 0 3px 0 0;
    white-space: nowrap; /* 한 줄 유지 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis;
    width: 130px;

    @media (max-width: 400px) {
        /* 400px 이하일 때 */
        font-size: 14px;
        width: 100px;
    }
`;

const Description = styled.p`
    font-size: 10px;
    color: #545454;
    font-weight: 400;
    margin: 2px 3px 0 0;

    @media (max-width: 400px) {
        /* 400px 이하일 때 */
        font-size: 8px;
        width: 100px;
    }
`;


const Divider = styled.div`
    height: 68px;
    border-right: 1px dashed #303030;
    margin: 0 0 0 8px;

    @media (max-width: 400px) {
        margin: 0 4px;
    }
`;


const UseContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
    width: 100%;
`;

const Button = styled.button`
    background: #ffffff;
    color: ${({disabled}) => (disabled ? "#9B9B9B" : "#000")};
    width: 60px;
    font-size: 13px;
    font-weight: 700;
    line-height: 140%; /* 18.2px */
    letter-spacing: 0.26px;
    border: none;

    @media (max-width: 400px) {
        font-size: 12px;
        padding: 4px 8px;
    }

`;

export default CouponItem;