import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';

import { db } from '@/firebase/config';
import { DateForm } from '@/components/atoms/Date';
import Loading from '@/components/atoms/Loading/Loading';
import { useAuthContext } from '@/components/molecules/Context/Context';
import DiaryHeader from '@/components/molecules/DiaryHeader/DiaryHeader';
import DiaryItem from '@/components/organisms/DiaryItems/DiaryItem';
import { Diary } from '@/@types/types';
import empty_diary from '@/assets/empty_diary.svg';
import write_diary from '@/assets/write_diary.svg';

const DiaryList = () => {
  const { uid, isLoggedIn } = useAuthContext();

  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemList, setItemList] = useState<Diary[]>([]);

  const diaryData = async (year: number, month: number) => {
    if (!isLoggedIn) return;

    const startOfMonth = DateForm(new Date(year, month, 1));
    const endOfMonth = DateForm(new Date(year, month + 1, 0));

    const q = query(
      collection(db, `diary/${uid}/diaries`),
      where('date', '>=', startOfMonth),
      where('date', '<=', endOfMonth),
      orderBy('date'),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const diaryData: { date: string; time: string; emotion: string; text: string; id: string }[] =
        [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as {
          date: string;
          time: string;
          emotion: string;
          text: string;
          id: string;
        };

        diaryData.push(data);
      });

      setItemList(diaryData);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  };
  useEffect(() => {
    diaryData(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  return (
    <article className="flex flex-col h-full">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <DiaryHeader
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />

          {itemList.length > 0 ? (
            itemList.map((item: Diary, index) => {
              return (
                <div key={index}>
                  <DiaryItem item={item} key={index} />
                </div>
              );
            })
          ) : (
            <div className="text-lg flex flex-col items-center justify-center mt-[20vh]">
              <img
                src={empty_diary}
                alt="오늘의 일기를 써보세요!"
                className="h-48 mx-auto mb-4 select-none animate-bounce"
              />
              <p className="text-3xl animate-bounce mb-4 select-none">일기가 비어있어요!</p>
              <Link
                to="/diarywrite"
                className="mt-4 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <img
                  src={write_diary}
                  alt="오늘의 일기를 써보세요!"
                  className="w-5 h-5 select-none"
                />
                <span className="select-none">새 일기 쓰기</span>
              </Link>
            </div>
          )}
        </>
      )}
    </article>
  );
};

export default DiaryList;
