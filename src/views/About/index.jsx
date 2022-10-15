import { useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();

  return (
    <div>
      <div>about</div>
      <button onClick={() => navigate('/')}>go home</button>
    </div>
  );
}

export default Index;
