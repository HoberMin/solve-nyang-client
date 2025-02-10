import A_CAPSULE from '@/assets/ball/A1-3.svg';
import A_OPENED from '@/assets/ball/A1-4.svg';
import B_CAPSULE from '@/assets/ball/B1-3.svg';
import B_OPENED from '@/assets/ball/B1-4.svg';
import C_CAPSULE from '@/assets/ball/C1-3.svg';
import C_OPENED from '@/assets/ball/C1-4.svg';
import D_CAPSULE from '@/assets/ball/D1-3.svg';
import D_OPENED from '@/assets/ball/D1-4.svg';
import S_CAPSULE from '@/assets/ball/S1-3.svg';
import S_OPENED from '@/assets/ball/S1-4.svg';

const RARITY_IMAGES = [
  S_CAPSULE,
  S_OPENED,
  A_CAPSULE,
  A_OPENED,
  B_CAPSULE,
  B_OPENED,
  C_CAPSULE,
  C_OPENED,
  D_CAPSULE,
  D_OPENED,
];

const ImagePreloader = () => {
  return (
    <div className='hidden'>
      {RARITY_IMAGES.map((src, index) => (
        <img key={index} src={src} alt='preload' />
      ))}
    </div>
  );
};

export default ImagePreloader;
