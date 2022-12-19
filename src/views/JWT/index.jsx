import toast from 'react-hot-toast';
import {invoke} from '@tauri-apps/api/tauri';
import {useState} from "react";
import Button from '../../component/Button';

function Index() {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [encodeMethod, setEncodeMethod] = useState(true);

  const handlerDefault = async () => {
    if (encodeMethod) {
      let base64_default_value = '6L+Z5piv5LiA5p2h5rWL6K+V5pWw5o2u'
      setInputData(base64_default_value);
      await handlerBase64ToStr(base64_default_value)
    } else {
      let string_default_value = '这是一条测试数据'
      setInputData(string_default_value);
      await handlerStrToBase64(string_default_value)
    }
  }


  const handlerStrToBase64 = async (value) => {
    if (value) {
      const res = await invoke("string_to_base64", {input: value + ''})
      setOutputData(res);
    } else {
      setOutputData("");
    }
  }
  const handlerBase64ToStr = async (value) => {
    if (value) {
      const res = await invoke("base64_to_string", {input: value + ''})
      setOutputData(res);
    } else {
      setOutputData("");
    }
  }
  const handlerInputChange = async (e) => {
    let value = e.target.value;
    setInputData(value);
    if (encodeMethod) {
      await handlerBase64ToStr(value)
    } else {
      await handlerStrToBase64(value)
    }
  }

  const changeMethod = async () => {
    setEncodeMethod(!encodeMethod)
    let value = inputData
    if (encodeMethod) {
      await handlerBase64ToStr(value)
    } else {
      await handlerStrToBase64(value)
    }
    toast.success(`更换方法为${encodeMethod ? 'BASE64转STRING' : "STRING转BASE64"}`)
  }

  const handlerClipboard = async () => {
    const board_value = await invoke('get_copy');
    setInputData(board_value);
    if (encodeMethod) {
      await handlerBase64ToStr(board_value)
    } else {
      await handlerStrToBase64(board_value)
    }
  };

  const handlerOutputSetCopy = async () => {
    await invoke('set_copy', {input: outputData + ''})
    toast.success("复制成功")
  }

  const handlerClear = () => {
    setInputData('');
    setOutputData("");
  };


  return (
    <>
      <div className="m-2 flex flex-row space-y-2 w-full h-full">
        <div className="flex-1 w-full h-full flex flex-col space-y-2">
          <div className="flex flex-row space-x-1">
            <div className="select-none flex flex-row">
              <span>输入：</span>
              <Button click={handlerClipboard} name="使用剪切板" />
              <Button click={handlerDefault} name="示例" />
              <Button click={handlerClear} name="清空" />
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
