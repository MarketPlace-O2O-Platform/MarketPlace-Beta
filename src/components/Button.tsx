import React from "react";
import styled from "styled-components";

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

const StyledButton = styled.button`
    display: flex;
    width: 100%;
    height : 38px;
    padding: 6px 50px;
    border: none;
    justify-content: center;
    align-items: center;
    background-color: #303030;
   
    color: white;
    border-radius: 4px;
    font-size: 16px;
  
`;

export default Button;