import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Button from '@/component/Button';
import { run, HexToBase64, Base64ToHex, GetCopy, SetCopy } from '@/commands/invake.js';

function Index() {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [encodeMethod, setEncodeMethod] = useState(true);

  const handlerDefault = async () => {
    if (encodeMethod) {
      let base64_default_value = 'I5fb7mkRTiIDu0JLToTpry1+45s=';
      setInputData(base64_default_value);
      await handlerBaseToHex(base64_default_value);
    } else {
      let hex_default_value = '2397dbee69114e2203bb424b4e84e9af2d7ee39b';
      setInputData(hex_default_value);
      await handlerHexToBase(hex_default_value);
    }
  };

  const handlerHexToBase = async value => {
    const res = await run(HexToBase64, { hexString: value });
    setOutputData(res);
  };
  const handlerBaseToHex = async value => {
    const res = await run(Base64ToHex, { base64String: value });
    setOutputData(res);
  };
  const handlerInputChange = async e => {
    let value = e.target.value;
    setInputData(value);
    if (encodeMethod) {
      await handlerBaseToHex(value);
    } else {
      await handlerHexToBase(value);
    }
  };

  const handlerClipboard = async () => {
    const board_value = await run(GetCopy);
    setInputData(board_value);
    if (encodeMethod) {
      await handlerBaseToHex(board_value);
    } else {
      await handlerHexToBase(board_value);
    }
  };

  const handlerOutputSetCopy = async () => {
    await run(SetCopy, { input: outputData });
    toast.success('复制成功');
  };

  const handlerClear = () => {
    setInputData('');
    setOutputData('');
  };

  const changeEncodeMethod = () => {
    setEncodeMethod(!encodeMethod);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeMethod = async () => {
    if (encodeMethod) {
      setInputData(outputData);
      await handlerBaseToHex(outputData);
    } else {
      setInputData(outputData);
      await handlerHexToBase(outputData);
    }
  };

  useEffect(() => {
    changeMethod();
  }, [encodeMethod]);

  return (
    <>
      <div className="m-2 flex flex-col space-y-2 w-full h-full">
        <div className="flex-1 w-full h-full flex flex-col space-y-2">
          <div className="flex flex-row space-x-1">
            <div className="select-none flex flex-row">
              <span>输入：</span>
              <Button click={handlerClipboard} name="使用剪切板" />
              <Button click={handlerDefault} name="示例" />
              <Button click={handlerClear} name="清空" />
            </div>
            <div className="flex flex-row space-x-1">
              <span className="select-none">方法：</span>
              <span className={encodeMethod ? 'select-none text-red-500' : 'select-none'}>
                BASE64
              </span>
              <span onClick={changeEncodeMethod}>
                {encodeMethod ? (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    ></path>
                  </svg>
                )}
              </span>
              <span className={encodeMethod ? 'select-none' : 'select-none text-red-500'}>HEX</span>
            </div>
          </div>
          <div className="pr-4 w-full h-full">
            <textarea
              className="p-2 w-full h-full bg-gray-50 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-gray-200"
              onChange={handlerInputChange}
              value={inputData}
            ></textarea>
          </div>
        </div>
        <div className="flex-1 w-full h-full flex flex-col space-y-2">
          <div className="select-none flex flex-row">
            <span>输出：</span>
            <Button click={handlerOutputSetCopy} name="复制" />
          </div>
          <div className="pr-4 w-full h-full">
            <textarea
              className="p-2 w-full h-full bg-gray-50 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
              readOnly={true}
              value={outputData}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
