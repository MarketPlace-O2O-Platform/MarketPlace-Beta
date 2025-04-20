// LazyImage.tsx
import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {fetchImage} from "../api/api.ts";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
   src: string;
    placeholder?: string; // 기본 placeholder 이미지 URL (옵션)
}

const LazyImage: React.FC<LazyImageProps> = ({ src, placeholder, alt, ...rest }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    // IntersectionObserver를 이용한 뷰포트 진입 감지
    useEffect(() => {
        const imgElement = imgRef.current;
        if (!imgElement) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // 한 번 감지되면 관찰 해제
                }
            },
            { threshold: 0.1 } // 이미지가 10% 이상 보이면 로드
        );
        observer.observe(imgElement);
        return () => {
            observer.disconnect();
        };
    }, []);

    // 뷰포트에 들어온 후 실제 이미지 로드
    useEffect(() => {
        if (!isVisible || !src) return;
        async function load() {
            try {
                const blob = await fetchImage(src as string);
                const objectUrl = URL.createObjectURL(blob);
                setImageUrl(objectUrl);
                setLoaded(true);
            } catch (error) {
                console.error("이미지 로드 실패:", src, error);
            }
        }
        load();
    }, [isVisible, src]);


    return (
        <StyledImage
            ref={imgRef}
            src={loaded && imageUrl ? imageUrl : (placeholder || "")}
            alt={alt}
            loading="lazy"
            className={loaded ? "loaded" : "loading"}
            {...rest}
        />
    );
};

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

const StyledImage = styled.img`
    object-fit: cover;
    transition: filter 0.4s ease-out, opacity 0.4s ease-out;
        
    &.loading {
            filter: blur(8px);
            opacity: 0.5;
            background: linear-gradient(
                    to right,
                    #eeeeee 8%,
                    #dddddd 18%,
                    #eeeeee 33%
            );
            background-size: 800px 102px;
            animation: ${shimmer} 0.5s linear infinite;
        }

  &.loaded {
    filter: blur(0);
    opacity: 1;
  }

`;

export default LazyImage;