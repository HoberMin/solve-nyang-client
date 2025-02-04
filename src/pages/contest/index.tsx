import { useState } from 'react';

import {
  Award,
  CalendarRange,
  ImageIcon,
  Info,
  Upload,
  Vote,
} from 'lucide-react';
import { toast } from 'sonner';

import { domain } from '@/apis/avatar';
import { useSubmitContestAvatar } from '@/apis/event';
import Layout from '@/components/Layout';

interface ContestFile {
  file: File | null;
  preview: string | null;
  imageUrl: string | null;
  originalFilename: string | null;
  storedFilename: string | null;
}

const ContestPage = () => {
  const submitContestAvatar = useSubmitContestAvatar();
  const [
    { file, preview, imageUrl, originalFilename, storedFilename },
    setFileState,
  ] = useState<ContestFile>({
    file: null,
    preview: null,
    imageUrl: null,
    originalFilename: null,
    storedFilename: null,
  });

  const getPresignedUrl = async (filename: string, contentType: string) => {
    try {
      const response = await fetch(
        `${domain}/images/presigned-url?filename=${filename}&contentType=${contentType}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      const data = await response.json();

      return data.presignedUrl;
    } catch (error) {
      toast.error('이미지 업로드 준비 중 오류가 발생했습니다.');
      throw error;
    }
  };

  const uploadFileToPresignedUrl = async (presignedUrl: string, file: File) => {
    try {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const baseUrl = presignedUrl.split('?')[0];
      const storedFilename = baseUrl.split('/').pop() || '';

      return { baseUrl, storedFilename };
    } catch (error) {
      toast.error('이미지 업로드에 실패했습니다.');
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileState({
          file: selectedFile,
          preview: reader.result as string,
          imageUrl: null,
          originalFilename: selectedFile.name,
          storedFilename: null,
        });
      };
      reader.readAsDataURL(selectedFile);

      const presignedUrl = await getPresignedUrl(
        selectedFile.name,
        selectedFile.type,
      );

      const { baseUrl, storedFilename } = await uploadFileToPresignedUrl(
        presignedUrl,
        selectedFile,
      );

      setFileState(prev => ({
        ...prev,
        imageUrl: baseUrl,
        storedFilename,
      }));
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      resetFile();
    }
  };

  const handleSubmit = () => {
    if (imageUrl && originalFilename && storedFilename) {
      submitContestAvatar({
        originalFilename,
        storedFilename,
      });
      resetFile();
    }
  };

  const resetFile = () =>
    setFileState({
      file: null,
      preview: null,
      imageUrl: null,
      originalFilename: null,
      storedFilename: null,
    });

  return (
    <Layout>
      <div className='p-8 pl-16'>
        <div className='flex flex-col items-center text-center'>
          <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent'>
            고양이 캐릭터 공모전
          </span>
          <div className='mt-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2'>
            <CalendarRange className='h-5 w-5 text-blue-600' />
            <span className='font-medium text-blue-600'>
              2025.02.05 - 2025.02.10
            </span>
          </div>
        </div>

        <div className='mt-8 grid grid-cols-[1fr_2fr] gap-8'>
          <div className='rounded-2xl p-6 backdrop-blur-sm'>
            <div className='mb-4 flex items-center'>
              <Upload className='mr-2 h-6 w-6 text-blue-400' />
              <span className='text-2xl font-bold text-white'>작품 제출</span>
            </div>

            <div className='flex flex-col gap-4'>
              <div className='rounded-lg p-4 backdrop-blur-sm'>
                {preview ? (
                  <div className='flex flex-col items-center gap-4'>
                    <img
                      src={preview}
                      alt='미리보기'
                      className='max-h-32 w-auto'
                    />
                    <button
                      onClick={resetFile}
                      className='text-sm text-gray-300 hover:text-white'
                    >
                      이미지 변경
                    </button>
                  </div>
                ) : (
                  <label className='flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-gray-400 p-6 transition-all hover:border-blue-400'>
                    <ImageIcon className='mb-2 h-12 w-12 text-gray-400' />
                    <span className='text-center text-sm text-gray-300'>
                      50x50 픽셀 이하의
                      <br />
                      PNG/SVG 파일을 업로드해주세요
                    </span>
                    <input
                      type='file'
                      className='hidden'
                      accept='image/*'
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>

              {file && (
                <button
                  onClick={handleSubmit}
                  className='rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700'
                >
                  제출하기
                </button>
              )}
            </div>
          </div>

          <div className='space-y-6'>
            <div className='rounded-2xl p-6 backdrop-blur-sm'>
              <div className='mb-6 flex items-center'>
                <Info className='mr-2 h-6 w-6 text-yellow-400' />
                <span className='text-2xl font-bold text-white'>
                  공모전 안내
                </span>
              </div>
              <p className='mb-6 text-lg text-white'>
                솔브냥의 새로운 아바타가 될 여러분의 고양이 그림을 기다립니다
              </p>
              <div className='grid grid-cols-2 gap-6'>
                <div className='rounded-lg p-6 backdrop-blur-sm'>
                  <div className='mb-4 flex items-center'>
                    <Vote className='mr-2 h-5 w-5 text-blue-400' />
                    <span className='font-bold text-white'>투표 및 채택</span>
                  </div>
                  <ul className='space-y-3 text-gray-200'>
                    <li>• 2월 10일부터 투표 진행</li>
                    <li>• 최다 득표 작품은 서비스 실제 캐릭터로 채택</li>
                    <li>• 채택된 작품 제작자에게 추가 포인트 지급</li>
                  </ul>
                </div>

                <div className='rounded-lg p-6 backdrop-blur-sm'>
                  <div className='mb-4 flex items-center'>
                    <Award className='mr-2 h-6 w-6 text-yellow-400' />
                    <span className='font-bold text-white'>참여 보상</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <img
                      src='/cats/IdeaCat.svg'
                      alt='아이디어냥'
                      className='h-24 w-24'
                    />
                    <div>
                      <p className='text-white'>모든 참여자에게</p>
                      <p className='font-bold text-yellow-400'>
                        H등급 '아이디어냥' 지급
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='rounded-2xl p-6 backdrop-blur-sm'>
              <div className='mb-4 flex items-center'>
                <ImageIcon className='mr-2 h-5 w-5 text-purple-400' />
                <span className='font-bold text-white'>제작 가이드</span>
              </div>
              <div className='grid grid-cols-3 gap-6 text-gray-200'>
                <div>
                  <p className='mb-2 font-bold text-white'>이미지 크기</p>
                  <p>50x50 픽셀 이하</p>
                </div>
                <div>
                  <p className='mb-2 font-bold text-white'>파일 형식</p>
                  <p>PNG 또는 SVG</p>
                </div>
                <div>
                  <p className='mb-2 font-bold text-white'>주의사항</p>
                  <p>
                    서비스 목적에 적합한
                    <br />
                    고양이 캐릭터로 제작
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContestPage;
