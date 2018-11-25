import React, { Component } from 'react';
import Navigation from '../container/Navigation';
import styled from 'react-emotion'
import { Query } from "react-apollo";
import gql from "graphql-tag";


const GeneralInfo = styled('button')`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vh;
`;



class TripDetails_page extends Component {

  render() {
    console.log(this.props);
    const TripDetailsApollo = ({ tripID }) => (
      <Query
      query={gql`
        {
          trip (tripID: $tripID) {
            name,
            participants{
              firstName,
              lastName
            },
            destination{
              chosenDestination{
                name
              }
            },
            budget{
              chosenBudget{value}
            },
            timeFrame{
              chosenTimeFrame{
                startDate
              }
            }
          }
        }
      `}
      errorPolicy="all"
      variables ={{tripID : this.props.tripID}}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) console.log('opappapa');
        if (data) console.log(this.props);
        if (data.trip) {
          return (
            <div>
            <Navigation textContent={data.trip.name}/>
            <GeneralInfo>
              <h1>
                ops
              </h1>
              <h2>
                aloha
              </h2>
            </GeneralInfo>
          </div>
          );
        }
        else if (!data.trip) {
          return (
            <h1>
              Sorry, trip not found
            </h1>
          )
        }
      }
    }
    </Query>
    );
    return (
      <TripDetailsApollo />
    );
  }
}

export default TripDetails_page

/*
  Here we should go knowing both the user id and the trip id. We will get from the db:
  on schema:
    - name,
    - participants,
    - destination.
    - budget,
    - timeFrame

  should the id it will try to fetch from graphql should come from the url -> allow for direct access to the url and
  independence
*/