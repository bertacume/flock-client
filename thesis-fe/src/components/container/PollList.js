import React from 'react';
import styled from 'react-emotion';

export const PollList = (props) => {
  const renderItems = () => {
    if (!props.items || !props.items.length) return;
    return props.items.map(item => {
      return (
        <ListItem key={item.name}>
          <ListItemContainer>
            <Button onClick={() => props.deleteItem(item)}>
              <ImgBtn src={require('../../assets/delete_grey.png')} />
            </Button>
            <ItemButton onClick={() => props.handleItem(item)}>
              <ItemTitle>{item.name}</ItemTitle>
            </ItemButton>
            <ParticipantsCont>
              <ParImg src={require('../../assets/participants.png')} />
              <Centered>{item.voters.length}</Centered>
            </ParticipantsCont>
            <Button onClick={() => this.displayVoters}>
              <ImgBtn src={require('../../assets/back_grey.png')} />
            </Button>
          </ListItemContainer>
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
  height: 80px;
  padding: 0 10px;
  display: flex;
  flex-direction row;
  justify-content: space-between;
  align-items: center;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #e9e9e9;
`
const ListItemContainer = styled('div')`
  width: 100%;
  height: 90%;
  padding: 0 10px;
  display: flex;
  flex-direction row;
  justify-content: space-between;
  align-items: center;
  border-radius: 2rem;
  // background: linear-gradient(to left, #fbaa72, #ea8d6b);
`
const ItemTitle = styled('p')`
  margin: 0;
  font-size: 1rem;
`
const ImgBtn = styled('img')`
  height: 80%;
`
const ParImg = styled('img')`
  postion: absolute;
  height: 80%;
`
const Button = styled('button')`
  height: 30px;
  width: 10%;
  padding: 0;
  border-width: 0;
  background-color: transparent;
`
const ParticipantsCont = styled('div')`
  height: 30px;
  width: 10%;
  display: flex;
  flex-direction row;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  background-color: transparent;
`
const Centered = styled('p')`
  position: absolute;
  font-size: 1.5rem;
  margin: 0;
`

const ItemButton = styled('button')`
  height: 30px;
  width: 50%;
  // margin: 0 10%;
  border-width: 0;
  background-color: transparent;
`