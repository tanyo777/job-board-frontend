interface IEnvConfig {
  gqlEndpoint: string;
  wsGqlEndpoint: string;
  restPath: string;
}

const envConfig: IEnvConfig = {
  gqlEndpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
  wsGqlEndpoint: process.env.REACT_APP_WS_GRAPHQL_ENDPOINT as string,
  restPath: process.env.REACT_APP_REST_PATH as string,
};

export default envConfig;
