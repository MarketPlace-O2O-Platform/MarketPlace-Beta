import React from "react";
import styled from "styled-components";

interface KakaoPopupProps {
    onClose: () => void;
    onTodayNoSee: () => void;
}

const KakaoPopup: React.FC<KakaoPopupProps> = ({ onClose, onTodayNoSee,}) => {
    return (
        <Overlay>
            <PopupContainer>
                <Title>
                    <BoldText> 쿠러미 채널 추가</BoldText> 하고
                    <br/>
                    <BoldText>GS 1,000원 기프티콘 </BoldText>받기
                </Title>
                <Description>
                    신규 혜택을 놓치지 않고
                    <br/>
                    확인할 수 있어요!
                </Description>
                <ButtonGroup>
                    <ChannelButton
                        href="http://pf.kakao.com/_XkZnn"
                        rel="noopener noreferrer"
                    >
                        채널 추가하기
                    </ChannelButton>
                    <TodayNoSeeButton onClick={onTodayNoSee}>
                        오늘 보지 않기
                    </TodayNoSeeButton>
                </ButtonGroup>
                <CloseButton onClick={onClose}>×</CloseButton>
            </PopupContainer>
        </Overlay>
    );
};

export default KakaoPopup;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
`;

const PopupContainer = styled.div`
    position: relative;
    width: 70%;
    max-width: 80%;
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    box-sizing: border-box;
    text-align: center;
`;

const Title = styled.h2`
    font-size: 18px;
    font-weight: 500;
    margin: 0 0 12px;
    line-height: normal;
    color: #000;
`;

const BoldText = styled.span`
    font-weight: 700; 
`;

const Description = styled.p`
    font-size: 14px;
    color: #9D9D9D;
    line-height: normal;
    margin: 0 0 20px;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const ChannelButton = styled.a`
    display: inline-block;
    background-color: #fee500;
    color: #000;
    font-weight: 600;
    padding: 8px;
    border-radius: 5px;
    text-decoration: none;
  
    &:hover {
        background-color: #fbcf0a;
    }
`;

const TodayNoSeeButton = styled.button`
    background-color: transparent;
    color: #999;
    border: none;
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        color: #666;
        text-decoration: underline;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 6px;
    right: 6px;
    background: transparent;
    font-size: 20px;
    border: none;
    color: #aaa;
    cursor: pointer;
    &:hover {
        color: #333;
    }
`;