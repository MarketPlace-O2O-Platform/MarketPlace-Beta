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

    const marketNames = Object.keys(groupedByMarket);
    const groupArray = marketNames.map((marketName) => groupedByMarket[marketName]);

    const result: Coupon[] = [];
    let i = 0;
    let j = 0;

    while (i < groupArray.length || j < group2.length) {
        if (i < groupArray.length) {
            result.push(...groupArray[i]);
            i++;
        }
        if (j < group2.length) {
            result.push(group2[j]);
            j++;
        }
    }
    return result;
}