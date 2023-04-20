import { EmotionType } from '@/@types/types';
import Happy from '../../../assets/Emotion/happy.png';
import HappyDisabled from '../../../assets/Emotion/happy_disabled.png';

type EmotionIconProps = {
  category: EmotionType;
  selected?: boolean;
  size?: number;
};

const EmotionIcon = ({ category, selected, size }: EmotionIconProps) => {
  const iconSize = size && size < 10 ? `${size}rem` : `${size}rem`;

  switch (category) {
    case '기쁨':
      return selected ? (
        <img src={Happy} style={{ width: iconSize, height: iconSize }} alt="기쁨on" />
      ) : (
        <img src={HappyDisabled} style={{ width: iconSize, height: iconSize }} alt="기쁨off" />
      );
    case '설렘':
      return selected ? (
        <img src={Happy} style={{ width: iconSize, height: iconSize }} alt="설렘on" />
      ) : (
        <img src={HappyDisabled} style={{ width: iconSize, height: iconSize }} alt="설렘off" />
      );
    case '슬픔':
      return selected ? (
        <img src={Happy} style={{ width: iconSize, height: iconSize }} alt="슬픔on" />
      ) : (
        <img src={HappyDisabled} style={{ width: iconSize, height: iconSize }} alt="슬픔off" />
      );
    case '화남':
      return selected ? (
        <img src={Happy} style={{ width: iconSize, height: iconSize }} alt="화남on" />
      ) : (
        <img src={HappyDisabled} style={{ width: iconSize, height: iconSize }} alt="화남off" />
      );
    default:
      return selected ? (
        <img src={Happy} style={{ width: iconSize, height: iconSize }} alt="애매on" />
      ) : (
        <img src={HappyDisabled} style={{ width: iconSize, height: iconSize }} alt="애매off" />
      );
  }
};

export default EmotionIcon;
