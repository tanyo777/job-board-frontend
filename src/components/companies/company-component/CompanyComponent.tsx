import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const CompanyComponent = ({ company }: any): JSX.Element => {
  return (
    <Box>
      <Typography variant="h3">
        <NavLink to={`/companies/${company.id}`}>{company.name}</NavLink>
      </Typography>
    </Box>
  );
};

export default CompanyComponent;
