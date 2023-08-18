import { useState } from "react";
import { GoBackButton } from "../../components/buttons/GoBack";
import { useNavigate } from "react-router-dom";
import gqlClient from "../../graphql/client";
import { createJobMutation } from "../../graphql/queries/job.queries";
import { useMutation } from "@apollo/client";

interface ICreateJobState {
  input: {
    title: string;
    description?: string;
    companyId: string;
  };
}

const CreateJobPage = (): JSX.Element => {
  const [createJobState, setCreateJobState] = useState<ICreateJobState>({
    input: {
      title: "",
      description: "",
      companyId: "1",
    },
  });

  const [createJob, result] = useMutation(createJobMutation);

  const navigate = useNavigate();

  const inputChangeHandler = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    setCreateJobState((prevState: any) => ({
      input: {
        ...prevState.input,
        [name]: value,
      },
    }));
  };

  const createJobHandler = async () => {
    let newState = {};

    if (!createJobState.input.description?.length) {
      newState = {
        input: { ...createJobState.input, description: "none" },
      };
    }

    const {
      data: {
        job: { id },
      },
    }: any = await createJob({
      variables: (newState as any).input ? newState : (createJobState as any),
    });

    navigate(`/jobs/${id}`);
  };

  return (
    <>
      <GoBackButton />
      <input
        placeholder="Job title..."
        onChange={inputChangeHandler}
        name="title"
      />
      <input
        placeholder="Job description..."
        onChange={inputChangeHandler}
        name="description"
      />
      <button onClick={createJobHandler}>publish job</button>
    </>
  );
};

export default CreateJobPage;
