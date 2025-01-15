import { useEffect, useState } from 'react';

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
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [authKey, setAuthKey] = useState(''); // 암호화 키 상태
  const [isKeyVisible, setIsKeyVisible] = useState(false); // 암호화 키 보이기/숨기기
  const [isLoading, setIsLoading] = useState(false); // api 요청 대기 할 때

  // 모달 창 열리면 백엔드에서 암호화키 가져오기
  useEffect(() => {
    if (isOpen) {
      fetchAuthKey(); // 모달이 열릴때만 호출
    }
  }, [isOpen]);

  // 백엔드에서 암호화 키 가져오는 함수
  const fetchAuthKey = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/accounts/encryption', {
        method: 'GET',
      });

      if (response.ok) {
        const result = await response.json();
        setAuthKey(result.authKey); // 백엔드로부터 받은 키 설정
        setIsLoading(false);
      } else {
        alert('암호화 키를 불러오지 못했습니다.');
      }
    } catch (error) {
      alert('서버 오류 발생');
      setIsLoading(false);
    }
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
              <Label htmlFor='auth-key' className='text-right'>
                암호화 키
              </Label>
              <div>
                {/* 암호화 키 보이기/숨기기 토글 */}
                <Input
                  id='auth-key'
                  type={isKeyVisible ? 'text' : 'password'}
                  value={authKey || '암호화 키를 불러오는 중...'}
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
          </div>
        </form>

        <div>
          <a href='https://solved.ac/' target='_blank'>
            <Button>solved.ac 바로가기</Button>
          </a>
          {/* 인증 여부에 따른 팝업 */}
          <Button onClick={onClose}>
            {isLoading ? '인증 확인 중' : '인증 성공'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AuthModal;
