import styled from "styled-components";
import { DefaultTheme } from "styled-components";

interface ImageProps {
    theme:DefaultTheme
}

const Image = styled.img<ImageProps>`
    width:100px;
    height:100px;
    color:${({theme})=> theme.colors.white};
    
    `;

export default Image;