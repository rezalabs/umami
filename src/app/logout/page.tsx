import type { Metadata } from 'next';
import { LogoutPage } from './LogoutPage';

export default function () {
  if (process.env.DISABLE_LOGIN) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Logout is disabled</div>;
  }

  if (process.env.CLOUD_MODE) {
    return null;
  }

  return <LogoutPage />;
}

export const metadata: Metadata = {
  title: 'Logout',
};
