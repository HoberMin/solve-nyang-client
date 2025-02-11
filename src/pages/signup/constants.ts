import type { ErrorMessages, FormData, ValidationRules } from './types';

export const VALIDATION: ValidationRules = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_PATTERN:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|(){}[\]:;"'<>,.?/])[A-Za-z\d~!@#$%^&*_\-+=`|(){}[\]:;"'<>,.?/]{8,}$/,
};

export const INITIAL_FORM_STATE: FormData = {
  username: '',
  password: '',
  passwordConfirm: '',
};

export const ERROR_MESSAGES: ErrorMessages = {
  EMPTY_NICKNAME: '닉네임을 입력해 주세요.',
  EMPTY_PASSWORD: '비밀번호를 입력해 주세요.',
  PASSWORD_LENGTH: '비밀번호는 8자 이상이어야 합니다.',
  PASSWORD_PATTERN: '영문, 숫자, 특수문자를 최소 1자 포함해야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  PASSWORD_CHECK: '비밀번호를 확인해주세요.',
  PASSWORD_SPACE: '비밀번호에 공백을 포함할 수 없습니다.',
  PASSWORD_KOR_CHECK: '비밀번호에 한글을 포함할 수 없습니다.',
  FAILED_TO_CHECK_USER: '사용자 확인에 실패했습니다.',
  SIGNUP_FAILED: '회원가입에 실패했습니다.',
  REGISTERED_USER: '이미 가입된 회원입니다.',
  SOLVEDAC_AUTH: 'solved.ac 인증을 확인하세요.',
};

export const FEEDBACK_MESSAGES = {
  ENCRYPTION_GUIDE: '암호화키를 solved.ac 내정보-이름에 입력하세요.',
  INCOMPLETE_FORM: '가입정보를 입력하세요.',
};
