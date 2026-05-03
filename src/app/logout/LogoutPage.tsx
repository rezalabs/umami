'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useApi } from '@/components/hooks';
import { removeClientAuthToken } from '@/lib/client';
import { setUser } from '@/store/app';

export function LogoutPage() {
  const router = useRouter();
  const { post } = useApi();

  useEffect(() => {
    removeClientAuthToken();
    setUser(null);

    post('/auth/logout').catch(() => {
      // Server-side session cleanup is best-effort.
      // Local state is already cleared so logout proceeds regardless.
    });

    const loginUrl = `${process.env.basePath || ''}/login`;

    window.location.href = loginUrl;
  }, [router, post]);

  return null;
}
