import axios from "axios";
import {Coupon} from "../constants/Coupon.tsx";

const API_BASE_URL = "https://marketplace.inuappcenter.kr";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// 학번으로 로그인
export const login = async (studentId: string, password: string) => {
    try {
        const response = await apiClient.post("/api/members", {studentId, password});

        if(response.data.response){
            localStorage.setItem("accessToken", response.data.response);
        }
        return response.data;

    } catch (error) {
        console.error("로그인 요청 실패:",error);
        throw error;
    }
};

// 쿠폰 목록 조회 API 추가
export const fetchCoupons = async ( betaCouponId? : number,
                                    category?: string,
                                    size: number = 20)
    : Promise<{ betaCouponResDtos: Coupon[], hasNext: boolean }>=> {
    try {
        // 요청할 쿼리 파라미터 생성
        const params: {
            betaCouponId?: number;
            category?: string;
            size: number;
        } = { size };

        if (betaCouponId !== undefined) params.betaCouponId = betaCouponId;
        if (category && category !== "") params.category = category;
        params.size = size;

        const response = await apiClient.get("/api/beta/coupons", { params });
        return response.data.response;

    } catch (error) {
        console.error("쿠폰 목록 조회 실패:", error);
        throw error;
    }
};

export const fetchImage = async (image: string) : Promise<Blob> => {
        const response = await apiClient.get(`/image/${image}`, {
            responseType: "blob"
        });

        if(response.status !== 200){
            throw new Error("Fail to fetch image");
        }

        return response.data;
}

export const callUseCoupons = async (betaCouponId : number) => {
    try{
        const response = await apiClient.put(`/api/beta/coupons/${betaCouponId}`);
        return response.data.response;
    }catch(error) {
        console.error("사용 처리 실패", error);
        throw error;
    }
};