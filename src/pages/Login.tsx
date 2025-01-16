const Login = () => {
  return (
    <div>
      <h3>Login</h3>
      <form>
        <label>solved.ac 닉네임</label>
        <input type='text' />

        <label>비밀번호</label>
        <input type='password' placeholder='비밀번호를 입력하세요' />
        <button>로그인</button>
      </form>
      <div>
        <p>계정이 없으신가요?</p>
        <a href='/signup'>회원가입</a>
      </div>
    </div>
  );
};
export default Login;
