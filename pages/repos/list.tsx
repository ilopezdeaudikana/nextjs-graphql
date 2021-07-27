import { Table, Input } from 'antd';
import { ForkOutlined, StarOutlined } from '@ant-design/icons';
import { Wrapper, Section } from '../wrapper';
import { Column, Repo } from '../../models';
import { useCustomQuery } from '../../hooks/useCustomQuery';

const { Search } = Input;

const columns: Column[] = [
  {
    title: 'Name',
    dataIndex: 'linkedName',
    key: 'linkedName',
    /* eslint-disable-next-line react/display-name */
    render: (text: string, record: Repo) => (
      <a rel="noreferrer" target="_blank" href={record.url}>
        {record.name.charAt(0).toUpperCase() + record.name.slice(1)}
      </a>
    ),
  },
  {
    title: 'Forks',
    dataIndex: 'forkCount',
    key: 'forkCount',
    /* eslint-disable-next-line react/display-name */
    render: (text: string) => (
      <span>
        <ForkOutlined /> &nbsp;
        {text}
      </span>
    ),
  },
  {
    title: 'Stars',
    dataIndex: 'stargazerCount',
    key: 'stargazerCount',
    /* eslint-disable-next-line react/display-name */
    render: (text: string) => (
      <span>
        <StarOutlined />
        &nbsp;
        {text}
      </span>
    ),
  },
];

export default function List() {
  const [result, setQuery] = useCustomQuery();
  const { loading, error, repos } = result;
  const onSearch = (value: string) => setQuery(value);

  if (loading) return <p data-testid="loading">Loading ...</p>;
  if (error) return <p data-testid="error">Error! {error.message}</p>;

  return (
    <Wrapper>
      <Section max="30rem">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
        <Table data-testid="repos" columns={columns} dataSource={repos} />
      </Section>
    </Wrapper>
  );
}
