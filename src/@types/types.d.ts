export type Emotion = '기쁨' | '슬픔' | '설렘' | '애매' | '화남';

export type ChildrenProps = {
  children: React.ReactNode;
};

export interface Diary {
  date: string;
  text: string;
  emotion: string;
  id: string;
}
