'use client';
import { Column, Heading, Loading } from '@umami/react-zen';
import { createContext, type ReactNode } from 'react';
import { useWebsiteQuery } from '@/components/hooks/queries/useWebsiteQuery';
import type { Website } from '@/generated/prisma/client';

export const WebsiteContext = createContext<Website>(null);

export function WebsiteProvider({
  websiteId,
  children,
}: {
  websiteId: string;
  children: ReactNode;
}) {
  const { data: website, isFetching, isLoading, error } = useWebsiteQuery(websiteId);

  if (error) {
    return (
      <Column
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        role="alert"
      >
        <Heading>Website not found</Heading>
      </Column>
    );
  }

  if (isFetching && isLoading) {
    return <Loading placement="absolute" />;
  }

  if (!website) {
    return <Loading placement="absolute" />;
  }

  return <WebsiteContext.Provider value={website}>{children}</WebsiteContext.Provider>;
}
