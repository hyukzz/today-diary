import Happy from '../../../assets/Emotion/happy.png';

const Loading = () => {
  return (
    <div className="text-lg flex flex-col items-center justify-center mt-[20vh]">
      <img
        src={Happy}
        alt="loading"
        className="h-48 mx-auto mb-4 select-none animate-bounce"
        style={{ height: 200, width: 200 }}
      />
      <div className="text-3xl mt-8 select-none animate-bounce">로딩딩딩...</div>
    </div>
  );
};

export default Loading;
