import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { invoke } from '@tauri-apps/api/tauri';
import ReadOnlyInputCopy from './input.jsx';

function Index() {
  const timer = useRef();
  let [timestampUnit, setTimestampUnit] = useState('MS');
  let [currentTime, setCurrentTime] = useState(
    timestampUnit === 'ms' ? Date.now() : Math.ceil(Date.now() / 1000)
  );
  let [inputTime, setInputTime] = useState('');
  let timestampFormat = {
    utc: '',
    local: '',
    relative: '',
    unix_time: '',
    day_of_year: '',
    week_of_year: '',
    is_leap_year: '',
    a_format: '',
    b_format: '',
    c_format: '',
  };
  let [outputData, setOutputData] = useState(timestampFormat);

  const handlerCopy = async () => {
    const copy_data = await invoke('get_copy');
    if (!isNaN(Number(copy_data))) {
      setInputTime(copy_data);
      await timeToDate(currentTime);
    } else {
      toast.error('剪切板数据不是有效数字');
    }
  };
  const handlerSY = async () => {
    setInputTime(currentTime);
    await timeToDate(currentTime);
  };

  const timeToDate = async e => {
    if (!isNaN(Number(e))) {
      const format_date = await invoke('timestamp_format', {
        input: e,
      });
      console.log(JSON.parse(format_date));
      setOutputData(JSON.parse(format_date));
    }
  };

  const handlerChange = async e => {
    setInputTime(e.target.value);
    await timeToDate(Number(e.target.value));
  };

  const handlerClear = () => {
    setInputTime('');
    setOutputData(timestampFormat);
  };

  function handlerChangeTimestampUint(e) {
    setTimestampUnit(e.target.value);
    if (e.target.value === 'S' && (inputTime + '').length === 13) {
      setInputTime(Math.ceil(inputTime / 1000));
    }
  }

  useEffect(() => {
    timer.current = setInterval(() => {
      let currentTime = Date.now();
      if (timestampUnit === 'S') {
        currentTime = Math.ceil(Date.now() / 1000);
      }
      setCurrentTime(currentTime);
      if (outputData.day_of_year) {
        outputData['relative'] =
          Math.ceil(Date.now() / 1000) - outputData.unix_time;
        setOutputData(outputData);
      }
    }, 500);
    return () => {
      clearTimeout(timer.current);
    };
  }, [timestampUnit, outputData]);

  return (
    <>
      <div className="m-2 flex flex-col space-y-2 border-2 h-full">
        <div className="m-2 space-x-4">
          <span>输入：</span>
          <button onClick={handlerSY}>当前时间</button>
          <button onClick={handlerCopy}>剪切板</button>
          <button onClick={handlerClear}>清空</button>
        </div>
        <div className="m-2 flex flex-row">
          <input type="text" onChange={handlerChange} value={inputTime} />
          <div className="pl-4">
            <span>单位：</span>
            <select disabled={true} onChange={handlerChangeTimestampUint}>
              <option>MS</option>
              <option>S</option>
            </select>
          </div>
        </div>
        <div></div>
        <div className="border-2"></div>
        <div></div>
        <div className="flex flex-row space-x-4 ml-2">
          <div className="flex-initial flex flex-col space-y-2">
            <div>
              UTC
              <ReadOnlyInputCopy className="w-60" value={outputData.utc} />
            </div>
            <div>
              local
              <ReadOnlyInputCopy className="w-60" value={outputData.local} />
            </div>
            <div>
              相对时间
              <ReadOnlyInputCopy
                className="w-60"
                value={
                  outputData.relative
                    ? outputData.relative + ' s'
                    : outputData.relative
                }
              />
            </div>
            <div>
              unix
              <ReadOnlyInputCopy
                className="w-60"
                value={outputData.unix_time}
              />
            </div>
          </div>
          <div className="flex-initial flex flex-col space-y-3">
            <div>
              今年的第几天
              <ReadOnlyInputCopy value={outputData.day_of_year} />
            </div>
            <div>
              今年的第几个星期
              <ReadOnlyInputCopy value={outputData.week_of_year} />
            </div>
            <div>
              今年是闰年吗
              <ReadOnlyInputCopy value={outputData.is_leap_year} />
            </div>
          </div>
          <div className="flex-initial flex flex-col space-y-2">
            <div>其他格式日期输出</div>
            <ReadOnlyInputCopy className="w-56" value={outputData.a_format} />
            <ReadOnlyInputCopy className="w-56" value={outputData.b_format} />
            <ReadOnlyInputCopy className="w-56" value={outputData.c_format} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
