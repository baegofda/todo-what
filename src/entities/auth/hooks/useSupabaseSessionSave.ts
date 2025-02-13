import toast from 'react-hot-toast';
import { MeProvider } from '@/entities/auth/model/types';
import { MeService } from '@/entities/auth/services/MeService.ts';
import useStore from '@/shared/hooks/useStore.ts';
import { useAuthStore } from '@/entities/auth/model/store';
import { Session } from '@supabase/supabase-js';

const useSupabaseSessionSave = () => {
  const { saveMe } = new MeService();
  const { store } = useStore(useAuthStore, (state) => state);

  const onSessionSave = async ({
    id,
    user_metadata,
    provider = 'NONE',
  }: Pick<Session['user'], 'id' | 'user_metadata'> &
    Pick<Session['user']['app_metadata'], 'provider'>) => {
    try {
      if (store === undefined) {
        return;
      }

      const { setIsLoggedIn, setProvider } = store;

      const {
        email,
        user_name: userName,
        avatar_url: avatarUrl,
      } = user_metadata;

      saveMe({
        id,
        provider: provider as MeProvider,
        identifier: email,
        avatarUrl,
        userName,
      });

      setIsLoggedIn({ isLoggedIn: true });
      setProvider({ provider: provider as MeProvider });
    } catch (e) {
      console.error(e);
      toast.error('로그인 실패');
    }
  };

  return { onSessionSave };
};

export default useSupabaseSessionSave;
