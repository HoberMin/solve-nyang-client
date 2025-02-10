import { lazy } from 'react';

export const Pages = {
  AuctionPage: lazy(() => import('./auction')),
  BackgroundSalePage: lazy(() => import('./background')),
  ChangePasswordPage: lazy(() => import('./changePassword')),
  ContestPage: lazy(() => import('./contest')),
  ExtensionPage: lazy(() => import('./extension')),
  FindPasswordPage: lazy(() => import('./findPassword')),
  GachaPage: lazy(() => import('./gacha')),
  LoginPage: lazy(() => import('./login')),
  AvatarImagePage: lazy(() => import('./myAvatarImage')),
  NotFoundPage: lazy(() => import('./notFound')),
  ProfilePage: lazy(() => import('./profile')),
  SalePage: lazy(() => import('./sale')),
  ServicePage: lazy(() => import('./service')),
  SignupPage: lazy(() => import('./signup')),
} as const;
