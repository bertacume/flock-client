import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';

// Functional Component – Good for presentational components
export const List = (props) => {
  const renderItems = () => {
    return props.items.map(item => {
      return (
        <ListItem key={item} styles={props.styles.listItem && props.styles.listItem.join('; ')}>
          <ItemTitle styles={props.styles.itemTitle && props.styles.itemTitle.join('; ')}>{item}</ItemTitle>
          <button onClick={() => props.deleteItem(item)}>
            <ImgBtn src={require('../../assets/delete.png')} />
          </button>
        </ListItem>
      );
    });
  }
  return (
    <Container>
      <ListContainer styles={props.styles.listContainer && props.styles.listContainer.join('; ')}>
        {renderItems()}
      </ListContainer>
    </Container>
  );
};

const Container = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction column;
    justify-content: flex-start;
    align-items: center;
  `
const ListContainerStyle = props =>
  css`
    ${props.styles};
  `
const ListContainer = styled('div')`
   ${ListContainerStyle};
    width: 100%;
    heigth: 100%
    display: flex;
    flex-direction column;
    justify-content: center;
    align-items: center;
    overflow: scroll;
  `
  const ListItemStyle = props =>
  css`
    ${props.styles};
  `
const ListItem = styled('div')`
    ${ListItemStyle};
    height: 100%;
    display: flex;
    flex-direction row;
    justify-content: space-between;
    align-items: center;
  `

const ItemTitleStyle = props =>
  css`
    ${props.styles};
  `
const ItemTitle = styled('p')`
  ${ItemTitleStyle};
  `
const ImgBtn = styled('img')`
  width: 20px;
  `