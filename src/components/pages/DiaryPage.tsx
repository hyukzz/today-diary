import DiaryList from '@/components/organisms/DiaryList/DiaryList';
import Navbar from '@/components/molecules/Navbar/Navbar';

const DiaryPage = () => {
  return (
    <>
      <div>
        <div className="relative min-h-screen">
          <DiaryList />
          <div className="pb-20">
            <Navbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default DiaryPage;
