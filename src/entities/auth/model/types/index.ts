import { Session } from '@supabase/supabase-js';
import { Provider } from '@supabase/auth-js/src/lib/types.ts';

export type MeProvider = Provider | 'anonymous';

export interface Me extends Pick<Session['user'], 'id'> {
  identifier: string;
  provider: MeProvider;
  userName: Session['user']['user_metadata']['user_name'];
  avatarUrl: Session['user']['user_metadata']['avatar_url'];
}
