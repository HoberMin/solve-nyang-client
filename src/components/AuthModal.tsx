import { useEffect, useState } from 'react';

import { getEncryption, postEncryption } from '@/apis/encryption';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthModalProps {
  isOpen: boolean; // 모달 열림 상태
  onClose: () => void; // 모달 닫기
  onVerify: () => void; // 인증 성공 처리
}

const AuthModal = ({ isOpen, onClose, onVerify }: AuthModalProps) => {
  const [encryptionKey, setEncryptionKey] = useState(''); // 암호화 키 상태
  const [isKeyVisible, setIsKeyVisible] = useState(false); // 암호화 키 보이기/숨기기
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태

  // 모달 창 열리면 백엔드에서 암호화키 요청
  useEffect(() => {
    if (isOpen) {
      fetchEncryptionKey(); // 모달이 열릴때만 호출
    }
  }, [isOpen]);

  // 암호화 키 요청 함수
  // 암호화 키 임시 설정
  const fetchEncryptionKey = async () => {
    setIsLoading(true); // 로딩 시작
    setError(null); // 이전 에러 초기화
    try {
      // const encryption = 'TEMP-ENCRYPTION-KEY'; // 확인용 임시값
      const { encryption } = await getEncryption(); // API 호출
      setEncryptionKey(encryption); // 암호화키 저장
    } catch (err) {
      setError('암호화 키를 불러오지 못했습니다.');
    }
    setIsLoading(false); // 로딩 종료
  };

  // 인증 확인 처리
  const handleVerify = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await postEncryption(encryptionKey); // 인증 API 호출
      onVerify();
    } catch (err) {
      setError('인증에 실해했습니다. 다시 시도해주세요.');
    }
    setIsLoading(false); // 로딩 종료
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>본인 인증 창</DialogTitle>
          <DialogDescription>
            solved.ac 마이페이지/이름 칸을 발급된 암호화키로 변경하세요
          </DialogDescription>
        </DialogHeader>

        <form>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='encryption-key' className='text-right'>
                암호화 키
              </Label>
              <div>
                {/* 암호화 키 보이기/숨기기 토글 */}
                <Input
                  id='encryption-key'
                  type={isKeyVisible ? 'text' : 'password'}
                  value={
                    isLoading ? '암호화 키를 불러오는 중...' : encryptionKey
                  }
                  className='col-span-3'
                />
                <Button
                  type='button'
                  onClick={() => setIsKeyVisible(!isKeyVisible)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600'
                >
                  {isKeyVisible ? '👁️' : '🫣'}
                </Button>
              </div>
            </div>
            {error && <p className='text-sm text-red-500'>{error}</p>}
          </div>
        </form>

        <div>
          <a href='https://solved.ac/' target='_blank'>
            <Button>solved.ac 바로가기</Button>
          </a>
          {/* 인증 여부에 따른 팝업 */}
          <Button onClick={handleVerify} disabled={!encryptionKey || isLoading}>
            {isLoading ? '인증 확인 중' : '인증 성공'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AuthModal;
