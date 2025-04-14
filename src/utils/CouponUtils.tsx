import { Coupon } from "../constants/Coupon.tsx";

/**
 * 쿠폰 배열을 섞는 함수
 * 1. isPromise가 true인 쿠폰은 marketName별로 그룹화
 * 2. 그룹과 isPromise가 false인 쿠폰을 번갈아 추가
 */
export function mixCoupons(coupons: Coupon[]): Coupon[] {
    const group1 = coupons.filter((coupon) => coupon.isPromise);
    const group2 = coupons.filter((coupon) => !coupon.isPromise);

    // 1번 쿠폰-marketName별로 그룹화
    const groupedByMarket: Record<string, Coupon[]> = {};
    for (const coupon of group1) {
        if (!groupedByMarket[coupon.marketName]) {
            groupedByMarket[coupon.marketName] = [];
        }
        groupedByMarket[coupon.marketName].push(coupon);
    }

    const groupArray = Object.values(groupedByMarket)
        .map((group) => group.sort((a, b) => a.betaCouponId - b.betaCouponId))
        // 각 그룹의 첫 번째 쿠폰의 betaCouponId 값을 기준으로 그룹 정렬
        .sort((a, b) => a[0].betaCouponId - b[0].betaCouponId);

    const result: Coupon[] = [];
    let i = 0;
    let j = 0;

    while (i < groupArray.length || j < group2.length) {
        if (i < groupArray.length) {
            result.push(...groupArray[i]);
            i++;
            console.log(result);
        }
        for (let k = 0; k < 2 && j < group2.length; k++) {
            result.push(group2[j]);
            j++;
            console.log(result);
        }
    }
    return result;
}