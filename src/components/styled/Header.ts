import styled from "styled-components";
import { DefaultTheme } from "styled-components";

interface HeaderProps {
    theme:DefaultTheme
}

const Header = styled.h1<HeaderProps>`
    font-size:4em;
    margin:0px 32px;
    color:${({theme})=> theme.colors.black};
    padding:10px;
    border-radius:10px;
    `;

export default Header;