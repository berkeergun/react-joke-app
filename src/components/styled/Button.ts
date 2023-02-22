import styled from "styled-components";
import { DefaultTheme } from "styled-components";

interface ButtonProps {
  theme: DefaultTheme;
}

const Button = styled.button<ButtonProps>`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors?.secondary};
  color: ${(props) => props.theme.colors?.white};
  border-radius: 5px;
  border: none;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.1);
  transition:0.1s ease-in-out;
  cursor:pointer;

  &:hover {
    filter: brightness(85%);
  }
`;
export default Button;
