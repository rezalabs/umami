import type { Metadata } from 'next';
import { LoginPage } from './LoginPage';

export default async function () {
  if (process.env.DISABLE_LOGIN) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Login is disabled</div>;
  }

  if (process.env.CLOUD_MODE) {
    const { redirect } = await import('next/navigation');

    redirect(process.env.cloudUrl ? `${process.env.cloudUrl}/login` : '/');
  }

  return <LoginPage />;
}

export const metadata: Metadata = {
  title: 'Login',
};
