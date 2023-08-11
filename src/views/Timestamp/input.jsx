import toast from 'react-hot-toast';
import { SetCopy, run } from '@/commands/invake.js';

function ReadOnlyInputCopy({ className, value }) {
  const handlerCopy = async () => {
    await run(SetCopy, { input: value + '' });
    toast.success('复制成功');
  };
  return (
    <div>
      <input
        className={'text-sm ' + (className || 'w-16')}
        type="text"
        readOnly={true}
        value={value}
      />
      <span
        className={
          'm-2 select-none cursor-pointer transition duration-300 border-2 border-gray-50 hover:bg-black hover:text-gray-300 focus:ease-in-out focus:duration-700'
        }
        onClick={handlerCopy}
      >
        复制
      </span>
    </div>
  );
}

export default ReadOnlyInputCopy;
