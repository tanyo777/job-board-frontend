import { GoBackButton } from "../../buttons/GoBack";

const JobDetails = ({ job }: any): JSX.Element => {
  return (
    <div>
      <GoBackButton />
      <h1>
        {job.title} ({job.company && job.company.name})
      </h1>
      <h4>Published on: {job.date}</h4>
      <p>
        <b>Description</b>: {job.description}
      </p>
    </div>
  );
};

export default JobDetails;
