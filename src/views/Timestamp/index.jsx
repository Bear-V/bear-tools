import {useEffect, useRef, useState} from 'react';
import {invoke} from '@tauri-apps/api/tauri';
import toast, {Toaster} from 'react-hot-toast';
import ReadOnlyInputCopy from './input.jsx'

function Index() {
  const timer = useRef();
  let [timestampUnit, setTimestampUnit] = useState("MS")
  let [currentTime, setCurrentTime] = useState(Date.now());
  let [inputTime, setInputTime] = useState(Date.now());
  let [outputData, setOutputData] = useState({
    utc: '',
    local: "",
    relative: "",
    dayOfYear: "",
    weekOfYear: "",
    isLeapYear: "",
    aFormat: "",
    bFormat: "",
    cFormat: "",
    dFormat: "",
    eFormat: "",
  });

  const handlerCopy = async () => {
    const copy_data = await invoke('get_copy');
    if (!isNaN(Number(copy_data))) {
      setInputTime(Number(copy_data));
    } else {
      toast.error('剪切板数据不是有效数字');
    }
  };
  const handlerSY = () => {
    setInputTime(currentTime);
  };

  const timeToDate = async () => {
    const format_date = await invoke('timestamp_format', {
      input: currentTime,
    });
    setOutputData(format_date);
  };

  function handlerChange(e) {
    setInputTime(e.target.value);
  }

  function handlerChangeTimestampUint(e) {
    setTimestampUnit(e.target.value)
    if (e.target.value === 'S' && (inputTime + '').length === 13) {
      setInputTime(Math.ceil(inputTime / 1000))
    }
  }

  useEffect(() => {
    timer.current = setInterval(() => {
      let currentTime = Date.now()
      if (timestampUnit === 'S') {
        currentTime = Math.ceil(currentTime / 1000)
      }
      setCurrentTime(currentTime);
    }, 1000);
    return () => {
      clearTimeout(timer.current);
    };
  }, [timestampUnit]);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className="m-2 flex flex-col space-y-2 border-2 h-full">
        <div className="m-2 space-x-4">
          <span>输入：</span>
          <button onClick={handlerSY}>当前时间</button>
          <button onClick={handlerCopy}>剪切板</button>
        </div>
        <div className="m-2 flex flex-row">
          <input
            type="text"
            onChange={handlerChange}
            value={inputTime}
          />
          <div className="pl-4">
            <span>单位：</span>
            <select onChange={handlerChangeTimestampUint}>
              <option>MS</option>
              <option>S</option>
            </select>
          </div>
        </div>
        <div></div>
        <div className="border-2"></div>
        <div></div>
        <div className="flex flex-row ml-2">
          <div className="flex-1 flex flex-col space-y-2">
            <div>UTC
              <ReadOnlyInputCopy className="w-44" value={outputData.utc}/>
            </div>
            <div>local
              <ReadOnlyInputCopy className="w-44" value={outputData.local}/>
            </div>
            <div>相对时间
              <ReadOnlyInputCopy className="w-44" value={outputData.relative}/>
            </div>
          </div>
          <div className="flex-1 flex flex-col space-y-2">
            <div>今年的第几天
              <ReadOnlyInputCopy value={outputData.dayOfYear}/>
            </div>
            <div>今年的第几个星期
              <ReadOnlyInputCopy value={outputData.weekOfYear}/>
            </div>
            <div>今年是闰年吗
              <ReadOnlyInputCopy value={outputData.isLeapYear}/>
            </div>
          </div>
          <div className="flex-1 flex flex-col space-y-2">
            <div>其他格式日期输出</div>
            <ReadOnlyInputCopy className="w-44" value={outputData.aFormat}/>
            <ReadOnlyInputCopy className="w-44" value={outputData.bFormat}/>
            <ReadOnlyInputCopy className="w-44" value={outputData.cFormat}/>
            <ReadOnlyInputCopy className="w-44" value={outputData.dFormat}/>
            <ReadOnlyInputCopy className="w-44" value={outputData.eFormat}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
