import { Route, Routes } from 'react-router-dom';

import HomeContainer from '@/pages/home/ui/HomeContainer.tsx';
import LoginContainer from '@/pages/login/ui/LoginContainer.tsx';
import AuthGuard from '@/app/routes/ui/AuthGuard.tsx';
import { useSupabaseSessionEffect } from '@/entities/auth/hooks/useSupabaseSessionEffect.ts';
import AuthCallback from '@/pages/auth/AuthCallback.tsx';
import RootContainer from '@/widgets/RootContainer.tsx';
import Header from '@/widgets/Header.tsx';
import Footer from '@/widgets/Footer.tsx';

function App() {
  useSupabaseSessionEffect();

  const layout = (
    <>
      <Header />
      <RootContainer />
      <Footer />
    </>
  );
  return (
    <Routes>
      <Route element={layout}>
        <Route element={<AuthGuard />}>
          <Route path="/" element={<HomeContainer />} />
        </Route>
      </Route>

      <Route path="login" element={<LoginContainer />} />
      <Route path="auth">
        <Route path="callback" element={<AuthCallback />} />
      </Route>

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
