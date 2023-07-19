import toast from 'react-hot-toast';
import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';
import Button from '../../component/Button';
import TextEditor from '../../component/TextEditor';

function Index() {
  let [ipA, setIpA] = useState(0);
  let [ipB, setIpB] = useState(0);
  let [ipC, setIpC] = useState(0);
  let [ipD, setIpD] = useState(0);
  let [ipE, setIpE] = useState(0);
  let [cidr, setCidr] = useState('');

  const handlerInput = async (e, mb) => {
    const removeLeadingZeros = (s, max) => {
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
    let value = e.target.value;
    switch (mb) {
      case 'A':
        value = removeLeadingZeros(value, 255);
        setIpA(value);
        break;
      case 'B':
        value = removeLeadingZeros(value, 255);
        setIpB(value);
        break;
      case 'C':
        value = removeLeadingZeros(value, 255);

        setIpC(value);
        break;
      case 'D':
        value = removeLeadingZeros(value, 255);

        setIpD(value);
        break;
      case 'E':
        value = removeLeadingZeros(value, 32);

        setIpE(value);
        break;
      default:
        break;
    }

    await handlerCheckCidr();
  };

  const handlerCheckCidr = async () => {
    let ipAddr = `${ipA || 0}.${ipB || 0}.${ipC || 0}.${ipD || 0}/${ipE || 0}`;
    console.log(ipAddr);
    const res = await invoke('check_cidr', { input: ipAddr });
    console.log(res);
    setCidr(JSON.stringify(res, null, 2));
  };

  return (
    <>
      <div className="m-2 flex flex-col h-full bg-amber-200 space-x-1">
        <div className="flex-1 flex flex-col">
          <p className="block">HEADERS:</p>
          <div className="flex flex-row space-x-1">
            <input
              className="flex-1 h-11 text-center text-field"
              type="number"
              min="0"
              max="255"
              value={ipA}
              onChange={e => handlerInput(e, 'A')}
            />
            <input
              className="flex-1 h-11 text-center"
              type="number"
              min="0"
              max="255"
              value={ipB}
              onChange={e => handlerInput(e, 'B')}
            />
            <input
              className="flex-1 h-11 text-center"
              type="number"
              min="0"
              max="255"
              value={ipC}
              onChange={e => handlerInput(e, 'C')}
            />
            <input
              className="flex-1 h-11 text-center"
              type="number"
              min="0"
              max="255"
              value={ipD}
              onChange={e => handlerInput(e, 'D')}
            />
            <input
              className="flex-1 h-11 text-center"
              type="number"
              min="0"
              max="32"
              value={ipE}
              onChange={e => handlerInput(e, 'E')}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <p className="block">PAYLOAD:</p>
          <div className="flex-1 bg-green-200 border-2">
            <textarea value={cidr} readOnly={true} />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <p className="block">VERIFY SIGNATURE:</p>
          <div className="flex-1 bg-green-200 border-2"></div>
        </div>
      </div>
    </>
  );
}

export default Index;
