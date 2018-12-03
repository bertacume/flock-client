import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import styled from 'react-emotion';

export class PollList extends Component {
  state = {
    collapse: {
      isExpanded: false,
      key: null
    }
  }
  toggleCollapsible = (item) => {
    if (!this.state.collapse.isExpanded) return this.setState({ collapse: { isExpanded: true, key: item.name } });
    this.state.collapse.key === item.name ?
      this.setState({ collapse: { isExpanded: false, key: null } }) :
      this.setState({ collapse: { isExpanded: true, key: item.name } });
  }
  getCollapseIcon = (name, isVoted) => {
    let iconName = isVoted ? 'white' : 'black';
    if (name === this.state.collapse.key) iconName += '_up';
    return iconName;
  }
  renderCollapsible = (voters) => {
    return (<Collapsible>
      {voters.map(voter => (<CollapsibleItem key={voter.email}>
        <CollapseTitle>Be</CollapseTitle>
        <CollapseTitle>{voter.lastName}</CollapseTitle>
      </CollapsibleItem>))}
    </Collapsible>);
  }

  renderListItem = (item) => {
    //TODO: split in LitsItem component
    const userVoted = item.voters.filter(obj => obj.email === this.props.self.email);
    const isVoted = !!userVoted.length;
    return (<Mutation
      mutation={isVoted ? this.props.mutations.removeVote : this.props.mutations.addVote}
      onCompleted={(res) => console.log(res)}
    >
      {(mutation, { data }) => (
        <ListItem isVoted={isVoted}>
          <ItemButton onClick={() => isVoted ? this.props.removeVote(mutation, item.id) : this.props.addVote(mutation, item.name)}>
            <ParticipantsCont>
              <Centered>{item.voters.length}</Centered>
            </ParticipantsCont>
            <ItemTitle>{item.name}</ItemTitle>
          </ItemButton>
          <Button onClick={() => this.toggleCollapsible(item)}>
            <ImgBtn src={require(`../../assets/collapse_${this.getCollapseIcon(item.name, isVoted)}.png`)} />
          </Button>
        </ListItem>)}
    </Mutation>);
  }

  renderItems = () => {
    if (!this.props.items || !this.props.items.length) return;
    return this.props.items.map(item => {
      return (
        <ListItemContainer key={item.name}>
          {this.renderListItem(item)}
          {this.state.collapse.key === item.name && this.renderCollapsible(item.voters)}
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
const ListItem = styled('div')`
  background: ${props =>
    props.isVoted ? 'linear-gradient(315deg, #feb47b, #ff8e62)' : '#f3f3f3'};
  width: 90%;
  height: 50px;
  padding: 0 15px;
  display: flex;
  flex-direction row;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
`
const Collapsible = styled('div')`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction column;
  justify-content: center;
  align-items: center;
`
const CollapsibleItem = styled('div')`
  height: 100%;
  width: 80%;
  padding: 5px 15px;
  display: flex;
  flex-direction row;
  justify-content: flex-start;
  background: #f3f3f3;
`
const ItemTitle = styled('p')`
  margin: 0;
  font-size: 1rem;
`
const CollapseTitle = styled('p')`
  margin: 0;
  padding: 5px 20px;
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
  padding: 0 20px 0 0;
  display: flex;
  flex-direction row;
  justify-content: start;
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
  height: 100%;
  width: 100%;
  // margin: 0 10%;
  border-width: 0;
  background-color: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`