import { Provider } from '@supabase/auth-js/src/lib/types.ts';

import { supabase } from '@/app/supabase/config';

export class SupabaseAuthService {
  signIn = async ({ provider }: { provider: Provider }) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) {
      throw error;
    }
  };

  signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  };
}
