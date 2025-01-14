const AuthModal = () => {
  return (
    <div>
      <form action=''>
        <div>
          <p>암호화 키</p>
          {/* 기본값: 암호화 키 안보임, 토글로 보이기/숨김 전환 */}
          <input type='text' />
        </div>
        <div>
          <p>인증방법 설명</p>
          <img src='' alt='solved.ac 이미지' />
        </div>
      </form>
      <a href='solved.ac'>
        {/* 새 창으로 열리기 */}
        <button>solved.ac 바로가기</button>
      </a>
      <button>인증확인</button>
    </div>
  );
};
export default AuthModal;
