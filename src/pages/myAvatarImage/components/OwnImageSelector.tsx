import { ChangeEvent } from 'react';

import {
  useChangeBackgroundAPI,
  useGetUserBackgroundImage,
} from '@/apis/background';
import { getKoreanName } from '@/pages/background/constant';

import { styles } from '../style';

interface OwnImageSelectorProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
}

const OwnImageSelector = ({
  selectedBackground,
  onBackgroundChange,
}: OwnImageSelectorProps) => {
  const { data } = useGetUserBackgroundImage();
  const changeBackground = useChangeBackgroundAPI();

  if (!data) return null;

  const handleBackgroundChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const selectedBackground = data.backgrounds.find(
      bg => bg.name === selectedName,
    );

    if (selectedBackground) {
      await changeBackground(selectedBackground.id);
      onBackgroundChange(selectedBackground.id);
    }
  };

  const currentBackgroundName =
    data.backgrounds.find(bg => bg.id === selectedBackground)?.name || '';

  return (
    <div className={styles.backgroundSelect.wrapper}>
      <label className={styles.backgroundSelect.label}>배경:</label>
      <select
        className={`${styles.backgroundSelect.select} bg-gray-800 text-white dark:bg-gray-900 [&>option]:bg-gray-800 [&>option]:text-white dark:[&>option]:bg-gray-900`}
        value={currentBackgroundName}
        onChange={handleBackgroundChange}
      >
        {data.backgrounds.map(bg => (
          <option
            key={`${bg.id}-${bg.name}`}
            value={bg.name}
            className='hover:bg-gray-700'
          >
            {getKoreanName(bg.name)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OwnImageSelector;
