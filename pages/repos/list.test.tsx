import { ApolloError } from '@apollo/client';
import { render, fireEvent } from '@testing-library/react';
import * as mockQuery from '../../hooks/useCustomQuery';
import { Repo } from '../../models';

import List from './list';
const spy = jest.spyOn(mockQuery, 'useCustomQuery');
const setQuerySpy = jest.fn();
spy.mockReturnValue([
  { loading: false, error: null as ApolloError, repos: [] as Repo[] },
  setQuerySpy,
]);

describe('List', () => {
  describe('Returns data', () => {
    it('Should call the custom hook', () => {
      render(<List />);
      expect(spy).toHaveBeenCalled();
    });

    it('Should find the input', () => {
      const { getByPlaceholderText } = render(<List />);
      const inputNode = getByPlaceholderText('input search text');
      expect(inputNode).toBeInTheDocument();
    });

    it('Should find the table', () => {
      const { getByTestId } = render(<List />);
      const table = getByTestId('repos');
      expect(table).toBeInTheDocument();
    });

    it('Should call the spy returned by the custom hook', async () => {
      const { findByPlaceholderText, getByRole } = render(<List />);
      const search = await findByPlaceholderText('input search text');
      const searchIcon = getByRole('img');
      fireEvent.change(search, { target: { value: 'jQuery' } });
      fireEvent.click(searchIcon);
      expect(setQuerySpy).toHaveBeenCalledWith('jQuery');
    });
  });

  describe('Is loading', () => {
    beforeEach(() => {
      spy.mockReturnValue([
        { loading: true, error: null as ApolloError, repos: null as Repo[] },
        setQuerySpy,
      ]);
    });
    it('Should render loading p', async () => {
      const { getByTestId } = render(<List />);
      const loading = getByTestId('loading');
      expect(loading).toBeInTheDocument();
    });
  });

  describe('Is Error', () => {
    beforeEach(() => {
      spy.mockReturnValue([
        {
          loading: false,
          error: { message: 'Something went wrong' } as ApolloError,
          repos: null as Repo[],
        },
        setQuerySpy,
      ]);
    });
    it('Should render error p', async () => {
      const { getByTestId } = render(<List />);
      const loading = getByTestId('error');
      expect(loading).toBeInTheDocument();
    });
  });
});
