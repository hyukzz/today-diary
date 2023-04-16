import { collection, getDocs, doc, setDoc, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { Diary } from '@/@types/types';
import { db } from '@/firebase/config';
import Modal from '@/components/molecules/Modal';
import Logout from '@/components/molecules/Logout/Logout';
const Test = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handelModal = () => {
    setModalOpen((prev) => !prev);
  };
  const getDiaryTestData: () => Promise<void> = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'diary'));
      querySnapshot.forEach((document) => {
        document.data();

        console.log(document.data());
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postDiaryTestData = async (postData: Diary) => {
    try {
      await setDoc(doc(db, 'diary', 'test5'), postData);
    } catch (error) {}
  };

  const diaryData: Diary = {
    date: Timestamp.fromDate(new Date('December 21, 2022')),
    emotion: '기쁨',
    photo: 'http://',
    text: 'test1 string',
    id: '13',
  };

  useEffect(() => {
    getDiaryTestData();
  }, []);

  return (
    <div>
      <Logout />
      {modalOpen && <Modal onClose={handelModal} />}
      <h1>Test</h1>
      <button onClick={() => postDiaryTestData(diaryData)}>버튼</button>
      <button onClick={handelModal}>모달 열기</button>
    </div>
  );
};

export default Test;
