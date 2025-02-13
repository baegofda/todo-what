import { useNavigate } from 'react-router';
import { useEffect } from 'react';

import { ANONYMOUS_ME } from '@/entities/auth/consts';
import useStore from '@/shared/hooks/useStore.ts';
import { useAuthStore } from '@/entities/auth/model/store';
import useSupabaseSessionSave from '@/entities/auth/hooks/useSupabaseSessionSave.ts';
import { supabase } from '@/app/supabase/config';
import LoadingSpinner from '@/widgets/LoadingSpinner.tsx';

const AuthCallback = () => {
  const { store } = useStore(useAuthStore, (state) => state);
  const navigate = useNavigate();
  const { onSessionSave } = useSupabaseSessionSave();

  const saveSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      const { session } = data;

      if (error || session === null) {
        throw error;
      }

      const {
        id,
        app_metadata: { provider },
        user_metadata,
      } = session['user'];

      await onSessionSave({ id, user_metadata, provider });
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!store || store['provider'] === ANONYMOUS_ME['provider']) {
      return;
    }

    saveSession();
  }, [store]);

  return (
    <div className={'flex gap-x-1'}>
      로그인 중... <LoadingSpinner />
    </div>
  );
};

export default AuthCallback;
