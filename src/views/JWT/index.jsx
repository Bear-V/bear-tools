import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';

function Index() {
  let [inputStr, setInputStr] = useState('');

  const handlerInput = e => {
    console.log(123);
    let value = e.target.value;
    setInputStr(value);
  };

  return (
    <>
      <div className="m-2 flex flex-row h-full bg-amber-200 space-x-1">
        <div className="flex-1 bg-amber-100 p-2">
          <textarea
            className="p-2 w-full h-full bg-gray-50 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={inputStr}
            onChange={handlerInput}
          ></textarea>
        </div>
        <div className="flex-1 bg-amber-100 flex flex-col">
          <div className="flex-1 flex flex-col">
            <p className="block">HEADERS:</p>
            <div className="flex-1 bg-green-200 border-2"></div>
          </div>
          <div className="flex-1 flex flex-col">
            <p className="block">PAYLOAD:</p>
            <div className="flex-1 bg-green-200 border-2"></div>
          </div>
          <div className="flex-1 flex flex-col">
            <p className="block">VERIFY SIGNATURE:</p>
            <div className="flex-1 bg-green-200 border-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
