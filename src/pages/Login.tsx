const Login = () => {
  return (
    <div>
      <form>
        <p>solved.ac 닉네임</p>
        <input type='text' />

        {/* placeholder를 사용할거면 p태그는 없어도 되지 않을까 */}
        <p>비밀번호</p>
        <input type='password' placeholder='비밀번호를 입력하세요' />
      </form>
    </div>
  );
};
export default Login;
