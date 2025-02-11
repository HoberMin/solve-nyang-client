export interface FormData {
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface ValidationRules {
  PASSWORD_MIN_LENGTH: number;
  PASSWORD_PATTERN: RegExp;
}

export interface ErrorMessages {
  EMPTY_NICKNAME: string;
  EMPTY_PASSWORD: string;
  PASSWORD_LENGTH: string;
  PASSWORD_PATTERN: string;
  PASSWORD_MISMATCH: string;
  PASSWORD_CHECK: string;
  PASSWORD_SPACE: string;
  PASSWORD_KOR_CHECK: string;
  FAILED_TO_CHECK_USER: string;
  SIGNUP_FAILED: string;
  REGISTERED_USER: string;
  SOLVEDAC_AUTH: string;
}

export interface ApiError extends Error {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}
