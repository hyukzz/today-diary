import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '@/components/molecules/Context/Context';
import { routers } from '@/router';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routers} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        limit={1}
        pauseOnFocusLoss={true}
        closeOnClick={true}
        pauseOnHover={false}
      />
    </AuthProvider>
  );
}

export default App;
