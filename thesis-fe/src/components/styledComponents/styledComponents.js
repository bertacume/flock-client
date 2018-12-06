import { css } from 'emotion';
import styled from 'react-emotion';
import { fontFamily, addTrip, basicColors } from '../../helpers/styleConstants';

export const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
`
export const NavBar = styled('div')`
  box-sizing: border-box;
  width: 100vw;
  height: 8vh;
  padding: 1.5vh 2vw 1.5vh 2vw;
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
  color: ${basicColors.pressedColor};
  border-width: 0 0 2px 0;
  border-color: white;
  background-color: transparent;
  font-size: 1.5rem;
`
export const ContainerMode = styled('div')`
  width: 90%;
  display: flex;
  flex-direction row;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 0 10px 0;
`
export const Button = styled('button')`
  margin: 0 5px;
  width: 100%;
  height: 7vh;
  border-width: 0;
  border-radius: 2rem;
  color: ${basicColors.pressedColor};
  background-color: ${addTrip.containerBackground};
  font-family: ${fontFamily};
`
export const pressed = css`
  color: white;
  font-weight: 500;
  background-color: ${basicColors.pressedColor};
`
export const SubContainer = styled('div')`
  width: 100%;
  display: flex;
  padding: 20px 0 30px 0;
  flex-direction column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${addTrip.containerBackground};
  border-radius: 3rem;

  Input:focus{
    outline: none;
  }
`
export const BasicContainer = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  padding: 5%;
  flex-direction column;
  justify-content: flex-start;
  align-items: center;
  color: ${basicColors.pressedColor}
  font-weight: 500;
  font-size: 1.4rem;
`
export const LoadingStyle = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction column;
  justify-content: center;
  align-items: center;
  color: ${basicColors.middleColor};
`
