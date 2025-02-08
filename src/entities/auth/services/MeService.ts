import { Cookies } from 'react-cookie';

import { Me } from '@/entities/auth/model/types';
import { ME_COOKIE_NAMES } from '@/entities/auth/consts';

export class MeService {
  private readonly cookies = new Cookies();

  get me(): Me | undefined {
    return this.cookies.get(ME_COOKIE_NAMES['ME']);
  }

  saveMe = ({ provider, id, identifier, userName, avatarUrl }: Me) => {
    this.cookies.set(ME_COOKIE_NAMES['ME'], {
      provider,
      id,
      identifier,
      userName,
      avatarUrl,
    });
  };

  removeMe = () => {
    this.cookies.remove(ME_COOKIE_NAMES['ME']);
  };
}
