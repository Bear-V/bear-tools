import {useNavigate} from 'react-router-dom';
import {useState} from "react";


function GlobalSidebar() {
  const navigate = useNavigate();

  const sidebar_list = [
    {
      name: '首页',
      path: '/home',
      activeIndex: true,
      img: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
      </svg>
    },
    {
      name: '时间戳转换',
      path: '/timestampTool',
      activeIndex: false,
      img: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    },
    {
      name: 'STRING转JSON',
      path: '/jsonTool',
      activeIndex: false,
      img: <svg className="w-5 h-5 fill-current text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.73 3,20.1 3,19V15A2,2 0 0,0 1,13H0V11H1A2,2 0 0,0 3,9V5A2,2 0 0,1 5,3M19,3A2,2 0 0,1 21,5V9A2,2 0 0,0 23,11H24V13H23A2,2 0 0,0 21,15V19A2,2 0 0,1 19,21H17V19H19V14A2,2 0 0,1 21,12A2,2 0 0,1 19,10V5H17V3H19M12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15M8,15A1,1 0 0,1 9,16A1,1 0 0,1 8,17A1,1 0 0,1 7,16A1,1 0 0,1 8,15M16,15A1,1 0 0,1 17,16A1,1 0 0,1 16,17A1,1 0 0,1 15,16A1,1 0 0,1 16,15Z"/>
      </svg>
    },
  ]

  const [sidebarList, setSidebarList] = useState(sidebar_list)

  return (
    <>
      <div className="flex flex-col w-52 h-screen bg-gray-300">
        <ul
          className="flex flex-col m-1 rounded-lg h-full
                    scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-300
                    hover:scrollbar-thumb-gray-400"
        >
          {sidebarList.map((item, index) => {
            let className = "flex space-x-2 select-none mx-2 mt-1 pl-2 w-44 text-left text-sm font-bold rounded-r-full " +
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
            >
              {item.img ? item.img : ""}
              <span> {item.name} </span>
            </li>
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
