import React, { Component } from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';

// Functional Component – Good for presentational components --> Not used, createRef needed
export class List extends Component {
  constructor(props) {
    super(props);
    this.listEnd = React.createRef();
  }

  componentDidMount() {
    !(this.listEnd.current === null) && this.scrollToBottom();
  }

  componentDidUpdate() {
    !(this.listEnd.current === null) && this.scrollToBottom();
  }

  scrollToBottom = () => {
    // console.log('here');
    this.listEnd.current.scrollIntoView({ behavior: "smooth" });
  }

  renderItems = () => {
    return this.props.items.map(item => {
      return (
        <ListItem key={item} styles={this.props.styles && this.props.styles.listItem && this.props.styles.listItem.join('; ')}>
          <ItemTitle styles={this.props.styles && this.props.styles.itemTitle && this.props.styles.itemTitle.join('; ')}>{item}</ItemTitle>
          <button onClick={() => this.props.deleteItem(item)}>
            <ImgBtn src={require('../../assets/delete.png')} />
          </button>
        </ListItem>
      );
    });
  }

  render() {
    return (
      <Container>
        <ListContainer styles={this.props.styles && this.props.styles.listContainer && this.props.styles.listContainer.join('; ')}>
          {this.renderItems()}
          <div ref={this.listEnd} />
        </ListContainer>
      </Container>
    );
  }
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
  width: 100%;
  overflow: scroll;
  ${ListContainerStyle};
`
const ListItemStyle = props =>
  css`
    ${props.styles};
  `
const ListItem = styled('div')`
  height: 100%;
  display: flex;
  flex-direction row;
  justify-content: space-between;
  align-items: center;
  ${ListItemStyle};
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