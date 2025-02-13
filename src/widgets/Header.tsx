import { AuthService } from '@/entities/auth/services/AuthService.ts';

const Header = () => {
  const { signOut } = new AuthService();

  return (
    <header className={'flex items-center gap-x-1'}>
      대충 헤더
      <button
        className={'border'}
        onClick={() => signOut({ provider: 'kakao' })}
      >
        로그아웃
      </button>
    </header>
  );
};

export default Header;
