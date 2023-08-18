import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import Jobs from "./pages/jobs/Jobs";
import NotFoundPage from "./pages/404/404Page";
import JobDetailsPage from "./pages/job-details/JobDetailsPage";
import CompaniesPage from "./pages/companies/CompaniesPage";
import CompanyDetailsPage from "./pages/companies/company-details/CompanyDetailsPage";
import CreateJobPage from "./pages/create-job/CreateJobPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Protected from "./components/protected/Protected";
import PublicRoute from "./components/public-route/PublicRoute";
import apolloClient from "./graphql/client";
import Navbar from "./components/navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/jobs",
    element: (
      <Protected>
        <Navbar />
        <Jobs />
      </Protected>
    ),
  },
  {
    path: "/jobs/:id",
    element: (
      <Protected>
        <Navbar />
        <JobDetailsPage />
      </Protected>
    ),
  },
  {
    path: "/companies",
    element: (
      <Protected>
        <Navbar />
        <CompaniesPage />
      </Protected>
    ),
  },
  {
    path: "/companies/:id",
    element: (
      <Protected>
        <Navbar />
        <CompanyDetailsPage />
      </Protected>
    ),
  },
  {
    path: "/create-job",
    element: (
      <Protected>
        <Navbar />
        <CreateJobPage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
