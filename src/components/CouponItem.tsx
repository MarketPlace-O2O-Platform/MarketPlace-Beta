import React, {useEffect, useState} from "react";
import styled from "styled-components";
import KakaoPopup from "./KakaoPopup";
import {callUseCoupons} from "../api/api";
import {Coupon} from "../constants/Coupon";
import kakao from "../assets/kakao.png";
import LazyImage from "./LazyImage.tsx";
import DetailPopup from "./DetailPopup";

interface CouponItemProps {
    coupon: Coupon;
}

const placeholderImg =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGN49+4dAAWYAsspex20AAAAAElFTkSuQmCC";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gtag: (...args: any[]) => void;
    }
}

const CouponItem: React.FC<CouponItemProps> = ({coupon}) => {
    const [isUsed, setIsUsed] = useState(coupon.isUsed);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isKakaoPopupOpen, setIsKakaoPopupOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);

        const params = new URLSearchParams(window.location.search);
        const source = params.get("utm_source");
        const campaign = params.get("utm_campaign");

        window.gtag("event", "open_coupon_popup", {
            coupon_id: coupon.betaCouponId,
            source: source || "unknown",
            campaign: campaign || "unknown",
            market_name: coupon.marketName,
            coupon_name: coupon.couponName,
        });
    }
    const handleOpenKakaoPopup = () => {setIsKakaoPopupOpen(true);};
    const handleCloseKakaoPopup = () => {setIsKakaoPopupOpen(false);};

    const handleUseCoupons = async () => {
        try {
            await callUseCoupons(coupon.betaCouponId);
            setIsUsed(true);
           // setIsPopupOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleImageLoad = (url: string) => {
        setImageUrl(url);
    };

    useEffect(() => {
        setIsUsed(coupon.isUsed);
    }, [coupon.isUsed]);

    let buttonText: string;
    let buttonOnClick: () => void;

    if (!coupon.isPromise) {
        buttonText = "추가";
        buttonOnClick = handleOpenKakaoPopup;
    } else {
        if (!isUsed) {
            buttonText = "사용하기";
            buttonOnClick = handleOpenPopup;
        } else {
            buttonText = "사용완료";
            buttonOnClick = () => {};
        }
    }
    const isKakaoStyle = !coupon.isPromise;

    return (
        <>
            <Container>
                <Image
                    src={coupon.image}
                    placeholder={placeholderImg}
                    alt={coupon.marketName}
                    onImageLoad={handleImageLoad}
                />
                <Content>
                    <Text>
                        <Store>{coupon.marketName}</Store>
                        <CouponName>{coupon.couponName}</CouponName>
                        <Description>{coupon.couponDetail}</Description>
                    </Text>

                    <UseContent>
                        <Divider/>
                        <ActionButton onClick={buttonOnClick} $isKakaoStyle={isKakaoStyle} $isUsed={isUsed}>
                            {isKakaoStyle ? (
                                <>
                                    <KakaoIcon src={kakao} alt="Kakao Icon" />{buttonText}
                                </>
                            ) : (
                                buttonText
                            )}
                        </ActionButton>
                    </UseContent>
                </Content>
            </Container>
            {isPopupOpen && (
                <DetailPopup
                    coupon={coupon}
                    onClose = {() => setIsPopupOpen(false)}
                    onConfirm = { () => handleUseCoupons() }
                    imageUrl = {imageUrl!}
                    />)}
            {isKakaoPopupOpen && (
                <KakaoPopup
                    onClose={handleCloseKakaoPopup} onTodayNoSee={handleCloseKakaoPopup}
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

const Image = styled(LazyImage)`
    width: 102px;
    height: 102px;

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
    width: 75%;

    @media (max-width: 400px) {
        font-size: 14px;
        width: 80%;
    }
`;

const Description = styled.p`
    font-size: 11px;
    color: #545454;
    font-weight: 400;
    margin: 2px 3px 0 0;
    max-width: 78%;
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

interface ActionButtonProps {
    $isKakaoStyle: boolean;
    $isUsed: boolean;
}

const ActionButton = styled.button<ActionButtonProps>`
  width: 100%;
  min-width: 100%;
  margin: 0 10%;
  font-size: 13px;
  font-weight: ${({ $isKakaoStyle}) => ($isKakaoStyle ? "500" : "700")};
  line-height: 155%;
  border: none;
  border-radius: 4px;
  padding: ${({ $isKakaoStyle }) => ($isKakaoStyle ? "3px 1px" : "6px 10px")};
  background: ${({ $isKakaoStyle}) => ($isKakaoStyle? "#FFDD04" : "#fff")};
  color: ${({ $isUsed}) => ($isUsed ? "#9B9B9B" : "#000")};
 
  @media (max-width: 400px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const KakaoIcon = styled.img`
    width: 17px;
    height: 17px;
    vertical-align: middle;
    border-radius: 20%;
`;

export default CouponItem;