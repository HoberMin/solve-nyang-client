import { FormEvent, useEffect, useState } from 'react';

import { UseMutationResult } from '@tanstack/react-query';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

import { useGetEncryption } from '@/apis/encryption';
// import { useSignUp } from '@/apis/sign';
import { useFindPassword } from '@/apis/password';
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
  FAILED_TO_CHECK_USER: string;
  FAILED_MODIFY_PASSWORD: string;
}

// error 타입 정의 추가
interface ApiError extends Error {
  response?: {
    status?: number;
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
  PASSWORD_PATTERN: '영문, 숫자, 특수문자를 최소 1자 포함해야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  PASSWORD_CHECK: '비밀번호를 확인해주세요.',

  FAILED_TO_CHECK_USER: '사용자 확인에 실패했습니다.', // verify의 Failed to check user
  FAILED_MODIFY_PASSWORD: '비밀번호 수정 실패',
};

const FEEDBACK_MESSAGES = {
  ENCRYPTION_GUIDE: '암호화키를 solved.ac 내정보-이름에 입력하세요.',
  INCOMPLETE_FORM: '가입정보를 입력하세요.',
};

interface FindPasswordRequest {
  username: string;
  password: string;
}

interface FindPasswordResponse {
  message: string;
}

// 비밀번호 찾기이지만 사실상 재가입 로직
const FindPassword = () => {
  // const findPasswordMutation = useFindPassword();
  const findPasswordMutation: UseMutationResult<
    FindPasswordResponse,
    ApiError,
    FindPasswordRequest
  > = useFindPassword();

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
        // 디버깅을 위한 에러 로그 추가
        console.log('Error response:', error.response?.data);
        console.log('Error status:', error.response?.status);

        toast.error('존재하지 않는 사용자입니다.');

        // 왜 안될까
        // if (error.response?.status === 403) {
        //   toast.error('존재하지 않는 사용자입니다.');
        // } else {
        //   // 기타 에러
        //   toast.error(
        //     '암호화 키 발급에 실패 했습니다. 잠시 후 다시 시도해주세요',
        //   );
        // }
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
    findPasswordMutation.mutate(
      {
        username: formData.username,
        password: formData.password,
      },
      {
        onSuccess: () => {
          toast.success('비밀번호 재설정 성공!');
        },
        onError: (error: ApiError) => {
          const errorMessage = error.response?.data?.message;

          switch (errorMessage) {
            case 'Incorrect verificationKey':
              toast.error('본인 인증 실패');
              break;
            default:
              toast.error('비밀번호 재설정 중 오류가 발생했습니다.');
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
        {/* 좌측 설명 */}
        {/* <Card className='border-zinc-800 bg-zinc-950/50 p-10'> */}
        <div className='space-y-2 text-white'>
          <div className='flex justify-center gap-3 text-center'>
            <h3 className='mb-1 text-xl font-bold'>비밀번호 재설정 방법</h3>
          </div>
          <div>
            <p>① solved.ac 닉네임 입력 후 키 발급 버튼 클릭</p>
            <p>② 암호화키 복사</p>
            <div className='flex gap-4'>
              <p>③ solved.ac 로그인</p>
              <a href='https://solved.ac/' target='_blank'>
                [바로가기]
              </a>
            </div>
            <p>④ 로그인 후 프로필 창 - '설정' 클릭</p>
            <p>⑤ 개인정보 - 이름 항목에 암호화키 입력</p>
            <p className='pl-4'>* 모국어와 영어 모두 작성해주세요 </p>
            <p>⑥ 프로필에 이름 표시 ON</p>
            <p>⑦ 비밀번호 찾기 페이지로 돌아와 새로운 솔브냥 비밀번호 입력</p>
            <p>⑧ 비밀번호 재설정 버튼 클릭</p>
          </div>
        </div>
        {/* </Card> */}

        {/* 우측 양식 */}
        <div className='w-full max-w-sm lg:w-[30%]'>
          {/* <Card className='border-zinc-800 bg-zinc-950/50'> */}
          <Card className='border-zinc-800 bg-white/15'>
            <CardHeader>
              <CardTitle className='text-center text-2xl text-zinc-100'>
                비밀번호를 잊어버리셨나요?
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
                  <div className='h-1'>
                    {errors.password && (
                      <p className='text-sm text-red-500'>{errors.password}</p>
                    )}
                  </div>
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
                              disabled={!isValid}
                              className='mt-1 h-10 w-full bg-blue-600 hover:bg-blue-700'
                            >
                              비밀번호 재설정
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
                        disabled={!isValid}
                        className='mt-1 h-10 w-full bg-blue-600 hover:bg-blue-700'
                      >
                        비밀번호 재설정
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

export default FindPassword;
