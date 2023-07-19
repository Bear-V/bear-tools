import { Outlet } from 'react-router-dom';

function GlobalContent() {
  return (
    <>
      <div className="flex-auto flex flex-col h-screen bg-gray-100 p-2">
        <Outlet />
      </div>
    </>
  );
}

export default GlobalContent;
