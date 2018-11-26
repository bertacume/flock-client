import React, { Component } from 'react';
import styled from 'react-emotion'


export class List extends Component {
  deleteItem = async (item) => {
    const items = this.props.items.filter(el => el !== item);
    this.props.setItems(items);
  }

  renderItems = () => {
    return this.props.items.map(item => {
      return (<ListItem key={item}>
        <button onClick={() => this.deleteItem(item)}>X</button>
        <ItemTitle>{item}</ItemTitle>
      </ListItem>);
    });
  }

  render() {
    return (
      <Container>
        <ListContainer>
          {this.renderItems()}
        </ListContainer>
      </Container>
    );
  }
}

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