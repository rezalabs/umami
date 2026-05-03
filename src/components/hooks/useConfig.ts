import { useEffect } from 'react';
import { useApi } from '@/components/hooks/useApi';
import { setConfig, useApp } from '@/store/app';
import debug from 'debug';

const log = debug('umami:useConfig');

export type Config = {
  cloudMode: boolean;
  faviconUrl?: string;
  linksUrl?: string;
  pixelsUrl?: string;
  privateMode: boolean;
  telemetryDisabled: boolean;
  trackerScriptName?: string;
  updatesDisabled: boolean;
};

export function useConfig(): Config {
  const { config } = useApp();
  const { get } = useApi();

  async function loadConfig() {
    try {
      const data = await get(`/config`);

      setConfig(data);
    } catch (e) {
      log('Failed to load config', e);
    }
  }

  useEffect(() => {
    if (!config) {
      loadConfig();
    }
  }, []);

  return config;
}
