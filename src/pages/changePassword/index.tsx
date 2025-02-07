import { FormEvent, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useChangePassword } from '@/apis/password';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FormData {
  username: string;
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

interface ValidationRules {
  PASSWORD_MIN_LENGTH: number;
  PASSWORD_PATTERN: RegExp;
}

interface ErrorMessages {
  EMPTY_NICKNAME: string;
  EMPTY_PASSWORD: string;
  PASSWORD_LENGTH: string;
  PASSWORD_PATTERN: string;
  PASSWORD_MISMATCH: string;
  PASSWORD_CHECK: string;
  FAILED_TO_CHECK_USER: string;
}

// 상수 정의
const VALIDATION: ValidationRules = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_PATTERN:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/,
};

const INITIAL_FORM_STATE: FormData = {
  username: '',
  currentPassword: '',
  newPassword: '',
  passwordConfirm: '',
};

const ERROR_MESSAGES: ErrorMessages = {
  EMPTY_NICKNAME: '닉네임을 입력해 주세요.',
  EMPTY_PASSWORD: '비밀번호를 입력해 주세요.',
  PASSWORD_LENGTH: '비밀번호는 8자 이상이어야 합니다.',
  PASSWORD_PATTERN: '영문, 숫자, 특수문자를 최소 1자 포함해야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  PASSWORD_CHECK: '비밀번호를 확인해주세요.',

  FAILED_TO_CHECK_USER: '사용자 확인에 실패했습니다.', // verify의 Failed to check user
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const changeMutation = useChangePassword();

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);

  const isValid =
    formData.currentPassword &&
    formData.newPassword &&
    formData.passwordConfirm &&
    formData.newPassword === formData.passwordConfirm;

  const handleInputChange = (value: string, fieldName: keyof FormData) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));

    if (fieldName === 'newPassword') {
      if (value && value.length < VALIDATION.PASSWORD_MIN_LENGTH) {
        setErrors(prev => ({
          ...prev,
          newPassword: ERROR_MESSAGES.PASSWORD_LENGTH,
        }));
      } else if (value && !VALIDATION.PASSWORD_PATTERN.test(value)) {
        setErrors(prev => ({
          ...prev,
          newPassword: ERROR_MESSAGES.PASSWORD_PATTERN,
        }));
      } else {
        setErrors(prev => ({ ...prev, newPassword: '' }));
      }
    }

    if (fieldName === 'passwordConfirm' || fieldName === 'newPassword') {
      const newPassword =
        fieldName === 'newPassword' ? value : formData.newPassword;
      const passwordConfirm =
        fieldName === 'passwordConfirm' ? value : formData.passwordConfirm;

      if (!passwordConfirm) {
        setErrors(prev => ({
          ...prev,
          passwordConfirm: '',
          passwordSuccess: '',
        }));
      } else if (newPassword && passwordConfirm)
        if (newPassword !== passwordConfirm) {
          setErrors(prev => ({
            ...prev,
            passwordConfirm: ERROR_MESSAGES.PASSWORD_MISMATCH,
            passwordSuccess: '',
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            passwordConfirm: '',
            passwordSuccess: '비밀번호가 일치합니다.',
          }));
        }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (formData.currentPassword === formData.newPassword) {
      toast.error('새 비밀번호는 현재 비밀번호와 달라야 합니다.');
      return;
    }

    changeMutation(
      {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      },
      {
        onSuccess: () => {
          toast.success('비밀번호가 변경되었습니다.');
          setFormData(INITIAL_FORM_STATE);
          setErrors({});
          navigate('/');
        },
        onError: (error: Error) => {
          if (error.message === 'Incorrect current password') {
            toast.error('현재 비밀번호를 확인해주세요.');
          } else {
            toast.error('비밀번호 변경 중 오류가 발생했습니다.');
          }
        },
      },
    );
  };

  return (
    <Layout>
      <div className='flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-16 px-4 lg:flex-row lg:px-8'>
        <div className='w-full max-w-sm lg:w-[30%]'>
          <Card className='border-zinc-800 bg-white/15'>
            <CardHeader>
              <CardTitle className='text-center text-2xl text-zinc-100'>
                비밀번호 변경
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-4'>
                  <Label className='text-base text-zinc-100'>
                    현재 비밀번호
                  </Label>
                  <div className='relative'>
                    <Input
                      type={isShowCurrentPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={e =>
                        handleInputChange(e.target.value, 'currentPassword')
                      }
                      className='h-10 bg-zinc-900 pr-10 text-zinc-100'
                      placeholder='현재 비밀번호를 입력하세요.'
                    />
                    {isShowCurrentPassword ? (
                      <EyeOff
                        className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-100'
                        onClick={() => setIsShowCurrentPassword(false)}
                      />
                    ) : (
                      <Eye
                        className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-100'
                        onClick={() => setIsShowCurrentPassword(true)}
                      />
                    )}
                  </div>
                </div>

                {/* 새로운 비밀번호 */}
                <div className='space-y-4'>
                  <Label className='text-base text-zinc-100'>새 비밀번호</Label>
                  <div className='relative'>
                    <Input
                      type={isShowNewPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={e =>
                        handleInputChange(e.target.value, 'newPassword')
                      }
                      className='h-10 bg-zinc-900 pr-10 text-zinc-100'
                      placeholder='새 비밀번호를 입력하세요.'
                    />
                    {isShowNewPassword ? (
                      <EyeOff
                        className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-100'
                        onClick={() => setIsShowNewPassword(false)}
                      />
                    ) : (
                      <Eye
                        className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-100'
                        onClick={() => setIsShowNewPassword(true)}
                      />
                    )}
                  </div>
                  <div className='h-1'>
                    {errors.newPassword && (
                      <p className='text-sm text-red-500'>
                        {errors.newPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className='space-y-4'>
                  <Label className='text-base text-zinc-100'>
                    비밀번호 확인
                  </Label>
                  <Input
                    type='password'
                    value={formData.passwordConfirm}
                    onChange={e =>
                      handleInputChange(e.target.value, 'passwordConfirm')
                    }
                    className='h-10 bg-zinc-900 text-zinc-100'
                    placeholder='비밀번호를 다시 입력하세요.'
                  />
                  <div className='h-1'>
                    {errors.passwordConfirm && (
                      <p className='text-sm text-red-500'>
                        {errors.passwordConfirm}
                      </p>
                    )}
                    {errors.passwordSuccess && (
                      <p className='text-sm text-green-500'>
                        {errors.passwordSuccess}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <TooltipProvider>
                    {!isValid ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className='inline-block w-full'>
                            <Button
                              type='submit'
                              disabled={true}
                              className='mt-1 h-10 w-full bg-blue-600 hover:bg-blue-700'
                            >
                              비밀번호 변경
                            </Button>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent
                          side='bottom'
                          sideOffset={28}
                          className='bg-white px-8 text-black'
                        >
                          <p>모든 필드를 올바르게 입력하세요.</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Button
                        type='submit'
                        className='mt-1 h-10 w-full bg-blue-600 hover:bg-blue-700'
                      >
                        비밀번호 변경
                      </Button>
                    )}
                  </TooltipProvider>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
