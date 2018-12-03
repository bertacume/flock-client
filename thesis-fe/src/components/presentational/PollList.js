import React from 'react';
import styled from 'react-emotion';
import { PollListItem } from '../container/PollListItem';

export const PollList = (props) => {
  const renderItems = () => {
    if (!props.items || !props.items.length) return;
    const items = props.items.slice().sort((a,b) => b.voters.length - a.voters.length);
    return items.map(item => {
      return (
        <ListItemContainer key={item.id}>
          <PollListItem
            item={item}
            self={props.self}
            type={props.type}
            mutations={props.mutations}
            addVote={props.addVote}
            removeVote={props.removeVote}
          />
        </ListItemContainer>
      );
    });
  };
  return (
    <Container>
      {renderItems()}
    </Container>
  );
};

const Container = styled('div')`
  width: 100%;
  display: flex;
  flex-direction column;
  justify-content: flex-start;
  align-items: center;
  overflow: scroll;
`
const ListItemContainer = styled('div')`
  width: 90%;
  align-items: center;
  margin: 5px 0;
  padding: 0;
`