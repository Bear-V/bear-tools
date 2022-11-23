import {invoke} from "@tauri-apps/api/tauri";
import toast from 'react-hot-toast';


function ReadOnlyInputCopy({className, value, click, name}) {
  const handlerCopy = async () => {
    await invoke('set_copy', {input: value + ""});
    toast.success("复制成功")
  };
  return (
    <div>
      <input className={className || "w-28"} type="text" readOnly={true} value={value}/>
      <span
        className={"m-2 select-none cursor-pointer transition duration-300 border-2 border-gray-50 hover:bg-black hover:text-gray-300 focus:ease-in-out focus:duration-700"}
        onClick={handlerCopy}>复制</span>
    </div>
  );
}

export default ReadOnlyInputCopy;
