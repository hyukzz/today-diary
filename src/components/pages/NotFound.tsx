import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 Not Found</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          onClick={() => navigate('/')}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default NotFound;
