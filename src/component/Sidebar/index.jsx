import { useNavigate } from 'react-router-dom';

function GlobalSidebar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex-none w-44 h-screen bg-pink-300 flex flex-col">
          <div className="m-3 bg-blue-200 h-4/5 ">
              <div className="button-div" onClick={() => navigate('/home')}>首页</div>
              <div className="button-div" onClick={() => navigate('/about')}>关于</div>
          </div>

          <div className="m-3 bg-blue-200 h-1/5 ">
              <div className="button-div" onClick={() => navigate('/home')}>首页</div>
              <div className="button-div" onClick={() => navigate('/about')}>关于</div>
          </div>
      </div>
    </>
  );
}

export default GlobalSidebar;