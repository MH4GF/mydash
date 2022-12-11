import { GraphQLClient } from "@app/lib/graphql-request";

export const client = () => {
  return new GraphQLClient("https://api.github.com/graphql", {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
};
