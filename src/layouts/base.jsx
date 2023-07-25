import GlobalContent from '../component/globalContent';
import GlobalSidebar from '../component/globalSidebar';
import { Toaster } from 'react-hot-toast';

function Base() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <GlobalSidebar />
      <GlobalContent />
    </>
  );
}

export default Base;
