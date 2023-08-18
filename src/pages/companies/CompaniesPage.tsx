import { useQuery } from "@apollo/client";

import { getCompaniesQuery } from "../../graphql/queries/company.queries";
import { GoBackButton } from "../../components/buttons/GoBack";
import CompanyComponent from "../../components/companies/company-component/CompanyComponent";

const CompaniesPage = (): JSX.Element => {
  const { loading, error, data } = useQuery(getCompaniesQuery);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Cannot fetch companies</h1>;
  }

  return (
    <div>
      <GoBackButton />
      {data?.companies &&
        data.companies.map((company: any) => (
          <CompanyComponent company={company} />
        ))}
    </div>
  );
};

export default CompaniesPage;
