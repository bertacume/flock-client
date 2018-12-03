import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import styled from 'react-emotion';

export class PollListItem extends Component {
  state = {
    isExpanded: false,
  }

  toggleCollapsible = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  getCollapseIcon = (isVoted) => {
    let iconName = isVoted ? 'white' : 'black';
    if (this.state.isExpanded) iconName += '_up';
    return iconName;
  }

  renderCollapsible = (voters) => {
    return (<Collapsible>
      {voters.map(voter => (<CollapsibleItem key={voter.email}>
        <CollapseTitle>{voter.firstName}</CollapseTitle>
        <CollapseTitle>{voter.lastName}</CollapseTitle>
      </CollapsibleItem>))}
    </Collapsible>);
  }

  render() {
    const { item } = this.props;
    const userVoted = item.voters.filter(obj => obj.email === this.props.self.email);
    const isVoted = !!userVoted.length;
    const title = item.name ? item.name : item.value;
    return (<Mutation
      mutation={isVoted ? this.props.mutations.removeVote : this.props.mutations.addVote}
      onCompleted={(res) => console.log(res)}
    >
      {(mutation, { data }) => (
        <ListItem isVoted={isVoted}>
          <ItemButton onClick={() => isVoted ? this.props.removeVote(mutation, item.id) : this.props.addVote(mutation, title)}>
            <ParticipantsCont>
              <Centered>{item.voters.length}</Centered>
            </ParticipantsCont>
            <ItemTitle>{title}</ItemTitle>
          </ItemButton>
          <Button onClick={() => this.toggleCollapsible(item)}>
            <ImgBtn src={require(`../../assets/collapse_${this.getCollapseIcon(isVoted)}.png`)} />
          </Button>
        </ListItem>)}
    </Mutation>);
  }
};

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