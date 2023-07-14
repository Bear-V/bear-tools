import toast from 'react-hot-toast';
import {invoke} from '@tauri-apps/api/tauri';
import {useState} from "react";
import Button from '../../component/Button';
import TextEditor from '../../component/TextEditor';

function Index() {
  let [ipAddr, setIpAddr] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0
  });

  console.log(ipAddr)

  const handlerInput = async e => {
    const removeLeadingZeros = (s) => {
      const oldLen = s.length;
      s = s.replace(/^0+/, ''); // 移除前导零
      // 全为 0 的情况，留一个 0
      if (s.length === 0 && oldLen > 0) {
        s = '0';
      }
      return s;
    }
    let value = e.target.value;
    let v_num = Number(value)
    if (!isNaN(v_num) && v_num >= 0 && v_num <= 255) {
      console.log(v_num)
      value = removeLeadingZeros(value)
      setIpAddr({
        ...ipAddr,
        a: value
      })
    }
    await handlerCheckCidr()
  };


  const handlerCheckCidr = async () => {
    let ip = `${ipAddr.a}.${ipAddr.b}.${ipAddr.c}.${ipAddr.d}/${ipAddr.e}`

    const res = await invoke("check_cidr", {input: ip})
    console.log(res)
  }

  return (
    <>
      <div className="m-2 flex flex-col h-full bg-amber-200 space-x-1">
        <div className="flex-1 flex flex-col">
          <p className="block">HEADERS:</p>
          <input className="" type="number" min="0" max="255" value={ipAddr.a} onChange={handlerInput} />
        </div>
        <div className="flex-1 flex flex-col">
          <p className="block">PAYLOAD:</p>
          <div className="flex-1 bg-green-200 border-2">
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <p className="block">VERIFY SIGNATURE:</p>
          <div className="flex-1 bg-green-200 border-2">
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
