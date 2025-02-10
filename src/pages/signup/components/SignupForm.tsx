import { FormEvent, useEffect, useState } from 'react';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

import { useGetEncryption } from '@/apis/encryption';
import { useSignUp } from '@/apis/sign';
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

import {
  ERROR_MESSAGES,
  FEEDBACK_MESSAGES,
  INITIAL_FORM_STATE,
  VALIDATION,
} from '../constants';
import type { ApiError, FormData } from '../types';
import { PasswordInput } from './PasswordInput';

export const SignupForm = () => {
  const signUpMutation = useSignUp();
  const getEncryptionMutation = useGetEncryption();

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [encryptionKey, setEncryptionKey] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isKeyIssued, setIsKeyIssued] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleInputChange = (
    value: string,
    fieldName: keyof FormData,
  ): void => {
    if (
      (fieldName === 'password' || fieldName === 'passwordConfirm') &&
      value.includes(' ')
    ) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ERROR_MESSAGES.PASSWORD_SPACE,
      }));
      return;
    }

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

  const handleKeyIssuance = (): void => {
    if (!formData.username) {
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
      onError: () => {
        toast.error('존재하지 않는 사용자입니다.');
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

    if (!formData.password.trim() || !formData.passwordConfirm.trim()) {
      toast.error(ERROR_MESSAGES.PASSWORD_SPACE);
      return;
    }

    signUpMutation(
      {
        username: formData.username,
        password: formData.password,
      },
      {
        onError: (error: ApiError) => {
          console.log(error);
          const errorMessage =
            error.message || '알 수 없는 오류가 발생했습니다.';
          toast.error(errorMessage);
        },
      },
    );
  };

  useEffect(() => {
    if (!isKeyIssued) {
      setIsValid(false);
      return;
    }

    const isPasswordValid = Boolean(
      formData.password &&
        formData.passwordConfirm &&
        formData.password.length >= VALIDATION.PASSWORD_MIN_LENGTH &&
        VALIDATION.PASSWORD_PATTERN.test(formData.password) &&
        formData.password === formData.passwordConfirm,
    );

    setIsValid(isPasswordValid);
  }, [formData, isKeyIssued]);

  return (
    <div className='w-full max-w-sm lg:w-[30%]'>
      <Card className='border-zinc-800 bg-zinc-950/50'>
        <CardHeader>
          <CardTitle className='text-center text-2xl text-zinc-100'>
            회원가입
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
                    autoComplete='off'
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
                  autoComplete='off'
                />
                <Copy
                  className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-100'
                  onClick={handleCopyEncryptionKey}
                />
              </div>
            </div>

            <PasswordInput
              label='비밀번호'
              value={formData.password}
              onChange={value => handleInputChange(value, 'password')}
              error={errors.password}
              showPassword={isShowPassword}
              onToggleShow={() => setIsShowPassword(!isShowPassword)}
              placeholder='비밀번호를 입력하세요.'
            />

            <PasswordInput
              label='비밀번호 확인'
              value={formData.passwordConfirm}
              onChange={value => handleInputChange(value, 'passwordConfirm')}
              error={errors.passwordConfirm}
              success={errors.passwordSuccess}
              placeholder='비밀번호를 다시 입력하세요.'
            />

            <div>
              <TooltipProvider>
                {!isValid && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className='inline-block w-full'>
                        <Button
                          type='submit'
                          disabled={true}
                          className='mt-1 h-10 w-full bg-blue-600 hover:bg-blue-700'
                        >
                          회원가입
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      side='bottom'
                      sideOffset={28}
                      className='bg-white px-8 text-black'
                    >
                      <p>{FEEDBACK_MESSAGES.INCOMPLETE_FORM}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {isValid && (
                  <Button
                    type='submit'
                    className='mt-1 h-10 w-full bg-blue-600 hover:bg-blue-700'
                  >
                    회원가입
                  </Button>
                )}
              </TooltipProvider>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
