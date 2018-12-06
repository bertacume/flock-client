import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import styled from 'react-emotion';
import { selectedGradient, notSelectedColor } from '../../helpers/styleConstants';
import moment from 'moment';

export class PollListItem extends Component {
  state = {
    isExpanded: false,
    isLocked: 'lock'
  }

  toggleCollapsible = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  getCollapseIcon = (isVoted) => {
    let iconName = 'white';
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
    let title;
    if (item.name) title = item.name;
    else if (item.value) title = item.value
    else title = (moment(item.startDate).format('DD-MM-YYYY') + ' - ' + moment(item.endDate).format('DD-MM-YYYY'))
    return (<ListItemContainer>

      <ListItem isVoted={isVoted}>
        <Mutation
          mutation={isVoted ? this.props.mutations.removeVote : this.props.mutations.addVote}
        >
          {(mutation, { data }) => (
            <ItemButton onClick={() => isVoted ? this.props.removeVote(mutation, item.id) : this.props.addVote(mutation, title)}>
              <ParticipantsCont>
                <Centered isVoted={isVoted}>{item.voters.length}</Centered>
              </ParticipantsCont>
              <ItemTitle isVoted={isVoted}>{title}</ItemTitle>
            </ItemButton>
          )}
        </Mutation>
        { (this.props.creator.email === this.props.self.email) ?
          <Mutation
            mutation={this.props.mutations.lock}
          >
          { mutation => (
            <Button onClick={() => this.props.lock(mutation, item.id) }>
              <ImgBtn src={require(`../../assets/svg/${this.state.isLocked}.svg`)} />
            </Button>
          )
            }
          </Mutation>
          : null
        }
        <Button onClick={() => this.toggleCollapsible(item)}>
        <ImgBtn src={require(`../../assets/collapse_${this.getCollapseIcon(isVoted)}.png`)} />
          </Button>
      </ListItem>

      {this.state.isExpanded && this.renderCollapsible(item.voters)}
    </ListItemContainer>);
  }
};

const ListItemContainer = styled('div')`
  width: 90%;
  align-items: center;
  margin: 5px 0;
  padding: 0;
`
const ListItem = styled('div')`
  background: ${props =>
    props.isVoted ? selectedGradient : notSelectedColor};
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
  border-radius: 0 0 1rem 1rem;
`
const ItemTitle = styled('p')`
  margin: 0;
  color: ${props =>
    props.isVoted ? '#ffffff' : '#000000'};
  font-size: 1.2rem;
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
  color: ${props =>
    props.isVoted ? '#ffffff' : '#000000'};
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