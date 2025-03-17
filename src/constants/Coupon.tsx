export interface Coupon{
        betaCouponId: number;
        marketName: string;
        couponName: string;
        couponDetail: string;
        image: string;
        isUsed: boolean;
}

export interface CouponProps {
    coupon: Coupon;
}