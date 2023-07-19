import GlobalContent from '../../component/Content/index.jsx';
import GlobalSidebar from '../../component/Sidebar/index.jsx';
import { Toaster } from 'react-hot-toast';

export default function Index() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <GlobalSidebar />
      <GlobalContent />
    </>
  );
}
