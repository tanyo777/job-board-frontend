import { graphql } from "../../generated";

export const getCompaniesQuery = graphql(`
  query Companies {
    companies {
      id
      name
      address
    }
  }
`);

export const getCompanyQuery = graphql(`
  query CompanyById($id: ID!) {
    company(id: $id) {
      id
      name
      address
      jobs {
        title
        date
      }
    }
  }
`);
