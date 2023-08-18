import { gql } from "@apollo/client";

import { JobDetailFragment } from "./queries/job.queries";

export const JOB_CREATE_SUBSCRIPTION = gql`
  subscription OnJobAdded {
    job: jobAdded {
      ...JobDetails
      company {
        id
        name
      }
      user {
        email
      }
    }
  }
  ${JobDetailFragment}
`;

export const JOB_DELETE_SUBSCRIPTION = gql`
  subscription OnJobAdded {
    job: jobDeleted {
      ...JobDetails
      company {
        id
        name
      }
      user {
        email
      }
    }
  }
  ${JobDetailFragment}
`;
