import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { wsServerURL } from '../../helpers/constants';
import { serverURL } from '../../helpers/constants';

export default () => {  
  const httpLink = createHttpLink({
    uri: serverURL
  });
  
  const token = localStorage.getItem('token');

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  if(token) {
    const wsLinkOptions = {
      uri: wsServerURL,
      options: {
        reconnect: true,
        connectionParams: {}
      },
    };
    
    wsLinkOptions.options.connectionParams.authorization = `Bearer ${token}`;
    const wsLink = new WebSocketLink(wsLinkOptions);
    const link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink,
    )
    return authLink.concat(link);
  } else {
    return authLink.concat(httpLink);
  }
}