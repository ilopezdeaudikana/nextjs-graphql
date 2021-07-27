import { gql, useQuery } from '@apollo/client';
import { useState, Dispatch, SetStateAction } from 'react';
import { Repo, ApolloResult } from '../models';

const getRepos = (query: string) => gql`
  {
    search(first: 50, query: "${query}", type: REPOSITORY) {
      repositoryCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ... on Repository {
            id
            name
            url
            forkCount
            stargazerCount
          }
        }
      }
    }
  }
`;

export const useCustomQuery = (): [
  result: ApolloResult,
  setQuery: Dispatch<SetStateAction<string>>
] => {
  const [query, setQuery] = useState('react');

  const { loading, error, data } = useQuery(getRepos(query));

  const repos: Repo[] = data?.search.edges.map((repo: { node: Repo }) => ({
    ...repo.node,
    key: repo.node.id,
  }));

  const apolloResult: ApolloResult = { loading, error, repos };
  return [apolloResult, setQuery];
};
