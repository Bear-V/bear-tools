import { useEffect, useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

function Index() {
  const timer = useRef();
  let [currentTime, setCurrentTime] = useState(Date.now());
  let [inputTime, setInputTime] = useState(Date.now());
  let [outputDate, setOutputDate] = useState('');

  // const currentTime = Date.now()
  // setInputTime(currentTime)

  const handlerCopy = async () => {
    await invoke('board_fn', { input: currentTime + '', action: 2 });
  };
  const handlerSY = () => {
    setInputTime(currentTime);
  };

  const timeToDate = async () => {
    const format_date = await invoke('timestamp_format', {
      input: currentTime,
    });
    setOutputDate(format_date);
  };

  function handlerChange(e) {
    setInputTime(e.target.value);
  }

  useEffect(() => {
    timer.current = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <div className="m-2 flex flex-col space-y-5">
        <div className="flex-1 space-x-4">
          <span>时间戳：</span>
          <span className="cursor-pointer select-none" onClick={handlerCopy}>
            {currentTime}
          </span>
          <button onClick={handlerSY}>使用</button>
        </div>
        <div className="flex-1 flex-raw space-x-2">
          <input
            className="flex-1"
            type="text"
            onChange={handlerChange}
            value={inputTime}
          />
          <button className="flex-1" onClick={timeToDate}>
            转换
          </button>
          <input
            className="flex-1"
            type="text"
            readOnly={true}
            value={outputDate}
          />
        </div>
        <div className="flex-1">1</div>
        <div className="flex-1">1</div>
        <div className="flex-1">1</div>
      </div>
    </>
  );
}

export default Index;
