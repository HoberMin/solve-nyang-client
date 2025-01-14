const Signup = () => {
  return (
    <div>
      <h3>Sign up</h3>
      <form>
        <p>solved.ac 닉네임</p>
        <input type='text' placeholder='닉네임 입력' />
        <p>비밀번호</p>
        <input type='password' placeholder='8자 이상 입력' />
        <p>비밀번호 확인</p>
        <input type='password' placeholder='비밀번호 확인' />
        {/* button으로 하는게 나을까 input일까 */}
        <input type='submit' value='인증하기' />
      </form>
      <button>완료</button>
    </div>
  );
};
export default Signup;
