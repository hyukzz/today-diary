export type EmotionType = '기쁨' | '슬픔' | '설렘' | '애매' | '화남';

export type ChildrenProps = {
  children: React.ReactNode;
};

export interface Diary {
  date: string;
  text: string;
  time: string;
  emotion: string;
  id: string;
}
