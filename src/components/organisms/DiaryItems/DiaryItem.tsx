import { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import { db } from '@/firebase/config';
import { notification } from '@/components/atoms/Toast';
import { useAuthContext } from '@/components/molecules/Context/Context';
import { Diary } from '@/@types/types';
import Happy from '@/assets/Emotion/happy.png';

type EmotionIconType = {
  [key: string]: string;
};

const DiaryItem = ({ item }: { item: Diary }) => {
  const { time, emotion, text, id } = item;
  const { uid } = useAuthContext();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);

  const EmotionIcons: EmotionIconType = {
    화남: Happy,
    기쁨: Happy,
    설렘: Happy,
    슬픔: Happy,
    애매: Happy,
  };

  const editDiary = async () => {
    try {
      const docRef = doc(db, `diary/${uid}/diaries/${id}`);
      await updateDoc(docRef, {
        text: updatedText,
      });
      setIsEditing(false);

      notification('success', '일기가 수정됐습니다!');
    } catch (error) {
      notification('error', '일기 수정에 실패했습니다.');
    }
  };

  const deleteDiary = async (id: string) => {
    try {
      const docRef = doc(db, `diary/${uid}/diaries/${id}`);
      await deleteDoc(docRef);

      notification('success', '일기가 삭제됐습니다!');
    } catch (error) {
      notification('error', '일기 삭제에 실패했습니다.');
    }
  };
  return (
    <div className="flex flex-col border rounded-3xl border-gray-300 bg-white shadow-md p-4 my-6 mx-auto md:max-w-lg lg:max-w-xl xl:max-w-2xl max-w-xs">
      <div className="text-gray-500 text-sm">{time}</div>
      <div className="flex mt-2">
        {emotion && (
          <div className="mt-4 mr-4 text-center">
            <img
              src={EmotionIcons[emotion]}
              alt="감정"
              className="mb-3 h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-32 xl:w-32"
            />
            {emotion}
          </div>
        )}
        <div className="flex-1 mt-4 text-gray-700 text-lg ml-4">
          {isEditing ? (
            <textarea
              className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
          ) : (
            text
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="flex justify-end mt-4">
          <button
            className="bg-white bg-opacity-80 text-gray-700 rounded-md py-1 px-2 hover:bg-gray-100"
            onClick={() => {
              editDiary();
            }}
          >
            수정 완료
          </button>
          <button
            className="ml-2 bg-white bg-opacity-80 text-gray-700 rounded-md py-1 px-2 hover:bg-gray-100"
            onClick={() => {
              setIsEditing(false);
              setUpdatedText(text);
            }}
          >
            취소
          </button>
        </div>
      ) : (
        <div className="flex justify-end mt-4">
          <button
            className="bg-white bg-opacity-80 text-gray-700 rounded-md py-1 px-2 hover:bg-gray-100"
            onClick={() => {
              setIsEditing(true);
              setUpdatedText(text);
            }}
          >
            수정
          </button>
          <button
            className="ml-2 bg-red-500 bg-opacity-80 text-white rounded-md py-1 px-2 hover:bg-red-600"
            onClick={() => deleteDiary(id)}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default DiaryItem;
