import { FormEvent, useEffect, useState } from 'react';

import { Button, Container, Input } from 'nes-ui-react';
import { useNavigate } from 'react-router-dom';

import { useGetEncryption } from '@/apis/encryption';
import { useSignUp } from '@/apis/sign';
import Layout from '@/components/Layout';

import EyeOffIcon from '/eye-off.svg';
import EyeIcon from '/eye.svg';

interface FormData {
  nickname: string;
  password: string;
  passwordConfirm: string;
}

const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_PATTERN:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};

const INITIAL_FORM_STATE: FormData = {
  nickname: '',
  password: '',
  passwordConfirm: '',
};

const ERROR_MESSAGES = {
  EMPTY_NICKNAME: '닉네임을 입력해 주세요.',
  EMPTY_PASSWORD: '비밀번호를 입력해 주세요.',
  PASSWORD_LENGTH: '비밀번호는 8자 이상이어야 합니다.',
  PASSWORD_PATTERN:
    '비밀번호는 영문, 숫자, 특수문자를 최소 1자 포함해야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  KEY_ISSUANCE_FAILED: '암호화 키 발급에 실패했습니다. 다시 시도해주세요.',
  SIGNUP_FAILED: '회원가입에 실패했습니다. 다시 시도해주세요.',
  PASSWORD_CHECK: '비밀번호를 확인해주세요.',
};

const Signup = () => {
  const navigate = useNavigate();
  const signUpMutation = useSignUp();
  const getEncryptionMutation = useGetEncryption();

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [encryptionKey, setEncryptionKey] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [isKeyIssued, setIsKeyIssued] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (value: string, fieldName: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setErrors(prev => ({ ...prev, [fieldName]: '' }));
  };

  const validatePassword = () => {
    if (!formData.password) {
      return ERROR_MESSAGES.EMPTY_PASSWORD;
    }
    if (formData.password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      return ERROR_MESSAGES.PASSWORD_LENGTH;
    }
    if (!VALIDATION.PASSWORD_PATTERN.test(formData.password)) {
      return ERROR_MESSAGES.PASSWORD_PATTERN;
    }
    if (formData.password !== formData.passwordConfirm) {
      return ERROR_MESSAGES.PASSWORD_MISMATCH;
    }
    return '';
  };

  const handleKeyIssuance = async () => {
    try {
      if (!formData.nickname.trim()) {
        setErrors(prev => ({
          ...prev,
          nickname: ERROR_MESSAGES.EMPTY_NICKNAME,
        }));
        return;
      }

      const { encryption } = await getEncryptionMutation(formData.nickname);

      // 서버에서 암호화 키가 제대로 오지 않은 경우도 체크
      if (!encryption) {
        setErrors(prev => ({
          ...prev,
          encryption: ERROR_MESSAGES.KEY_ISSUANCE_FAILED,
        }));
        return;
      }

      setEncryptionKey(encryption);
      setIsKeyIssued(true);
      setErrors(prev => ({ ...prev, encryption: '', nickname: '' }));
    } catch (error) {
      // 에러 타입에 따라 다른 메시지를 보여줄 수 있습니다
      setErrors(prev => ({
        ...prev,
        encryption: ERROR_MESSAGES.KEY_ISSUANCE_FAILED,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordError = validatePassword();
    if (passwordError) {
      setErrors(prev => ({
        ...prev,
        password: ERROR_MESSAGES.PASSWORD_CHECK,
        passwordConfirm: passwordError,
      }));
      return;
    }

    try {
      await signUpMutation({
        nickname: formData.nickname,
        password: formData.password,
      });
      navigate('/login');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: ERROR_MESSAGES.SIGNUP_FAILED,
      }));
    }
  };

  useEffect(() => {
    // 키가 발급되지 않은 상태에서는 닉네임만 검증
    if (!isKeyIssued) {
      setIsValid(!!formData.nickname.trim());
      return;
    }

    // 키가 발급된 후에는 비밀번호 검증도 포함
    const passwordError = validatePassword();
    setIsValid(!passwordError);
  }, [formData, isKeyIssued]);

  return (
    <Layout>
      <div className='flex h-[calc(100vh-64px)] items-center justify-center gap-8'>
        {/* Left Side - Auth Instructions */}
        <div className='w-[500px] rounded bg-black bg-opacity-50 p-6'>
          <div className='flex flex-col items-center'>
            <h2 className='mb-6 text-2xl text-white'>본인 인증 방법</h2>
            <div className='space-y-6'>
              <div>
                <img
                  className='mb-2 h-auto max-h-[200px] w-full object-contain'
                  src='/signup_description1.jpg'
                  alt='인증 방법 설명'
                />
                <p className='text-center text-white'>
                  1. solved.ac 로그인 후 프로필 설정 클릭
                </p>
              </div>

              <div>
                <img
                  className='mb-2 h-auto max-h-[120px] w-full object-contain'
                  src='/signup_description2.jpg'
                  alt='인증 방법 설명'
                />
                <p className='text-center text-white'>
                  2. '이름' 항목의 모국어, 영어로 작성 칸 모두 암호화키 입력
                </p>
                <p className='text-center text-white'>3. 프로필 표시 ON</p>
              </div>
            </div>

            <div className='mt-6'>
              <a
                href='https://solved.ac/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button>solved.ac 바로가기</Button>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <Container
          roundedCorners
          className='w-[450px] bg-black bg-opacity-70'
          style={{ maxHeight: 'calc(100vh - 96px)', overflowY: 'auto' }}
        >
          <form onSubmit={handleSubmit} className='space-y-4 p-6'>
            <h2 className='mb-6 text-3xl text-white'>Sign up</h2>

            {/* Nickname Input */}
            <FormField label='solved.ac 닉네임' error={errors.nickname}>
              <div className='flex w-full items-center gap-2'>
                <div className='w-full flex-[3]'>
                  {/* Input이 차지할 비율 */}
                  <Input
                    type='text'
                    name='nickname'
                    value={formData.nickname}
                    onChange={value => handleInputChange(value, 'nickname')}
                    disabled={isKeyIssued}
                    className='w-full'
                    style={{ backgroundColor: 'white', color: 'black' }}
                  />
                </div>
                <div className='flex-1'>
                  {/* Button이 차지할 비율 */}
                  <Button
                    type='button'
                    onClick={handleKeyIssuance}
                    disabled={isKeyIssued}
                    color={isKeyIssued ? 'disabled' : 'primary'}
                    style={{ color: 'black' }}
                  >
                    키 발급
                  </Button>
                </div>
              </div>
            </FormField>

            {/* Encryption Key Input */}
            <FormField label='암호화 키' error={errors.encryption}>
              <div className='relative'>
                <Input
                  id='encryption-key'
                  type={isKeyVisible ? 'text' : 'password'}
                  value={encryptionKey}
                  className='w-full'
                  style={{ backgroundColor: 'white' }}
                />
                <VisibilityToggle
                  isVisible={isKeyVisible}
                  onToggle={() => setIsKeyVisible(!isKeyVisible)}
                />
              </div>
            </FormField>

            {/* Password Input */}
            <FormField label='비밀번호' error={errors.password}>
              <div className='relative'>
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={value => handleInputChange(value, 'password')}
                  className='w-full'
                  style={{ backgroundColor: 'white', color: 'black' }}
                />
                <VisibilityToggle
                  isVisible={isShowPassword}
                  onToggle={() => setIsShowPassword(!isShowPassword)}
                />
              </div>
            </FormField>

            {/* Password Confirmation */}
            <FormField label='비밀번호 확인' error={errors.passwordConfirm}>
              <Input
                type='password'
                name='passwordConfirm'
                value={formData.passwordConfirm}
                onChange={value => handleInputChange(value, 'passwordConfirm')}
                className='w-full'
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </FormField>

            {/* Submit Button */}
            <div className='mt-6 flex flex-col items-center gap-2'>
              <Button
                type='submit'
                color='success'
                style={{ color: '#000' }}
                disabled={!isValid}
              >
                회원가입
              </Button>
              {errors.submit && <p className='text-red-500'>{errors.submit}</p>}
            </div>
          </form>
        </Container>
      </div>
    </Layout>
  );
};

const FormField = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className='space-y-2'>
    <label className='mb-[-20px] block text-white'>{label}</label>
    {children}
    {error && <p className='text-sm text-red-400'>{error}</p>}
  </div>
);

const VisibilityToggle = ({
  isVisible,
  onToggle,
}: {
  isVisible: boolean;
  onToggle: () => void;
}) => (
  <button
    type='button'
    onClick={onToggle}
    className='absolute right-2 top-1/2 -translate-y-1/2 p-1'
  >
    <img src={isVisible ? EyeOffIcon : EyeIcon} alt='' className='h-5 w-5' />
  </button>
);

export default Signup;
