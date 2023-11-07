import axios from '#/api/axios';
import { Container } from '#/components/Common';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Typography, Input, Select, Switch, Tooltip, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;

function getAllPosts(params) {
  return axios.get('post', { params });
}

export default function Posts() {
  const navigate = useNavigate();

  const [type, setType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [userPost, setUserPost] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: postData, isLoading } = useQuery(
    ['posts', type, searchQuery, sortBy, sortOrder, userPost, page, limit],
    () =>
      getAllPosts({
        type,
        searchQuery,
        sortBy,
        sortOrder,
        userPost,
        page,
        limit
      }),
    { keepPreviousData: true }
  );

  const handleSearch = debounce((value) => {
    setSearchQuery(value);
  }, 500);

  return (
    <Container>
      <div style={{ width: '80%' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Input
            placeholder='Search...'
            style={{ flex: 1, marginRight: '4px' }}
            suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '8px'
            }}
          >
            <Select style={{ width: 120 }} value={type} onChange={(value) => setType(value)}>
              <Option value='all'>All</Option>
              <Option value='comments'>Comments</Option>
              <Option value='posts'>Posts</Option>
            </Select>
            <Select style={{ width: 120 }} value={sortBy} onChange={(value) => setSortBy(value)}>
              <Option value='createdAt'>Sort by Date</Option>
              <Option value='title'>Sort by Post</Option>
            </Select>
            <Select
              style={{ width: 120, marginRight: '16px' }}
              value={sortOrder}
              onChange={(value) => setSortOrder(value)}
            >
              <Option value='asc'>Ascending</Option>
              <Option value='desc'>Descending</Option>
            </Select>
            <Tooltip title='My Posts' placement='top'>
              <Switch
                defaultChecked={false}
                value={userPost}
                onChange={(value) => setUserPost(value)}
              />
            </Tooltip>
          </div>
        </div>
        {postData?.posts.length > 0 ? (
          postData?.posts.map(({ _id, title, createdAt, userId: { name } }) => (
            <Card
              hoverable
              key={_id}
              loading={isLoading}
              className='mb-4 rounded-lg bg-white shadow-lg'
              style={{ width: '100%' }}
            >
              <div className='p-6'>
                <Title level={4} className='mb-4 text-xl font-semibold'>
                  {title}
                </Title>
                <div className='mb-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Text>
                        <strong>Posted By:</strong>
                      </Text>
                    </div>
                    <div>
                      <Text>{name}</Text>
                    </div>
                    <div>
                      <Text>
                        <strong>Posted On:</strong>
                      </Text>
                    </div>
                    <div>
                      <Text>{new Date(createdAt).toLocaleString()}</Text>
                    </div>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <Button type='primary' onClick={() => navigate(_id)}>
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p>No posts available. Why not create one?</p>
            <Button type='primary' onClick={() => navigate('/createPost')}>
              Create Post
            </Button>
          </div>
        )}
      </div>

      <br />
      {postData?.posts.length > 0 && (
        <Pagination
          simple
          defaultCurrent={1}
          current={page}
          onChange={(a) => setPage(a)}
          total={postData?.total}
        />
      )}
    </Container>
  );
}
