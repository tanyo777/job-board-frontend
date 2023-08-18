import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { getCompanyQuery } from "../../../graphql/queries/company.queries";
import { GoBackButton } from "../../../components/buttons/GoBack";

const CompanyDetailsPage = (): JSX.Element => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(getCompanyQuery, {
    variables: { id: id as string },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <div>
        <GoBackButton />
        <h1 style={{ color: "tomato" }}>Company not found</h1>
      </div>
    );
  }

  return (
    <Box sx={{ marginTop: "20px" }}>
      <GoBackButton />
      <Typography variant="h4">
        Company name: {data?.company && (data.company as any).name}
      </Typography>
      <Typography variant="h5">
        Address: {data?.company && (data.company as any).address}
      </Typography>
      <Typography variant="h6">Jobs:</Typography>

      <ul>
        {data?.company &&
          (data.company as any).jobs &&
          (data.company as any).jobs.map((job: any) => (
            <li>
              {job.title} (published on: {job.date})
            </li>
          ))}
      </ul>
    </Box>
  );
};

export default CompanyDetailsPage;
