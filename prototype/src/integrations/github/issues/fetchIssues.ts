import { client } from "../client";
import { gql } from "@app/lib/graphql-request";
import { startOfDay, formatISO } from "@app/lib/dateFns";

// TODO: graphql-codegen
type FetchIssuesResult = {
  viewer: {
    issues: {
      nodes: {
        title: string;
        url: string;
      }[];
    };
  };
};

export const fetchIssues = async () => {
  const query = gql`
    query fetchIssues($first: Int!, $filterBy: IssueFilters!) {
      viewer {
        issues(first: $first, filterBy: $filterBy) {
          nodes {
            title
            url
          }
        }
      }
    }
  `;

  // TODO: ページング
  const variables = {
    first: 100,
    filterBy: { since: formatISO(startOfDay(new Date())) },
  };

  const result = await client().request<FetchIssuesResult>(query, variables);
  return result.viewer.issues.nodes;
};
