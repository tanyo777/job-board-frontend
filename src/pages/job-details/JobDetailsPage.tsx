import { useParams } from "react-router-dom";

import JobDetails from "../../components/jobs/job-details/JobDetails";
import { getJobWithCompanyQuery } from "../../graphql/queries/job.queries";
import { useQuery } from "@apollo/client";

const JobDetailsPage = (): JSX.Element => {
  const { id } = useParams<string>();

  const { loading, data, error } = useQuery(getJobWithCompanyQuery, {
    variables: { id: id as string },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Cannot fetch job</h1>;
  }

  return <JobDetails job={data?.job && data.job} />;
};

export default JobDetailsPage;
