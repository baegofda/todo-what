import { useEffect } from 'react';

import useStore from '@/shared/hooks/useStore.ts';
import { supabase } from '@/app/supabase/config';
import { ANONYMOUS_ME } from '@/entities/auth/consts';
import { useAuthStore } from '@/entities/auth/model/store';
import { MeService } from '@/entities/auth/services/MeService.ts';
import useSupabaseSessionSave from '@/entities/auth/hooks/useSupabaseSessionSave.ts';

export const useSupabaseSessionEffect = () => {
  const { removeMe } = new MeService();
  const { store } = useStore(useAuthStore, (state) => state);
  const { onSessionSave } = useSupabaseSessionSave();

  useEffect(() => {
    if (!store || store['provider'] === ANONYMOUS_ME['provider']) {
      return;
    }

    const { reset } = store;

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
        const {
          id,
          app_metadata: { provider },
          user_metadata,
        } = session['user'];

        onSessionSave({ id, user_metadata, provider });
      }

      if (
        authChangeEvent === 'SIGNED_OUT' ||
        authChangeEvent === 'PASSWORD_RECOVERY'
      ) {
        removeMe();
        reset();
      }
    });

    return () => subscription.unsubscribe();
  }, [store]);
};
