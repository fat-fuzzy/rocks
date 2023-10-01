import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: process.env.SERVER_URI,
});

const client = new ApolloClient({
  cache,
  link,
});

const GET_FORECAST = gql`
  query GetForecast($city: String!) {
    forecast(city: $city) {
      location {
        city
        country
      }
      weather {
        temperature {
          units
          degrees
          min
          max
        }
        conditions
      }
    }
  }
`;

const requestError = (error, queryString) => {
  // eslint-disable-next-line
  console.log(queryString + '\n' + error);
};

const getForecast = (queryString, callback) => {
  client
    .query({
      query: GET_FORECAST,
      variables: {
        city: queryString,
      },
    })
    .then((result) => {
      callback({ data: result.data, queryString });
    })
    .catch(error => requestError(error, queryString));
};

export default getForecast;
