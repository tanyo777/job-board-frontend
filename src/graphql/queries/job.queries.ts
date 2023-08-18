// graphql function for queries type inference
import { gql } from "@apollo/client";
import { graphql } from "../../generated";

export const getJobsQuery = graphql(`
  query Jobs {
    jobs {
      jobs {
        id
        title
        description
        date
      }
    }
  }
`);

export const JobDetailFragment = gql`
  fragment JobDetails on Job {
    id
    title
    date
  }
`;

// get the $id variable from the query and pass it as an argument to the resolver
export const getJobWithCompanyQuery = graphql(`
  query JobWithCompany($id: ID!) {
    job(id: $id) {
      ...JobDetails
      description
      company {
        id
        name
      }
    }
  }
`);

export const getJobsWithCompanyQuery = graphql(`
  query JobsWithCompany($limit: Int, $offset: Int) {
    jobs(limit: $limit, offset: $offset) {
      jobs {
        ...JobDetails
        company {
          id
          name
        }
        user {
          email
        }
      }
      count
    }
  }
`);

export const createJobMutation = graphql(`
  mutation CreateJob($input: CreateJobInput!) {
    # job is alias representing the response object
    job: createJob(input: $input) {
      id
    }
  }
`);

export const deleteJobMutation = graphql(`
  mutation DeleteJob($id: ID!) {
    # jobs is a alias representing the response object
    job: deleteJob(id: $id) {
      ...JobDetails
      company {
        id
        name
      }
    }
  }
`);

export const updateJobMutation = graphql(`
  mutation UpdateJob($input: UpdateJobInput!) {
    # jobs is alias representing the response object
    jobs: updateJob(input: $input) {
      jobs {
        id
        title
        date
        company {
          id
          name
        }
      }
      count
    }
  }
`);
