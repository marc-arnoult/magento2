import { gql } from 'graphql-request';

export default gql`
  mutation revokeCustomerToken{
    revokeCustomerToken {
      result
    }
  }
`;
