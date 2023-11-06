import axios from '#/api/axios';
import { Container } from '#/components/Common';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Card, Typography, Input, Form } from 'antd';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const { Text } = Typography;
const { TextArea } = Input;

function getPostById(postId) {
  return axios.get(`/post/${postId}`);
}

function addComment(postId, comment) {
  return axios.post(`/post/${postId}/comment`, { content: comment });
}

function formatTimestamp(timestamp) {
  const now = new Date();
  const commentDate = new Date(timestamp);

  if (
    now.getFullYear() === commentDate.getFullYear() &&
    now.getMonth() === commentDate.getMonth() &&
    now.getDate() === commentDate.getDate()
  ) {
    // If the comment was posted today, show the time
    return `${commentDate.getHours()}:${commentDate.getMinutes()}`;
  }
  // Otherwise, show the date
  return commentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function PostDetails() {
  const { postId } = useParams();
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const { data: post, isLoading } = useQuery(['post', postId], () => getPostById(postId));

  const handleAddComment = async () => {
    await addComment(postId, comment);
    queryClient.invalidateQueries(['post', postId]);
    setComment('');
  };

  return (
    <Container>
      <div className='mx-auto w-11/12'>
        {isLoading ? (
          'Loading...'
        ) : (
          <Card
            title={post.title}
            loading={isLoading}
            className='mb-4 rounded-lg bg-white shadow-lg'
          >
            <div className='p-6'>
              <Text strong>Created By: {post.userId.name}</Text>
              <br />
              <Text strong>Created At: {new Date(post.createdAt).toLocaleString()}</Text>
              <br />
              <br />
              <Text>{post.content}</Text>
            </div>
          </Card>
        )}
        <br />
        <h2 className='mb-4 text-2xl font-bold'>Comments</h2> {/* Add a "Comments" heading */}
        {post?.comments.length === 0 ? (
          <p className='mb-4'>No comments yet. Be the first to add one!</p>
        ) : (
          post?.comments.map((postComment) => (
            // eslint-disable-next-line no-underscore-dangle
            <div key={postComment._id} style={{ marginBottom: '16px' }}>
              <div>
                <Text strong>{postComment.userId.name} </Text>
                <Text type='secondary'>{formatTimestamp(postComment.createdAt)}</Text>
              </div>
              <div className='mb-2 text-gray-700'>{postComment.content}</div>
            </div>
          ))
        )}
        <Form>
          <Form.Item style={{ marginBottom: '8px' }}>
            <TextArea
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: '60%' }} // Set a fixed width, such as 60% of the container width
              placeholder='Add a comment...'
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={handleAddComment}>
              Add Comment
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
}
