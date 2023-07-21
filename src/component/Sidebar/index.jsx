import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import homeSvg from '../../assets/icons/home.svg';
import timestampSvg from '../../assets/icons/timestamp.svg';
import strJsonSvg from '../../assets/icons/strJson.svg';
import bsSvg from '../../assets/icons/baseString.svg';
import bhSvg from '../../assets/icons/baseHex.svg';
import cidrSvg from '../../assets/icons/cidr.svg';
import jwtSvg from '../../assets/icons/jwt.svg';

function GlobalSidebar() {
  const navigate = useNavigate();
  const sidebar_list = [
    {
      name: '首页',
      path: '/home',
      activeIndex: true,
      imgPath: homeSvg
    },
    {
      name: '随机密码',
      path: '/randomPassword',
      activeIndex: false,
      imgPath: timestampSvg
    },
    {
      name: '时间戳转换',
      path: '/timestampTool',
      activeIndex: false,
      imgPath: timestampSvg
    },
    {
      name: 'String转JSON',
      path: '/jsonTool',
      activeIndex: false,
      imgPath: strJsonSvg
    },
    {
      name: 'BASE64 String',
      path: '/base64String',
      activeIndex: false,
      imgPath: bsSvg
    },
    {
      name: 'BASE64 HEX',
      path: '/base64Hex',
      activeIndex: false,
      imgPath: bhSvg
    },
    {
      name: 'CIDR',
      path: '/cidr',
      activeIndex: false,
      imgPath: cidrSvg
    },
    {
      name: 'JWT',
      path: '/jwt',
      activeIndex: false,
      imgPath: jwtSvg
    }
  ];

  const [sidebarList, setSidebarList] = useState(sidebar_list);

  return (
    <>
      <div className="flex flex-col w-52 h-screen bg-gray-300">
        <ul
          className="flex flex-col m-1 rounded-lg h-full
                    scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-300
                    hover:scrollbar-thumb-gray-400"
        >
          {sidebarList.map((item, index) => {
            let className =
              'flex space-x-2 select-none mx-2 mt-1 pl-2 w-44 text-left text-sm rounded-r-full ' +
              'bg-blue-100 cursor-pointer hover:bg-blue-200 hover:shadow-lg hover:text-white active:bg-blue-300';
            return (
              <li
                className={item.activeIndex ? className + ' bg-blue-200' : className}
                onClick={() => {
                  let navList = [...sidebar_list];
                  navList.forEach((item, idx) => {
                    navList[idx].activeIndex = idx === index;
                  });
                  setSidebarList(navList);
                  navigate(item.path);
                }}
                key={index}
              >
                {item.img ? item.img : ''}
                {item.imgPath ? (
                  <img
                    className="w-5 h-5 fill-current text-black stroke-0"
                    src={item.imgPath}
                    alt=""
                  />
                ) : (
                  ''
                )}
                <span> {item.name} </span>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col justify-center m-2">
          <div
            className="flex-1 bg-gray-400 rounded-lg text-sm text-center text-gray-800 select-none cursor-pointer mx-10"
            onClick={() => invoke('open_about')}
          >
            关于
          </div>
          <div className="flex-1 text-sm text-gray-800 text-center select-none cursor-default">
            <a target="_blank" href="https://github.com/Bear-V/Bear-Tools" rel="noreferrer">
              {/* todo: remember modify */}
              version:20230721
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default GlobalSidebar;
