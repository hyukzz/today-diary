import DiaryWrite from '@/components/organisms/DiaryWrite/DiaryWrite';
import Navbar from '@/components/molecules/Navbar/Navbar';

const DiaryWritePage = () => {
  return (
    <div className="relative min-h-screen">
      <DiaryWrite />
      <div className="pb-20 xl:pb-52">
        <Navbar />
      </div>
    </div>
  );
};

export default DiaryWritePage;
