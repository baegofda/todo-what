import { AuthService } from '@/entities/auth/services/AuthService.ts';

const LoginContainer = () => {
  const { signIn } = new AuthService();

  return (
    <div>
      <button
        type={'button'}
        className={'cursor-pointer text-yellow-300'}
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
