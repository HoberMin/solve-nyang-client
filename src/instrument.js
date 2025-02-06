import { useEffect } from 'react';

import * as Sentry from '@sentry/react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

Sentry.init({
  dsn: 'https://048a2cf65bd2947d3186d0430a6d45e0@o4508772285349888.ingest.us.sentry.io/4508772286726144',
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      // v6 -> v7로 변경
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [/^\//, /^https:\/\/api\.solve-nyang\.com/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
