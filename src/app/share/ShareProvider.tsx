'use client';
import { useShareTokenQuery } from '@/components/hooks';
import { ENTITY_TYPE } from '@/lib/constants';
import type { WhiteLabel } from '@/lib/types';
import { Column, Heading, Loading } from '@umami/react-zen';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, type ReactNode, useEffect } from 'react';
import { getSharePath } from '@/lib/share';

export interface ShareData {
  shareId: string;
  slug: string;
  shareType: number;
  websiteId?: string;
  websiteIds?: string[];
  boardId?: string;
  pixelId?: string;
  linkId?: string;
  parameters: any;
  token: string;
  whiteLabel?: WhiteLabel;
}

export const ShareContext = createContext<ShareData>(null);

const ALL_SECTION_IDS = [
  'overview',
  'events',
  'sessions',
  'realtime',
  'performance',
  'compare',
  'breakdown',
  'goals',
  'funnels',
  'journeys',
  'retention',
  'utm',
  'revenue',
  'attribution',
];

export function ShareProvider({ slug, children }: { slug: string; children: ReactNode }) {
  const { share, isLoading, isFetching, error } = useShareTokenQuery(slug);
  const router = useRouter();
  const pathname = usePathname();
  const path = getSharePath(pathname);
  const isWebsiteShare = share?.shareType === ENTITY_TYPE.website;

  const allowedSections =
    isWebsiteShare && share?.parameters
      ? ALL_SECTION_IDS.filter(id => share.parameters[id] === true)
      : [];

  const shouldRedirect =
    isWebsiteShare &&
    allowedSections.length === 1 &&
    allowedSections[0] !== 'overview' &&
    (path === undefined || path === '' || path === 'overview');

  useEffect(() => {
    if (shouldRedirect) {
      router.replace(`/share/${slug}/${allowedSections[0]}`);
    }
  }, [shouldRedirect, slug, allowedSections, router]);

  if (error) {
    return (
      <Column
        width="100%"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        role="alert"
      >
        <Heading>Share not found</Heading>
      </Column>
    );
  }

  if (isFetching && isLoading) {
    return <Loading placement="absolute" />;
  }

  if (shouldRedirect) {
    return null;
  }

  if (!share) {
    return <Loading placement="absolute" />;
  }

  return <ShareContext.Provider value={{ ...share, slug }}>{children}</ShareContext.Provider>;
}
