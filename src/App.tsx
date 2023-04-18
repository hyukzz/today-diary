import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { routers } from '@/router';

function App() {
  return (
    <>
      <RouterProvider router={routers} />
      <ToastContainer />
    </>
  );
}

export default App;
