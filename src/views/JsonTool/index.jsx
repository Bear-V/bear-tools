import {useState} from 'react';
import ReactJson from 'react-json-view';
import {invoke} from '@tauri-apps/api/tauri';
import Button from '../../component/Button';

function Index() {
  let [inputStr, setInputStr] = useState('请输入JSON字符串');
  let [jsonStr, setJsonStr] = useState({});

  const handlerClipboard = async () => {
    const board_value = await invoke('get_copy');
    setInputStr(board_value);
    try {
      setJsonStr(JSON.parse(board_value));
    } catch (e) {
    }
  };
  const handlerDefault = () => {
    let value = {
      store: {
        book: [
          {
            category: 'reference',
            sold: false,
            author: 'Nigel Rees',
            title: 'Sayings of the Century',
            price: 8.95,
          },
          {
            category: 'fiction',
            author: 'Evelyn Waugh',
            title: 'Sword of Honour',
            price: 12.99,
          },
          {
            category: 'fiction',
            author: 'J. R. R. Tolkien',
            title: 'The Lord of the Rings',
            act: null,
            isbn: '0-395-19395-8',
            price: 22.99,
          },
        ],
        bicycle: {color: 'red', price: 19.95},
      },
    };
    setInputStr(JSON.stringify(value));
    setJsonStr(value);
  };
  const handlerClear = () => {
    setInputStr('');
    setJsonStr({});
  };

  const handlerInput = e => {
    let value = e.target.value;
    setInputStr(value);
    if (!value) {
      return;
    }
    try {
      value = JSON.parse(e.target.value);
      setJsonStr(value);
    } catch (e) {
    }
  };

  // page element
  return (
    <>
      <div className="h-full flex flex-row space-x-1">
        <div className="flex-1 w-full h-full border-2 pt-2 flex flex-col space-y-2">
          <div className="flex flex-row space-x-2 pl-2 h-6">
            <Button click={handlerClipboard} name="使用剪切板"/>
            <Button click={handlerDefault} name="示例"/>
            <Button click={handlerClear} name="清空"/>
          </div>
          <div className="w-full h-full">
            <textarea
              className="p-2 w-full h-full bg-gray-50 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={inputStr}
              onChange={handlerInput}
            ></textarea>
          </div>
        </div>
        <div className="flex-1 py-2 pl-1 pr-2 w-full h-full border-2">
          <div
            className="p-2 w-full h-full bg-gray-50 rounded-lg font-mono
                    overflow-auto
                    scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-blue-100
                    hover:scrollbar-thumb-blue-400"
          >
            <ReactJson src={jsonStr} displayDataTypes={false}></ReactJson>
          </div>
          {/*<textarea className="p-2 w-full h-full bg-gray-50 rounded-lg" value={jsonStr}></textarea>*/}
        </div>
      </div>
    </>
  );
}

export default Index;
