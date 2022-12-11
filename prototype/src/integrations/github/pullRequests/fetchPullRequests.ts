import { client } from "../client";
import { gql } from "@app/lib/graphql-request";

// TODO: graphql-codegen
type FetchPullRequestsResult = {
  viewer: {
    pullRequests: {
      nodes: {
        title: string;
        url: string;
        updatedAt: string;
      }[];
    };
  };
};

export const fetchPullRequests = async () => {
  const query = gql`
    query fetchPullRequests($first: Int!, $orderBy: IssueOrder!) {
      viewer {
        pullRequests(first: $first, orderBy: $orderBy) {
          nodes {
            title
            url
            updatedAt
          }
        }
      }
    }
  `;

  // TODO: ページング
  const variables = {
    first: 100,
    orderBy: { field: "UPDATED_AT", direction: "DESC" },
  };

  const result = await client().request<FetchPullRequestsResult>(
    query,
    variables
  );
  return result.viewer.pullRequests.nodes;
};
