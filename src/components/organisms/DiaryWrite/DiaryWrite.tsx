import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { setDoc, doc } from 'firebase/firestore';

import { db } from '@/firebase/config';
import { EmotionType } from '@/@types/types';
import { Diary } from '@/@types/types';
import { notification } from '@/components/atoms/Toast';
import { DateForm } from '@/components/atoms/Date';
import { useAuthContext } from '@/components/molecules/Context/Context';
import Emotion from '@/components/molecules/Emotion/Emotion';

const DiaryWirte = () => {
  const navigate = useNavigate();
  const { isLoggedIn, uid } = useAuthContext();

  const emotions: EmotionType[] = ['기쁨', '슬픔', '설렘', '애매', '화남'];
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>('애매');
  const [text, setText] = useState('');

  const [iconSize, setIconSize] = useState(
    innerHeight < 800 ? 7 : innerHeight < 950 ? 10 : innerHeight < 1024 ? 12 : 16,
  );
  const [isSmallScreen, setIsSmallScreen] = useState(innerWidth < 320);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setIconSize(innerHeight < 800 ? 7 : innerHeight < 950 ? 10 : innerHeight < 1024 ? 12 : 16);
      setIsSmallScreen(innerWidth < 320);
      setHeight(window.innerHeight);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const postDiaryTestData = async () => {
    if (!isLoggedIn) return;

    if (!text) {
      notification('warning', '오늘의 일기를 작성해주세요!');
      return;
    }

    const currentDate = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    let myuuid = uuidv4();

    const diaryData: Diary = {
      id: myuuid,
      date: currentDate,
      emotion: selectedEmotion,
      text,
    };

    try {
      const docRef = doc(db, `diary/${uid}/diaries/${diaryData.id}`);
      await setDoc(docRef, diaryData);

      notification('success', '오늘의 일기가 저장됐습니다!');
      navigate('/diary');
    } catch (error) {
      notification('error', '일기 저장에 실패했습니다.');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-start px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="flex flex-col items-center justify-center flex-grow-0">
        <p className="text-xl md:text-3xl font-bold mb-4 mt-3">{DateForm(new Date())}</p>

        <p className="text-3xl md:text-4xl font-bold text-black text-center">오늘 하루 어땠어?</p>

        <Emotion category={selectedEmotion} selected={true} size={iconSize} />
      </div>

      <div
        className={`flex flex-col items-center justify-center h-1/3 px-2 md:px-8 lg:px-16 ${
          innerHeight >= 850 ? ' h-auto' : ''
        }`}
      >
        <p className="text-2xl md:text-4xl font-bold text-black text-center lg:px-12">
          오늘의 감정은 어때?
        </p>

        <div className="flex items-center justify-center gap-4 mt-2 text-center">
          {emotions.map((emotion) => (
            <Fragment key={emotion}>
              <input className="hidden" name="emotion" type="radio" id={emotion} value={emotion} />
              <label
                htmlFor={emotion}
                onClick={() => setSelectedEmotion(emotion)}
                className="inline-block cursor-pointer"
              >
                <Emotion
                  category={emotion}
                  selected={emotion === selectedEmotion}
                  size={innerHeight < 1024 ? 3.5 : 6}
                />
                <span
                  className={`mt-2 text-lg md:text-2xl md:px-4 md:py-4 font-semibold capitalize ${
                    isSmallScreen || innerHeight <= 600 ? 'hidden' : ''
                  }`}
                >
                  {emotion}
                </span>
              </label>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="py-4 mb-4 w-full border-black flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-16">
        <p className="text-2xl md:text-4xl font-bold text-black text-center">무슨 일이 있었어?</p>
        <textarea
          className={`p-2 mt-2 text-black text-xl md:text-2xl resize-none w-full sm:w-96 md:w-4/5 lg:w-1/2 border rounded-md border-gray-300 bg-gray-100 shadow-md ${
            innerHeight > 830 ? 'h-60' : innerHeight > 600 ? 'h-40' : 'h-30'
          }`}
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button
        className="px-6 py-3 text-xl md:text-3xl rounded-full bg-gray-300 hover:bg-gray-400 text-black font-bold mb-8 transition-colors duration-300 shadow-md"
        onClick={() => postDiaryTestData()}
      >
        오늘 기록하기
      </button>
    </div>
  );
};

export default DiaryWirte;
