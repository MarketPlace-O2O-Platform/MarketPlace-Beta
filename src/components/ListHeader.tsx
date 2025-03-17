import React from "react";
import styled from "styled-components";
import logo from "../assets/currumi_logo.svg";
import {categories} from "../constants/CategoryMap";

interface Props {
    selectedCategory: string;
    setSelectedCategory: (selectedCategory: string) => void;
}

const ListHeader: React.FC<Props> = ({ selectedCategory, setSelectedCategory }) => {

    return (
        <Container>
            <Logo src={logo} alt="쿠러미 로고" />
            <CategoryMenu>
                {categories.map((category) => (
                    <CategoryItem
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        $selected={selectedCategory === category}
                    >
                        {category}
                    </CategoryItem>
                ))}
            </CategoryMenu>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    background: white;
    padding: 10px 0 0 0;
    text-align: center;
`;

const Logo = styled.img`
    width: 56px;
    height: 18px;
    margin: 10px 0;
`;

const CategoryMenu = styled.div`
    display: flex;
    justify-content: space-around;
`;

const CategoryItem = styled.div<{ $selected: boolean }>`
    font-size: 14px;
    color: ${({ $selected }) => ($selected ? "black" : "#868686")}; 
    cursor: pointer;
    padding: 5px 10px;
    border-bottom: ${({ $selected }) => ($selected ? "2px solid black" : "none")};
    font-weight: "normal";
`;

export default ListHeader;