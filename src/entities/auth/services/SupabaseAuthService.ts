import toast from 'react-hot-toast';
import { Provider } from '@supabase/auth-js/src/lib/types.ts';

import { supabase } from '@/app/supabase/config';

export class SupabaseAuthService {
  signIn = async ({ provider }: { provider: Provider }) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) {
      toast.error('로그인 실패');

      return;
    }
  };

  signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error('로그아웃 실패');

      return;
    }
  };
}
