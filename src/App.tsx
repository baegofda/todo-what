import { useSupabaseSessionEffect } from '@/entities/auth/hooks/useSupabaseSessionEffect.ts';
import { AuthService } from '@/entities/auth/services/AuthService.ts';
import useStore from '@/shared/hooks/useStore.ts';
import { uesAuthStore } from '@/entities/auth/model/store';

function App() {
  const { signIn, signOut } = new AuthService();
  const { isLoadingStore: isLoadingAuthStore, store } = useStore(
    uesAuthStore,
    (state) => state,
  );

  useSupabaseSessionEffect();

  if (isLoadingAuthStore || !store) {
    return null;
  }

  const { isLoggedIn } = store;

  if (!isLoggedIn) {
    return (
      <button onClick={() => signIn({ provider: 'kakao' })}>로그인</button>
    );
  } else {
    return (
      <button onClick={() => signOut({ provider: 'kakao' })}>로그아웃</button>
    );
  }
}

export default App;
