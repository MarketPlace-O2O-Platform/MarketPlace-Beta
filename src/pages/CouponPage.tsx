import React, { useState, useEffect, useRef} from "react";
import styled from "styled-components";
import CouponItem from "../components/CouponItem";
import ListHeader from "../components/ListHeader";
import { fetchCoupons } from "../api/api";
import categoryMap from "../constants/CategoryMap";
import {Coupon} from "../constants/Coupon";
import currumi_kakao from "../../public/currumi_kakao.svg";
import {mixCoupons} from "../utils/CouponUtils";
import PopupControl from "../components/PopupControl.tsx";

const CouponPage: React.FC = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [hasNext, setHasNext] = useState(true);
    const [lastCouponId, setLastCouponId] = useState<number | undefined>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const observerRef = useRef<HTMLDivElement | null>(null);
    const isFetchingCoupons = useRef(false);

    const loadCoupons = async () => {
        if (!hasNext || isFetchingCoupons.current ) return; // 더 이상 데이터가 없으면 요청 X
        isFetchingCoupons.current = true;

        try {
            const categoryCode = categoryMap[selectedCategory] || "";
            const data = await fetchCoupons(lastCouponId, categoryCode, 10);
            setCoupons((prev) => {
                const newBatch = data.betaCouponResDtos;
                const reorderedNewBatch = mixCoupons(newBatch);
                // 기존의 prev 순서는 그대로 유지하고, 그 뒤에 재정렬한 새로운 배치를 추가
                return [...prev, ...reorderedNewBatch];
            }); // 기존 쿠폰 + 새로운 쿠폰 추가

            setHasNext(data.hasNext);

            // 마지막 쿠폰의 데이터 저장
            if (data.betaCouponResDtos.length > 0) {
                const lastItem = data.betaCouponResDtos[data.betaCouponResDtos.length - 1];
                setLastCouponId(lastItem.betaCouponId);
            }
        } catch (error) {
            console.error("쿠폰 데이터를 불러오는 중 오류 발생:", error);
        } finally {
            isFetchingCoupons.current = false;
        }

    };

    useEffect(() => {
        setCoupons([]);
        setLastCouponId(undefined);
        setHasNext(true);
        loadCoupons();
    }, [selectedCategory]);

    // 무한 스크롤
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadCoupons(); // 마지막 요소가 화면에 보이면 데이터 요청
            }
        }, { threshold: 0.8 });

        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [hasNext, lastCouponId]);


    return (
        <Container>
            <PopupControl/>
            <ListHeader
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <KakaoLink href="http://pf.kakao.com/_XkZnn" rel="noopener noreferrer">
                <Image src={currumi_kakao} alt="Kakao" />
            </KakaoLink>
            <CouponList>
                {coupons.length > 0 ? (
                    coupons.map((coupon) => (
                        <CouponItem
                            key={coupon.betaCouponId}
                            coupon={coupon}
                        />))
                ) : (
                    <EmptyMessage>쿠폰이 없습니다.</EmptyMessage>
                )}
            </CouponList>
            {hasNext && <LoadingRef ref={observerRef}>Loading ...</LoadingRef>}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    width: 100vw;
    min-height: 100vh;
    flex-direction: column;
    background-color: #FAFAFA;
`;

const KakaoLink = styled.a`
    display: block;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const CouponList = styled.div`
    width: 100%;
    padding-top: 25px;
`;

const EmptyMessage = styled.p`
    text-align: center;
    color: #777;
    font-size: 14px;
`;

const LoadingRef = styled.div`
    text-align: center;
    padding: 20px;
    font-size: 14px;
    color: #777;
    overflow: auto;
`;

export default CouponPage;