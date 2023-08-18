import { Box } from "@mui/material";

import JobsGrid from "../grid/JobsGrid";

const JobsList = (): JSX.Element => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <JobsGrid />
    </Box>
  );
};

export default JobsList;
