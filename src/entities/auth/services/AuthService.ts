import { Provider } from '@supabase/auth-js/src/lib/types.ts';

import { SupabaseAuthService } from '@/entities/auth/services/SupabaseAuthService.ts';
import { Me } from '@/entities/auth/model/types';
import { MeService } from '@/entities/auth/services/MeService.ts';
import { ANONYMOUS_ME } from '@/entities/auth/consts';

export class AuthService {
  private readonly meService = new MeService();
  private readonly supabaseAuthService = new SupabaseAuthService();

  signIn = async ({ provider }: Pick<Me, 'provider'>) => {
    if (provider !== ANONYMOUS_ME['provider']) {
      await this.supabaseAuthService.signIn({ provider: provider as Provider });

      return;
    }

    this.meService.saveMe(ANONYMOUS_ME);
  };

  signOut = async ({ provider }: Pick<Me, 'provider'>) => {
    if (provider !== ANONYMOUS_ME['provider']) {
      await this.supabaseAuthService.signOut();
    }

    return this.meService.removeMe();
  };
}
