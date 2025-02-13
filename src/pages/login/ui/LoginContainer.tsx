import { AuthService } from '@/entities/auth/services/AuthService.ts';

const LoginContainer = () => {
  const { signIn } = new AuthService();

  return (
    <div>
      <button
        type={'button'}
        onClick={() => {
          signIn({ provider: 'kakao' });
        }}
      >
        카카오 로그인
      </button>
    </div>
  );
};

export default LoginContainer;
