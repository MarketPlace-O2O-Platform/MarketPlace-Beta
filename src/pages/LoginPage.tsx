import React, {useState} from "react"
import styled from "styled-components"
import InputField from "../components/InputField"
import Button from "../components/Button"
import logo from "../assets/currumi_logo.svg"
import {login} from "../api/api";
import {useNavigate} from "react-router-dom";
import {MdCheckBox, MdCheckBoxOutlineBlank} from "react-icons/md";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [studentId, setStudentId] = useState(localStorage.getItem("studentId") || "");
    const [password, setPassword] = useState(localStorage.getItem("password") || "");
    const [saved, setSaved] = useState<boolean>(localStorage.getItem("saved") === "true");

    // 로그인 요청 함수
    const handleLogin = async () => {
        try {
            const response = await login(studentId, password);
            alert(response.message);

            // 정보 저장
            if(saved) {
                localStorage.setItem("studentId", studentId);
                localStorage.setItem("password", password);
                localStorage.setItem("saved", "true");
            } else{
                // 데이터 삭제
                localStorage.removeItem("studentId");
                localStorage.removeItem("password");
                localStorage.removeItem("saved");
            }

            navigate("/coupons");
        } catch (error) {
            alert("아이디 또는 비밀번호를 다시 입력해주세요.");
            console.log(error);
        }
    };


    return (
        <Container>
            <Content>
                <Header>
                    <Title>대학가 상권에 쏟아지는 쿠폰 꾸러미</Title>
                    <Logo src={logo} alt="쿠러미 로고" />
                </Header>
                <FormContainer>
                    <InputField
                        label="학번(ID)"
                        type="text"
                        placeholder="학번을 입력해주세요"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                    <InputField
                        label="비밀번호"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InfoText>
                        <BoldText> 학교 포털</BoldText>  아이디 / 비밀번호를 적어주세요!</InfoText>
                    <Button
                        text="로그인"
                        onClick={handleLogin}
                    />
                    <CheckboxContainer onClick={ () => setSaved(!saved)}>
                         {saved? <MdCheckBox size={22} color="black" /> : <MdCheckBoxOutlineBlank size={22} color="#9B9B9B" />}
                        <Label htmlFor="saveId">학번(ID)/비밀번호 저장</Label>
                    </CheckboxContainer>
                </FormContainer>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
   // align-items: center;
    justify-content: center;
    width: 90vw;
    min-height: 100vh;
    background-color: white;
`;

const Content = styled.div`
    width: 100%;
    max-width: 400px;
    text-align: center;
    padding: 0 16px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 100px;
    margin-bottom: 80px;
    text-align: center;
`;

const Title = styled.p`
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 25.6px */
    color: #4a4a4a;
    margin-bottom: 8px;
    
`;

const Logo = styled.img`
    width: 124px;
    height: 40px;
`;

const FormContainer = styled.div`
    width: 100%;
`;

const InfoText = styled.p`
    display: flex;
    font-size: 10px;
    color: #777;
    margin-bottom: 17px;
    align-items: flex-start;
    margin-top: -4px;
`;

const BoldText = styled.span`
    font-weight: bold;
    margin-right: 5px;
`;

const CheckboxContainer = styled.div`
    display: flex;
    justify-content: left;
    margin-top: 10px;
    align-items: center;
`;


const Label = styled.label`
    font-size: 12px;
    color: #4a4a4a;
`;

export default LoginPage;
