import { Typography } from "@mui/material";

import JobsList from "../../components/jobs/jobs-list/JobsList";

const Jobs = (): JSX.Element => {
  return (
    <>
      <Typography variant="h3">Job Board</Typography>
      <JobsList />
    </>
  );
};

export default Jobs;
