import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://magento2-instance.vuestorefront.io/graphql'; // todo: bind from config

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
   // authorization: 'Bearer MY_TOKEN', todo: add headers
  },
});

export default graphQLClient;
