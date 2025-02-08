import { Me } from '../model/types';

export const ME_COOKIE_NAMES = {
  ME: 'me',
};

export const ANONYMOUS_ME: Me = {
  provider: 'anonymous',
  id: 'anonymous',
  identifier: 'anonymous',
  avatarUrl: '',
  userName: 'anonymous',
};
