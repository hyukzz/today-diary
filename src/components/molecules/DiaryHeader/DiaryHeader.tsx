import { useState, useEffect } from 'react';

interface Props {
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  selectedMonth: number;
  selectedYear: number;
}

const DiaryHeader = ({ setSelectedMonth, setSelectedYear, selectedMonth, selectedYear }: Props) => {
  const handlePrevMonth = () => {
    let prevMonth = selectedMonth - 1;
    let prevYear = selectedYear;

    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear -= 1;
    }
    setSelectedYear(prevYear);
    setSelectedMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const currentMonth = new Date().getMonth();
    if (selectedMonth < currentMonth || selectedYear < new Date().getFullYear()) {
      let nextMonth = selectedMonth + 1;
      let nextYear = selectedYear;

      if (nextMonth > 11) {
        nextMonth = 0;
        nextYear += 1;
      }
      setSelectedYear(nextYear);
      setSelectedMonth(nextMonth);
    }
  };

  const isNextMonthDisabled = () => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    return (
      (selectedMonth === 11 && selectedYear === currentYear) ||
      (selectedMonth === currentMonth - 1 && selectedYear === currentYear)
    );
  };

  const [isWideScreen, setIsWideScreen] = useState<boolean>(window.innerWidth >= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 640);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isWideScreen]);

  return (
    <>
      {!isWideScreen ? (
        <div className="flex justify-between items-center w-full my-2">
          <button
            className="text-lg text-gray-500 hover:text-gray-900 w-16 select-none"
            onClick={handlePrevMonth}
          >
            이전달
          </button>
          <h2 className="select-none text-2xl font-bold text-gray-900">{`${selectedYear}년 ${
            selectedMonth + 1
          }월`}</h2>
          <button
            className={`text-lg select-none ${
              isNextMonthDisabled()
                ? 'text-gray-300 cursor-default'
                : 'text-gray-500 hover:text-gray-900'
            } w-16`}
            onClick={handleNextMonth}
            disabled={isNextMonthDisabled()}
          >
            다음달
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full my-4">
          <button
            className="mr-4 text-3xl text-gray-500 hover:text-gray-900 select-none"
            onClick={handlePrevMonth}
          >
            {'<'}
          </button>
          <h2 className="select-none text-4xl font-bold text-gray-900">{`${selectedYear}년 ${
            selectedMonth + 1
          }월`}</h2>
          <button
            className={`ml-4 text-3xl select-none ${
              isNextMonthDisabled()
                ? 'text-gray-400 cursor-default'
                : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={handleNextMonth}
            disabled={isNextMonthDisabled()}
          >
            {'>'}
          </button>
        </div>
      )}
    </>
  );
};

export default DiaryHeader;
