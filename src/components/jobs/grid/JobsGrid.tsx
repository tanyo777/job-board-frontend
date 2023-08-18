import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";

import {
  deleteJobMutation,
  getJobsWithCompanyQuery,
} from "../../../graphql/queries/job.queries";
import {
  JOB_CREATE_SUBSCRIPTION,
  JOB_DELETE_SUBSCRIPTION,
} from "../../../graphql/subscriptions";

const JobsGrid = (): JSX.Element => {
  const columns: GridColDef[] = [
    { field: "date", flex: 1, headerName: "Published on" },
    {
      field: "title",
      flex: 1,
      headerName: "Job Title",
      renderCell(params) {
        const jobTitle = params.row.title;
        const jobId = params.id;
        return <NavLink to={`/jobs/${jobId}`}>{jobTitle}</NavLink>;
      },
    },
    {
      field: "Company",
      flex: 1,
      renderCell(params) {
        const companyName = params.row.company.name;
        const companyId = params.row.company.id;
        return <NavLink to={`/companies/${companyId}`}>{companyName}</NavLink>;
      },
    },
    {
      field: "Published by",
      flex: 1,
      renderCell(params) {
        const row = params.row;

        if (row.user) {
          return <p>{row.user.email}</p>;
        } else {
          return <p>Not specified</p>;
        }
      },
    },
    {
      field: "Delete",
      flex: 1,
      renderCell(params) {
        const id = params.id as string;
        const email = params.row.user.email;
        const userEmail = localStorage.getItem("email");

        const deleteJobHandler = async () => {
          const deleteResult = await deleteJob({
            variables: { id },
            refetchQueries: [
              {
                query: getJobsWithCompanyQuery,
                variables: { limit: 10, offset: 0 },
              },
            ],
          });
        };

        if (userEmail && email === userEmail) {
          return (
            <Button
              onClick={deleteJobHandler}
              variant="contained"
              color="error"
            >
              {(!deleteResult.loading || deleteResult.loading) &&
              id === deleteResult.data?.job.id
                ? "Deleting..."
                : "Delete"}
            </Button>
          );
        }
      },
    },
  ];

  // get all jobs
  const [getJobs, { called, loading, error, data }] = useLazyQuery(
    getJobsWithCompanyQuery
  );

  // job create subscription
  useSubscription(JOB_CREATE_SUBSCRIPTION, {
    onData: ({ client, data }) => {
      const job = data.data.job;
      client.cache.updateQuery(
        { query: getJobsWithCompanyQuery, variables: { limit: 10, offset: 0 } },
        (data) => {
          const jobs = data?.jobs.jobs;
          const count = data?.jobs.count;
          const newCache = {
            jobs: {
              jobs: [...(jobs as any), job],
              count: (count as number) + 1,
            },
          };
          console.log(newCache);
          return newCache;
        }
      );
    },
  });

  // job delete subscription
  useSubscription(JOB_DELETE_SUBSCRIPTION, {
    onData: ({ client, data }) => {
      const jobData = data.data.job;
      client.cache.updateQuery(
        { query: getJobsWithCompanyQuery, variables: { limit: 10, offset: 0 } },
        (data) => {
          const jobs = data?.jobs.jobs;
          const count = data?.jobs.count;
          const newCache = {
            jobs: {
              jobs: jobs?.filter((job) => job.id !== jobData.id),
              count: (count as number) - 1,
            },
          };
          console.log(newCache);
          return newCache;
        }
      );
    },
  });

  // delete job
  const [deleteJob, deleteResult] = useMutation(deleteJobMutation);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const getJobsHandler = async (limit: number, offset: number) => {
    const jobs = await getJobs({ variables: { limit, offset } });
    return jobs;
  };

  useEffect(() => {
    document.title = "Jobs";
    getJobsHandler(10, 0);
  }, []);

  if (!called) {
    return <h1>Loading...</h1>;
  }

  if (called && loading) {
    return <h1>Loading...</h1>;
  }

  if (called && error) {
    return <h1>Cannot fetch jobs</h1>;
  }

  interface IMUIPaginationArgs {
    page: number;
    pageSize: number;
  }

  const paginationChange = async (args: IMUIPaginationArgs) => {
    const { page, pageSize } = args;
    setPaginationModel(args);
    await getJobsHandler(pageSize, page * pageSize);
  };

  return (
    <DataGrid
      sx={{ maxHeight: "70vh" }}
      columns={columns}
      rows={data?.jobs.jobs as any}
      paginationMode="server"
      rowHeight={50}
      rowCount={data?.jobs.count as number}
      onPaginationModelChange={paginationChange}
      paginationModel={paginationModel}
      pageSizeOptions={[10, 25, 50]}
    />
  );
};

export default JobsGrid;
