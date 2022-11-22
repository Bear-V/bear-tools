import {useNavigate} from 'react-router-dom';
import {useState} from "react";


function GlobalSidebar() {
  const navigate = useNavigate();

  const sidebar_list = [
    {
      name: '首页',
      path: '/home',
      activeIndex: true
    },
    {
      name: '时间戳',
      path: '/timestampTool',
      activeIndex: false
    },
    {
      name: 'STRING转JSON',
      path: '/jsonTool',
      activeIndex: false
    },
  ]

  const [sidebarList, setSidebarList] = useState(sidebar_list)

  return (
    <>
      <div className="flex flex-col w-44 h-screen bg-gray-300">
        <ul
          className="flex flex-col m-1 rounded-lg h-full
                    scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-300
                    hover:scrollbar-thumb-gray-400"
        >
          {sidebarList.map((item, index) => {
            let className = "select-none mx-2 mt-1 pl-2 w-32 text-left text-sm font-bold rounded-r-full " +
              "bg-blue-100 cursor-pointer hover:bg-blue-200 hover:shadow-lg hover:text-white active:bg-blue-300"
            return <li
              className={item.activeIndex ? className + " bg-blue-200" : className}
              onClick={() => {
                let navList = [...sidebar_list]
                navList.map((item, idx) => {
                  navList[idx].activeIndex = idx === index;
                })
                console.log(navList)
                setSidebarList(navList)
                navigate(item.path)
              }}
            >{item.name}</li>
          })}
        </ul>
        <div className="flex justify-center m-2">
          <div className="bg-gray-400 text-sm text-center text-gray-800 rounded-lg w-20"
               onClick={() => navigate('/about')}>
            关于
          </div>
        </div>
      </div>
    </>
  );
}

export default GlobalSidebar;
