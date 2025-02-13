import { Navigate, Outlet } from 'react-router-dom';

import useStore from '@/shared/hooks/useStore.ts';
import { useAuthStore } from '@/entities/auth/model/store';
import LoadingSpinner from '@/widgets/LoadingSpinner.tsx';

const AuthGuard = () => {
  const { isLoadingStore: isLoadingAuthStore, store } = useStore(
    useAuthStore,
    (state) => state,
  );
  const { isLoggedIn = false } = store ?? {};

  if (isLoadingAuthStore || !store) {
    return <LoadingSpinner />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
