import toast from 'react-hot-toast';
import { useState } from 'react';
import { CheckCidr, run } from '@/commands/invake.js';

function Index() {
  let [ipA, setIpA] = useState(192);
  let [ipB, setIpB] = useState(168);
  let [ipC, setIpC] = useState(10);
  let [ipD, setIpD] = useState(32);
  let [ipE, setIpE] = useState(23);
  let [mask, setMask] = useState('255.255.254.0');
  let [max, setMax] = useState('192.168.11.255');
  let [min, setMin] = useState('192.168.10.0');
  let [size, setSize] = useState(512);

  const removeLeadingZeros = (s, last, max) => {
    if (s === '') {
      return 0;
    }
    if (isNaN(Number(s))) {
      toast.error('请输入数字');
      return last;
    }
    const oldLen = s.length;
    s = s.replace(/^0+/, ''); // 移除前导零
    // 全为 0 的情况，留一个 0
    if (s.length === 0 && oldLen > 0) {
      s = 0;
    }
    if (s > max) {
      s = max;
    }
    return s;
  };

  const handlerInput = async (e, mb) => {
    let value = e.target.value;
    switch (mb) {
      case 'A':
        ipA = removeLeadingZeros(value, ipA, 255);
        setIpA(ipA);
        break;
      case 'B':
        ipB = removeLeadingZeros(value, ipB, 255);
        setIpB(ipB);
        break;
      case 'C':
        ipC = removeLeadingZeros(value, ipC, 255);
        setIpC(ipC);
        break;
      case 'D':
        ipD = removeLeadingZeros(value, ipD, 255);
        setIpD(ipD);
        break;
      case 'E':
        ipE = removeLeadingZeros(value, ipE, 32);
        setIpE(ipE);
        break;
      default:
        break;
    }
    let ipAddr = `${ipA || 0}.${ipB || 0}.${ipC || 0}.${ipD || 0}/${ipE || 0}`;
    await handlerCheckCidr(ipAddr);
  };

  const handlerCheckCidr = async ipAddr => {
    const res = await run(CheckCidr, { input: ipAddr });

    setMask(res.mask);
    setMax(res.max);
    setMin(res.min);
    setSize(res.size);
  };

  const inputBox = (value, onChange) => {
    return (
      <input
        className="h-11 w-10/12 text-center text-4xl border-2 border-blue-200 active:border-blue-400"
        type="text"
        value={value}
        onChange={onChange}
      />
    );
  };

  return (
    <>
      <div className="m-2 flex flex-col h-full">
        <div className="flex-none h-2/5 flex flex-col justify-center items-center bg-blue-100">
          <div className="flex flex-row w-10/12 m-4">
            <div className="flex flex-1 w-1/5 h-11 text-center">
              {inputBox(ipA, e => handlerInput(e, 'A'))}
              <div className="h-11 w-2/12 text-center text-field text-5xl">.</div>
            </div>
            <div className="flex flex-1 w-1/5 h-11 text-center">
              {inputBox(ipB, e => handlerInput(e, 'B'))}
              <div className="h-11 w-2/12 text-center text-field text-5xl">.</div>
            </div>
            <div className="flex flex-1 w-1/5 h-11 text-center">
              {inputBox(ipC, e => handlerInput(e, 'C'))}
              <div className="h-11 w-2/12 text-center text-field text-5xl">.</div>
            </div>
            <div className="flex flex-1 w-1/5 h-11 text-center">
              {inputBox(ipD, e => handlerInput(e, 'D'))}
              <div className="h-11 w-2/12 text-center text-field text-4xl">/</div>
            </div>
            <div className="flex flex-1 w-1/5 h-11 text-center">
              {inputBox(ipE, e => handlerInput(e, 'E'))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-red-200">
          <div className="flex-1 flex flex-row border-2 space-x-3">
            <div className="flex-col text-center">
              <div>NETMASK（子网掩码）</div>
              <div>{mask}</div>
            </div>
            <div className="flex-col text-center">
              <div>CIDR BASE IP（基础地址）</div>
              <div>{min}</div>
            </div>
            <div className="flex-col text-center">
              <div>BROADCAST IP（广播地址）</div>
              <div>{max}</div>
            </div>
            <div className="flex-col text-center">
              <div>COUNT（数量）</div>
              <div>{size}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
