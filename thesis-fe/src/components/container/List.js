import React from 'react';
import styled from 'react-emotion'

// Functional Component – Good for presentational components
export const List = (props) => {
  const renderItems = () => {
    return props.items.map(item => {
      return (
        <ListItem key={item}>
          <button onClick={() => props.deleteItem(item)}>X</button>
          <ItemTitle>{item}</ItemTitle>
        </ListItem>
      );
    });
  }

  return (
    <Container>
      <ListContainer>
        {renderItems()}
      </ListContainer>
    </Container>
  );
};

const Container = styled('div')`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction column;
  justify-content: flex-start;
  align-items: center;
`
const ListContainer = styled('div')`
  width: 90%;
  display: flex;
  flex-direction column;
  justify-content: center;
  align-items: center;
`
const ListItem = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction row;
  justify-content: flex-start;
  align-items: center;
`
const ItemTitle = styled('p')`
  margin: 0;
  font-size: 1rem;
`