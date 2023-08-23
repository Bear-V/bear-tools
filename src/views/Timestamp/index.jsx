import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import ReadOnlyInputCopy from './input.jsx';
import { GetCopy, run, TimestampFormat, TimestampParse } from '@/commands/invake.js';

function Index() {
  const timer = useRef();
  let [timestampUnit, setTimestampUnit] = useState('MS');
  let [currentTime, setCurrentTime] = useState(
    timestampUnit === 'ms' ? Date.now() : Math.ceil(Date.now() / 1000)
  );
  let [inputTime, setInputTime] = useState(0);
  let [inputFormatTime, setInputFormatTime] = useState('2023-08-22 11:11:11');
  let [outputFormatData, setOutputFormatData] = useState('');

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
    c_format: ''
  };
  let [outputData, setOutputData] = useState(timestampFormat);

  const handlerCopy = async () => {
    const copy_data = await run(GetCopy);
    if (!isNaN(Number(copy_data))) {
      setInputTime(copy_data);
    } else {
      toast.error('剪切板数据不是有效数字');
    }
  };
  const handlerSY = async () => {
    console.log(currentTime);
    setInputTime(currentTime);
  };

  const timeToDate = async () => {
    console.log(inputTime);
    const format_date = await run(TimestampFormat, {
      input: Number(inputTime)
    });
    setOutputData(format_date);
  };

  const handlerChange = async e => {
    if (!isNaN(Number(e.target.value))) {
      setInputTime(e.target.value);
    }
  };

  const handlerClear = () => {
    setInputTime(0);
    setOutputData(timestampFormat);
  };

  function handlerChangeTimestampUint(e) {
    setTimestampUnit(e.target.value);
    if (e.target.value === 'S' && (inputTime + '').length === 13) {
      setInputTime(Math.ceil(inputTime / 1000));
    }
  }

  const handlerFormatChange = e => {
    setInputFormatTime(e.target.value);
  };

  const handlerFormat = async () => {
    const format_date = await run(TimestampParse, {
      input: inputFormatTime
    });
    setOutputFormatData(format_date);
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      let currentTime = Date.now();
      if (timestampUnit === 'S') {
        currentTime = Math.ceil(Date.now() / 1000);
      }
      setCurrentTime(currentTime);
      if (outputData.day_of_year) {
        outputData['relative'] = Math.ceil(Date.now() / 1000) - outputData.unix_time;
        setOutputData(outputData);
      }
    }, 500);

    return () => {
      clearTimeout(timer.current);
    };
  }, [timestampUnit, outputData]);

  useEffect(() => {
    if (inputTime === 0 || isNaN(Number(inputTime))) return;
    timeToDate();
  }, [inputTime]);

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
          <input type="text" onInput={handlerChange} value={inputTime} />
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
                value={outputData.relative ? outputData.relative + ' s' : outputData.relative}
              />
            </div>
            <div>
              unix
              <ReadOnlyInputCopy className="w-60" value={outputData.unix_time} />
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

        <div className="p-3 flex flex-row space-x-4 border-2">
          <div> 转换时间戳：</div>
          <input type="text" onInput={handlerFormatChange} value={inputFormatTime} />
          <button className="border-1 bg-amber-50 hover:bg-amber-200" onClick={handlerFormat}>
            转换
          </button>
          <ReadOnlyInputCopy className="w-52" value={outputFormatData} />
        </div>
      </div>
    </>
  );
}

export default Index;
