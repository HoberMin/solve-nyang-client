import { ChangeEvent } from 'react';

import {
  useChangeBackgroundAPI,
  useGetUserBackgroundImage,
} from '@/apis/background';
import { getKoreanName } from '@/lib/utils';

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
    <div className='space-y-2'>
      <select
        className={`w-full rounded-md bg-gray-800 px-4 py-3 text-base text-white outline-none hover:bg-gray-700 dark:bg-gray-900 [&>option]:bg-gray-800 [&>option]:text-white dark:[&>option]:bg-gray-900`}
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
