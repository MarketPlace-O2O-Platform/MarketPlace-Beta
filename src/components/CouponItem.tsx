import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Popup from "./CouponPopup";
import KakaoPopup from "./KakaoPopup";
import {callUseCoupons, fetchImage} from "../api/api";
import {Coupon} from "../constants/Coupon";
import kakao from "../assets/kakao.png";

interface CouponItemProps {
    coupon: Coupon;
}

const CouponItem: React.FC<CouponItemProps> = ({coupon}) => {
    const [isUsed, setIsUsed] = useState(coupon.isUsed);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isKakaoPopupOpen, setIsKakaoPopupOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleOpenPopup = () => {setIsPopupOpen(true); }
    const handleClosePopup = () => {setIsPopupOpen(false);}

    // KakaoPopup 열기
    const handleOpenKakaoPopup = () => {setIsKakaoPopupOpen(true);};
    const handleCloseKakaoPopup = () => {setIsKakaoPopupOpen(false);};

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
                        <ActionButton
                            onClick={isUsed ? handleOpenKakaoPopup : handleOpenPopup}
                        >
                            {isUsed ? (
                                <><KakaoIcon src={kakao} alt="Kakao Icon"/>
                                    <br/>채널추가
                                </>
                            ) : (
                                "사용하기"
                            )}
                        </ActionButton>
                    </UseContent>
                </Content>
            </Container>
            {isPopupOpen &&
                <Popup onClose={handleClosePopup} onConfirm={handleUseCoupons}/>}
            {isKakaoPopupOpen && (
                <KakaoPopup
                    onClose={handleCloseKakaoPopup}
                    onTodayNoSee={handleCloseKakaoPopup}
                />
            )}
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
 
`;

const Text = styled.div`
    margin-left: 12px;
    min-width: 60%;
  
    width: 70% ;
`;

const Store = styled.p`
    color: #121212;
    font-size: 14px;
    font-weight: 600;
    line-height: 140%; 
    margin: 5px 3px 0 0;
    white-space: nowrap; /* 한 줄 유지 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis;
    width: 80%;

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
    width: 70%;

    @media (max-width: 400px) {
        font-size: 14px;
        width: 80%;
    }
`;

const Description = styled.p`
    font-size: 12px;
    color: #545454;
    font-weight: 400;
    margin: 2px 3px 0 0;
    max-width: 70%;
    @media (max-width: 400px) {
        font-size: 11px;
        width: 90%;
    }
`;

// 절개선
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

const ActionButton = styled.button`
  width: 100%;
  min-width: 100%;
  margin: 0 10%;
  font-size: 13px;
  font-weight: 700;
  line-height: 155%;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  padding: 6px 10px;
  background: #fff;
  color: #000 ;
 
  @media (max-width: 400px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const KakaoIcon = styled.img`
    width: 17px;
    height: 17px;
    margin-right: 4px;
    vertical-align: middle;
    border-radius: 20%;
`;

export default CouponItem;