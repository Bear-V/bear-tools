import { useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();

  return (
    <>
      <div>404</div>
      <button onClick={() => navigate('/')}>go home</button>
    </>
  );
}

export default Index;
