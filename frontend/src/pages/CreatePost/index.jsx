import { Container } from '#/components/Common';
import { Button, Input, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '#/api/axios';

const { Title } = Typography;

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    setIsLoading(true);

    const body = {
      title,
      content
    };

    try {
      await axios.post('post', body);

      setIsLoading(false);
      navigate('/posts');
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '80%' }}>
        <Title>Create a New Post</Title>

        <Input
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '16px' }}
        />

        <Input.TextArea
          placeholder='Enter your post content here'
          autoSize={{ minRows: 3, maxRows: 6 }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginBottom: '16px' }}
        />

        <Button type='primary' onClick={handleCreatePost} loading={isLoading}>
          Create Post
        </Button>
      </div>
    </Container>
  );
}
