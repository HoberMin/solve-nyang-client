import { FormEvent, useEffect, useState } from 'react';

import { Copy, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

import { useGetEncryption } from '@/apis/encryption';
import { useSignUp } from '@/apis/sign';
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
  password: string;
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
  USERNAME_ERROR: string;
  PASSWORD_ERROR: string;
  FAILED_TO_CHECK_USER: string;
  SIGNUP_FAILED: string;
}

// error 타입 정의 추가
interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// 상수 정의
const VALIDATION: ValidationRules = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_PATTERN:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/,
};

const INITIAL_FORM_STATE: FormData = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const ERROR_MESSAGES: ErrorMessages = {
  EMPTY_NICKNAME: '닉네임을 입력해 주세요.',
  EMPTY_PASSWORD: '비밀번호를 입력해 주세요.',
  PASSWORD_LENGTH: '비밀번호는 8자 이상이어야 합니다.',
  PASSWORD_PATTERN:
    '비밀번호는 영문, 숫자, 특수문자를 최소 1자 포함해야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  PASSWORD_CHECK: '비밀번호를 확인해주세요.',

  // 백엔드 에러 메시지와 매칭
  USERNAME_ERROR: '존재하지 않는 사용자입니다.', // signin의 Username Error
  PASSWORD_ERROR: '비밀번호가 올바르지 않습니다.', // signin의 Password Error
  FAILED_TO_CHECK_USER: '사용자 확인에 실패했습니다.', // verify의 Failed to check user
  SIGNUP_FAILED: '회원가입에 실패했습니다.', // signup의 failed
};

const FEEDBACK_MESSAGES = {
  ENCRYPTION_GUIDE: '암호화키를 solved.ac 내정보-이름에 입력하세요.',
  INCOMPLETE_FORM: '가입정보를 입력하세요.',
};

const FindPassword = () => {
  const signUpMutation = useSignUp();
  const getEncryptionMutation = useGetEncryption();

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [encryptionKey, setEncryptionKey] = useState<string>(''); // 인증키 재발급
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isKeyIssued, setIsKeyIssued] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  // 입력 폼 수정 감지(본인 인증 후 비밀번호 재설정)
  const handleInputChange = (
    value: string,
    fieldName: keyof FormData,
  ): void => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));

    if (fieldName === 'password') {
      if (value && value.length < VALIDATION.PASSWORD_MIN_LENGTH) {
        setErrors(prev => ({
          ...prev,
          password: ERROR_MESSAGES.PASSWORD_LENGTH,
        }));
      } else if (value && !VALIDATION.PASSWORD_PATTERN.test(value)) {
        setErrors(prev => ({
          ...prev,
          password: ERROR_MESSAGES.PASSWORD_PATTERN,
        }));
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }

    if (fieldName === 'passwordConfirm' || fieldName === 'password') {
      const password = fieldName === 'password' ? value : formData.password;
      const passwordConfirm =
        fieldName === 'passwordConfirm' ? value : formData.passwordConfirm;

      if (!passwordConfirm) {
        setErrors(prev => ({
          ...prev,
          passwordConfirm: '',
          passwordSuccess: '',
        }));
      } else if (password && passwordConfirm)
        if (password !== passwordConfirm) {
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

  // 키 발급
  const handleKeyIssuance = (): void => {
    if (!formData.username.trim()) {
      setErrors(prev => ({
        ...prev,
        username: ERROR_MESSAGES.EMPTY_NICKNAME,
      }));
      return;
    }

    getEncryptionMutation(formData.username, {
      onSuccess: (data: { verificationCode: string }) => {
        setEncryptionKey(data.verificationCode);
        setIsKeyIssued(true);
        setErrors(prev => ({ ...prev, encryption: '', username: '' }));
        toast.success(FEEDBACK_MESSAGES.ENCRYPTION_GUIDE);
      },
      onError: (error: ApiError) => {
        if (error.response?.data?.message === 'Failed to check user') {
          toast.error(ERROR_MESSAGES.FAILED_TO_CHECK_USER);
        } else {
          toast.error(ERROR_MESSAGES.USERNAME_ERROR);
        }
      },
    });
  };

  const handleCopyEncryptionKey = async () => {
    try {
      await navigator.clipboard.writeText(encryptionKey);
      toast.success('암호화키가 클립보드에 복사되었습니다.');
    } catch (err) {
      toast.error('암호화키 복사에 실패했습니다.');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    signUpMutation(
      {
        username: formData.username,
        password: formData.password,
      },
      {
        onSuccess: () => {
          toast.success('비밀번호 변경 성공!');
        },
        onError: (error: ApiError) => {
          const errorMessage = error.response?.data?.message;

          switch (errorMessage) {
            case 'Username Error':
              toast.error(ERROR_MESSAGES.USERNAME_ERROR);
              break;
            case 'Password Error':
              toast.error(ERROR_MESSAGES.PASSWORD_ERROR);
              break;
            case 'failed':
              toast.error(ERROR_MESSAGES.SIGNUP_FAILED);
              break;
            default:
              toast.error('비밀번호 변경 중 오류가 발생했습니다.');
          }
        },
      },
    );
  };

  useEffect(() => {
    if (!isKeyIssued) {
      // setIsValid(!!formData.username.trim());
      setIsValid(false);
      return;
    }

    const isPasswordValid: boolean = Boolean(
      formData.password &&
        formData.passwordConfirm &&
        formData.password.length >= VALIDATION.PASSWORD_MIN_LENGTH &&
        VALIDATION.PASSWORD_PATTERN.test(formData.password) &&
        formData.password === formData.passwordConfirm,
    );

    setIsValid(isPasswordValid);
  }, [formData, isKeyIssued]);

  return (
    <Layout>
      <div className='flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-16 px-4 lg:flex-row lg:px-8'>
        <div className='w-full max-w-sm lg:w-[30%]'>
          <Card className='border-zinc-800 bg-zinc-950/50'>
            <CardHeader>
              <CardTitle className='text-center text-2xl text-zinc-100'>
                비밀번호 찾기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-4'>
                  <Label className='text-base text-zinc-100'>
                    solved.ac 닉네임
                  </Label>
                  <div className='flex gap-2'>
                    <div className='relative flex-1'>
                      <Input
                        type='text'
                        value={formData.username}
                        onChange={e =>
                          handleInputChange(e.target.value, 'username')
                        }
                        disabled={isKeyIssued}
                        className='h-10 bg-zinc-900 text-zinc-100'
                        placeholder='닉네임을 입력하세요'
                      />
                    </div>
                    <Button
                      type='button'
                      onClick={handleKeyIssuance}
                      disabled={isKeyIssued}
                      className='bg-blue-600 hover:bg-blue-700'
                    >
                      키 발급
                    </Button>
                  </div>
                  {errors.username && (
                    <p className='text-sm text-red-500'>{errors.username}</p>
                  )}
                </div>

                <div className='space-y-4'>
                  <Label className='text-base text-zinc-100'>암호화 키</Label>
                  <div className='relative'>
                    <Input
                      type='text'
                      value={encryptionKey}
                      readOnly
                      className='h-10 bg-zinc-900 pr-10 text-zinc-100'
                    />
                    <Copy
                      className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-100'
                      onClick={handleCopyEncryptionKey}
                    />
                  </div>
                </div>

                <div className='space-y-4'>
                  <Label className='text-base text-zinc-100'>새 비밀번호</Label>
                  <div className='relative'>
                    <Input
                      type={isShowPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={e =>
                        handleInputChange(e.target.value, 'password')
                      }
                      className='h-10 bg-zinc-900 pr-10 text-zinc-100'
                      placeholder='새로운 비밀번호를 입력하세요.'
                    />
                    {isShowPassword ? (
                      <EyeOff
                        className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-100'
                        onClick={() => setIsShowPassword(false)}
                      />
                    ) : (
                      <Eye
                        className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-100'
                        onClick={() => setIsShowPassword(true)}
                      />
                    )}
                  </div>
                  {errors.password && (
                    <p className='text-sm text-red-500'>{errors.password}</p>
                  )}
                </div>

                <div className='space-y-4'>
                  <Label className='text-base text-zinc-100'>
                    새 비밀번호 확인
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
                <TooltipProvider>
                  {!isValid && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className='inline-block w-full'>
                          <Button
                            type='submit'
                            disabled={true}
                            className='mt-6 h-10 w-full bg-blue-600 hover:bg-blue-700'
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
                        <p>{'변경 정보를 입력하세요.'}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TooltipProvider>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FindPassword;
