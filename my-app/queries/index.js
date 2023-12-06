import { useQuery, gql } from "@apollo/client";
export const READ_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      slug
      description
      price
      mainImg
      categoryId
      idmongodb
      userMongo {
        _id
        username
        email
      }
    }
  }
`;

export const READ_DETAIL_PRODUCT = gql`
  query GetProducts($slug: String) {
    getOneProduct(slug: $slug) {
      id
      name
      slug
      description
      price
      mainImg
      categoryId
      idmongodb
      userMongo {
        _id
        username
        email
      }
    }
  }
`;
