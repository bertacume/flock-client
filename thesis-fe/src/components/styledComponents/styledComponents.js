import styled from 'react-emotion';
import { fontFamily } from '../../helpers/styleConstants';

export const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0; 
`
export const NavBar = styled('div')`
  box-sizing: border-box;
  width: 100%;
  height: 8vh;
  padding: 2% 4% 2% 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
`
export const Input = styled('input')`
  width: 80%;
  height: 5vh;
  text-align: center;
  font-family: ${fontFamily};
  padding: 0 10px;
  color: #b75537;
  border-width: 0 0 2px 0;
  border-color: white;
  background-color: transparent;
  font-size: 1.5rem;
`