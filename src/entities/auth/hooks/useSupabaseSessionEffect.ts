import { useEffect } from 'react';

import useStore from '@/shared/hooks/useStore.ts';
import { supabase } from '@/app/supabase/config';
import { ANONYMOUS_ME } from '@/entities/auth/consts';
import { uesAuthStore } from '@/entities/auth/model/store';
import { MeProvider } from '@/entities/auth/model/types';
import { MeService } from '@/entities/auth/services/MeService.ts';

export const useSupabaseSessionEffect = () => {
  const { saveMe, removeMe } = new MeService();
  const { isLoadingStore: isLoadingAuthStore, store } = useStore(
    uesAuthStore,
    (state) => state,
  );

  useEffect(() => {
    if (
      isLoadingAuthStore ||
      !store ||
      store['provider'] === ANONYMOUS_ME['provider']
    ) {
      return;
    }

    const { setIsLoggedIn, setProvider, reset } = store;

    // https://supabase.com/docs/reference/javascript/auth-onauthstatechange
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((authChangeEvent, session) => {
      if (
        session &&
        (authChangeEvent === 'SIGNED_IN' ||
          authChangeEvent === 'USER_UPDATED' ||
          authChangeEvent === 'TOKEN_REFRESHED')
      ) {
        const { id, app_metadata, user_metadata } = session['user'];
        const { provider = 'NONE' } = app_metadata;
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
        setProvider({ provider: provider as MeProvider });
        setIsLoggedIn({ isLoggedIn: true });
      }

      if (
        authChangeEvent === 'SIGNED_OUT' ||
        authChangeEvent === 'PASSWORD_RECOVERY'
      ) {
        reset();
        removeMe();
      }
    });

    return () => subscription.unsubscribe();
  }, [isLoadingAuthStore, store]);
};
