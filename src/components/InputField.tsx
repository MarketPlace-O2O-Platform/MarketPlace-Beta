import React, {useState} from "react";
import styled from "styled-components";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";

interface InputFieldProps {
    label: string;
    type: string;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputContainer>
            <Label>{label}</Label>
            <InputWrapper>
                <Input
                    type={showPassword ? "text" : type} // 눈 아이콘 클릭 시 텍스트 노출
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    <Icon onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </Icon>
                )}
            </InputWrapper>
        </InputContainer>
    );
};

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 12px;
`;

const Label = styled.label`
    font-size: 14px;
    color: #4a4a4a;
    margin-bottom: 5px;
`;

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const Input = styled.input`
    width: 100%;
    padding: 14px;
    border: 1px solid #E0E0E0;
    border-radius: 2px;
    font-size: 14px;
    box-sizing: border-box;  // box 사이즈를 패딩이 포함된 크기로 조정

    &:focus {
        border: 1px solid black; 
        outline: none;
    }
`;

const Icon = styled.div`
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-40%);
    color: #4a4a4a;
    font-size: 20px;
`;

export default InputField;