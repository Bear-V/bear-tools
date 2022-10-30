import { useNavigate } from 'react-router-dom';
import Button from '../Button/index.jsx';


function GlobalSidebar() {
  const navigate = useNavigate();

  return (
      <>
        <div className="flex-none w-44 h-screen bg-gray-400 flex flex-col">
          <div
              className="m-3 bg-white h-4/5 flex flex-col space-y-1 rounded-lg
                    overflow-y-scroll
                    scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-100
                    hover:scrollbar-thumb-blue-400"
          >
            <Button name="首页" click={() => navigate('/home')}/>
            <Button name="时间戳" click={() => navigate('/timestampTool')}/>
            <Button name="STRING转JSON" click={() => navigate('/jsonTool')}/>
            <Button name="关于" click={() => navigate('/about')}/>
          </div>

          <div className="m-3 bg-blue-200 h-1/5 rounded-lg">
            <div className="button-div" onClick={() => navigate('/home')}>
              首页
            </div>
            <div className="button-div" onClick={() => navigate('/about')}>
              关于
            </div>
          </div>
      </div>
    </>
  );
}

export default GlobalSidebar;
