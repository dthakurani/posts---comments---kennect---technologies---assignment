import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url('https://fi-solutions.s3.amazonaws.com/post-comment-logo.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
      }}
    >
      <div
        style={{
          backgroundColor: 'lightblue',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <h1 style={{ color: 'white', fontSize: '36px' }}>
          Welcome to the Writing Encouragement App
        </h1>
        <p style={{ color: 'white', fontSize: '18px', textAlign: 'center' }}>
          Every word you write has the power to change the world. Do not hold back; let your
          thoughts flow and inspire others.
        </p>
        <Button type='primary' size='large' onClick={() => navigate('/createPost')}>
          Create a Post
        </Button>
      </div>
    </div>
  );
}
