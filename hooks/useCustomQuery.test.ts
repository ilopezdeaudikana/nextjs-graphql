import { useCustomQuery } from './useCustomQuery';

const expected = {
  id: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
  name: 'react',
  url: 'https://github.com/facebook/react',
  forkCount: 34382,
  stargazerCount: 170148,
};

jest.mock('@apollo/client', () => {
  const data = {
    search: {
      repositoryCount: 2150130,
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
      },
      edges: [
        {
          node: {
            ...expected,
          },
        },
      ],
    },
  };
  return {
    __esModule: true,
    useQuery: jest.fn(() => ({ data })),
    gql: jest.fn(),
  };
});

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn(() => ['', jest.fn()]),
  };
});

describe('useCustomQuery', () => {
  it('should return expected results', () => {
    const [result,] = useCustomQuery();
    expect(result.repos).toEqual([{ ...expected, key: expected.id }]);
  });
});
