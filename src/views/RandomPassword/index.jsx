import toast from 'react-hot-toast';
import { invoke } from '@tauri-apps/api/tauri';
import { useRef, useState } from 'react';

function Index() {
  let [len, setLen] = useState(10);
  let [hasLow, setHasLow] = useState(true);
  let [hasUpper, setHasUpper] = useState(true);
  let [hasNumber, setHasNumber] = useState(true);
  let [hasOther, setHasOther] = useState('!@#$%^&*');
  let [count, setCount] = useState(1);
  let [passwordList, setPasswordList] = useState([]);
  let [checkPasswordResult, setCheckPasswordResult] = useState('');

  let list = [];
  for (let i = 1; i <= 100; i++) {
    list.push(i);
  }

  const handlerRandomPassword = async () => {
    if (!hasLow && !hasUpper && !hasNumber && !hasOther) {
      toast.error('请至少选择一个字符集');
      return;
    }

    const res = await invoke('random_string', {
      len,
      hasLow,
      hasUpper,
      hasNumber,
      hasOther,
      count
    });
    setPasswordList(res);

    if (res.length === 1) {
      const r = await invoke('password_check', { input: res[0] });
      setCheckPasswordResult(JSON.stringify(r, null, 2));
    }
  };

  const handleChangeCount = event => {
    console.log(event.target.value);
    setCount(Number(event.target.value));
  };
  const handleChangeLen = event => {
    console.log(event.target.value);
    setLen(Number(event.target.value));
  };

  return (
    <>
      <div className="m-2 flex flex-col h-full bg-amber-200 space-x-1">
        <ul className="m-1 flex flex-row bg-amber-100 p-2">
          <li className="flex-1">所用字符:</li>
          <li className="flex-auto">
            <input type="checkbox" checked={hasLow} onChange={e => setHasLow(!hasLow)} />
            <span>a-z</span>
          </li>
          <li className="flex-auto">
            <input type="checkbox" checked={hasUpper} onChange={e => setHasUpper(!hasUpper)} />
            <span>A-Z</span>
          </li>
          <li className="flex-auto">
            <input type="checkbox" checked={hasNumber} onChange={e => setHasNumber(!hasNumber)} />
            <span>0-9</span>
          </li>
          <li className="flex-auto">
            <input
              type="text"
              defaultValue={hasOther}
              onChange={e => setHasOther(e.target.value)}
            />
            <span>其他字符</span>
          </li>
        </ul>
        <ul className="m-1 flex flex-row bg-amber-100 p-2">
          <li className="flex-1">密码长度:</li>
          <li className="flex-auto">
            <select name="count" value={len} onChange={handleChangeLen}>
              {list.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </li>
        </ul>
        <ul className="m-1 flex flex-row bg-amber-100 p-2">
          <li className="flex-1">密码数量:</li>
          <li className="flex-auto">
            <select name="count" value={count} onChange={handleChangeCount}>
              {list.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </li>
        </ul>
        <button onClick={handlerRandomPassword}>提交</button>
        <ul className="m-1 flex flex-col bg-amber-100 p-2">
          {passwordList.map((item, index) => {
            return (
              <li className="flex-1" key={index}>
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
        <p>{checkPasswordResult}</p>
      </div>
    </>
  );
}

export default Index;
