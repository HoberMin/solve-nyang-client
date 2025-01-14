const Login = () => {
  return (
    <div>
      <h3>Login</h3>
      <form>
        <label>solved.ac 닉네임</label>
        <input type='text' />

        {/* placeholder를 사용할거면 p태그는 없어도 되지 않을까 */}
        <label>비밀번호</label>
        <input type='password' placeholder='비밀번호를 입력하세요' />
      </form>
    </div>
  );
};
export default Login;