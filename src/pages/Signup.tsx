import { useState } from 'react'
const Signup = () => {
  // 폼 데이터를 관리하는 상태
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
    passwordConfirm: '',
  })

  const [errors, setErrors] = useState({})  // 각 입력 필드의 에러 메시지를 관리하는 상태(닉네임, 비밀번호, 비밀번호 확인 에러메시지를 하나의 객체로)
  
  const [showPassword, setShowPassword] = useState(false) // 비밀번호 보이기/숨기기  

  const inputChange = (e) => {
    const { name, value } = e.target  // 입력 필드의 name, value 가져오기
    setFormData((prev) => ({ ...prev, [name]: value }))  // 입력 필드의 name에 해당하는 값을 value로 설정
  }


  // 유효성 검사 함수
  const validatePassword = () => {
    const newErrors = {}

    // 닉네임 필드 검증
    if (!formData.nickname.trim()) { 
      newErrors.nickname = '닉네임을 입력해 주세요.'
    }
    // 비밀번호 필드 검증
    if (!formData.password) { // 비어있을 경우
      newErrors.password = '비밀번호를 입력해 주세요.'
    } else if (formData.password.length < 8) {  // 8자 이하일 경우
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.'
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(formData.password)) { // 문자열이 특정 패턴(정규식)을 만족하는지 true 또는 false로 반환, ^(Caret)은 문자열의 시작을 의미.
      newErrors.password = '비밀번호는 문자와 숫자를 포함해야 합니다.'
    }

    // 비밀번호 확인 필드 검증
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
    }

    setErrors(newErrors)  // 에러 메시지 상태 업데이트
    return Object.keys(newErrors).length === 0  // 에러 메시지가 하나도 없으면 true 반환
  }

  // 폼 제출 시 호출되는 함수
  const onSubmit = (e) => {
    e.preventDefault()
    if (validatePassword()) {
      console.log('회원가입 성공', formData)
    } else {
      console.log('회원가입 실패', errors)
    }
  }

  return (
    <div>
      <h3>Sign up</h3>
      <form onSubmit={onSubmit}>
        <div>
          {/* 닉네임 */}
          <label>solved.ac 닉네임</label>
          <input
            type='text'
            placeholder='닉네임 입력'
            value={formData.nickname}
            onChange={inputChange}
          />
          {errors.nickname && <p>{errors.nickname}</p>}
        </div>

        <div>
          <label>비밀번호</label>
          <input
            type={showPassword ? 'text' : ' password'}
            placeholder='영문, 숫자, 특수문자를 포함하여 입력해주세요(8자 이상)'
            value={formData.password}
            onChange={inputChange}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '숨기기' : '보이기'}          
          </button>
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div>
          <label className="block mb-1">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={formData.passwordConfirm}
            onChange={inputChange}
          />
          {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}
          <button>인증하기</button>
        </div>
        {/* type 미입력시 기본값 submit */}
        <button>완료</button> 
      </form>
    </div>
  );
};
export default Signup;
