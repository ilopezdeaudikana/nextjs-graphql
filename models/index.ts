import { ApolloError } from '@apollo/client';

export interface Repo {
  id: string;
  name: string;
  url: string;
  forkCount: number;
  stargazerCount: number;
}

export interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (a: string, record: any) => string | JSX.Element;
}

export interface ApolloResult {
  loading: boolean;
  error: ApolloError;
  repos: Repo[];
}
