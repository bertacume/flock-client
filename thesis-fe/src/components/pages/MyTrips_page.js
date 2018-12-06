import React, { Component } from 'react';
import MyTripsDashboard from '../../components/container/MyTripsDashboard';
import { Query } from "react-apollo";
import GET_MY_TRIPS from '../apollo/queries/get_my_trips';
import GET_MY_TRIPS_SUB from '../apollo/subscriptions/get_my_trips_sub';
import { Navbar } from '../presentational/Navbar';
import menu from '../../assets/menu.png'
import logo from '../../assets/logo_orange.png'
import { Loading } from '../presentational/Loading';

class MyTrips_page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID : localStorage.getItem('id')
    }
  }


  render() {
    const MyTripsApollo = () => (
      <Query
        query={GET_MY_TRIPS}
        variables={{ id: this.state.userID }}
        errorPolicy="all"
        fetchPolicy='cache-and-network'
      >
        {({ subscribeToMore, loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) {
            console.log(error);
            window.location.replace('/auth');
          }
          return (
            data.self.trips ?
              <div>
                <Navbar
                    pathLeft={`/mytrips`}
                    pathRight={`/profile`}
                    title={'My Trips'}
                    history={this.props.history}
                    iconLeft={logo}
                    iconRight={menu}
                  />
                <MyTripsDashboard history={this.props.history} info={data.self.trips}
                sub={
                  () => subscribeToMore({
                    document: GET_MY_TRIPS_SUB,
                    variables: {},
                    updateQuery: (prev, {subscriptionData}) => {
                      if (!subscriptionData.data) return prev;
                      if (prev.self.trips.every(obj => obj.id !== subscriptionData.data.tripInfoChanged.id)) {
                        const newObj = prev;
                        newObj.self.trips.push(subscriptionData.data.tripInfoChanged)
                        return newObj
                      }

                      return prev;
                    }
                  })
                }
                />
              </div> : null
          );
        }}
      </Query>
    );
    return (
      <MyTripsApollo />
    );
  }
}


export default MyTrips_page;

/*
  Here is the first page the user should naturally join. We should receive from this page the user ID and will fetch:
  on schema :
    email
    firstName
    lastName
  not on schema:
    profile image
    information about subscribed trips
*/