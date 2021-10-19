
import gql from 'graphql-tag';
import { productInfo } from '../fragments';

export default gql`
  ${productInfo}

  query product(
    $productCode: String!
  ) {
    product(
      productCode: $productCode
    ) {
      ...productInfo
    }
  }
`;
