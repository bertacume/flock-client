import React from 'react';
import styled from 'react-emotion';
import { PollListItem } from '../container/PollListItem';

export const PollList = (props) => {
  const renderItems = () => {
    if (!props.items || !props.items.length) return;
    const items = props.items.slice().sort((a,b) => b.voters.length - a.voters.length);
    return items.map(item => {
      return (
          <PollListItem
            key={item.id}
            item={item}
            self={props.self}
            type={props.type}
            mutations={props.mutations}
            addVote={props.addVote}
            removeVote={props.removeVote}
          />
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