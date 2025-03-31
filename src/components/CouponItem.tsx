import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Popup from "./CouponPopup";
import {callUseCoupons, fetchImage} from "../api/api";
import {Coupon} from "../constants/Coupon.tsx";

interface CouponItemProps {
    coupon: Coupon;
}

const CouponItem: React.FC<CouponItemProps> = ({coupon}) => {
    const [isUsed, setIsUsed] = useState(coupon.isUsed);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    // 팝업열기
    const handleOpenPopup = () => {setIsPopupOpen(true); }
    // 팝업닫기
    const handleClosePopup = () => {setIsPopupOpen(false);}

    const handleUseCoupons = async () => {
        try {
            await callUseCoupons(coupon.betaCouponId);
            setIsUsed(true);
            setIsPopupOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect ( () => {
        async function loadImage() {
            const blob = await fetchImage(coupon.image);
            setImageSrc(URL.createObjectURL(blob));
        }
        loadImage();
    },[coupon.image]);

    useEffect(() => {
        setIsUsed(coupon.isUsed);
    }, [coupon.isUsed]);

    return (
        <>
            <Container>
                {imageSrc ?  (
                    <Image src={imageSrc} alt={coupon.couponName}/>
                ): (<PlaceHolder > Loading... </PlaceHolder>)}
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


const PlaceHolder = styled.div`
    width: 100px;
    height: 102px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    font-size: 12px;
    color: #999;
`

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
    flex: 1; 
    width: 100%;
    justify-content: flex-end;  // 오른쪽으로 맞추고

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
    min-width: fit-content;
    margin: 0 10% ; // 버튼 양 공백을 줌 

    
    @media (max-width: 400px) {
        font-size: 12px;
        padding: 4px 8px;
    }

`;

export default CouponItem;