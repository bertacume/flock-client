import React, { Component } from 'react';
import styled from 'react-emotion';
import { PollListItem } from '../presentational/PollListItem';

export class PollList extends Component {
  renderItems = () => {
    if (!this.props.items || !this.props.items.length) return;
    return this.props.items.map(item => {
      return (
        <ListItemContainer key={item.id}>
          <PollListItem
            item={item}
            self={this.props.self}
            mutations={this.props.mutations}
            addVote={this.props.addVote}
            removeVote={this.props.removeVote}
          />
        </ListItemContainer>
      );
    });
  }
  render() {
    return (
      <Container>
        {this.renderItems()}
      </Container>
    );
  }
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