/**
 * 커리어설계소 디자인 시스템
 * 브랜드 컬러 및 디자인 토큰 정의
 */

export const COLORS = {
  navy: '#0f2144',
  gold: '#c8a96e',
  offWhite: '#f8f7f4',
  white: '#ffffff',
} as const;

export const GRADIENTS = {
  goldHover: '#b89860',
} as const;

export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
} as const;

export const ROUTES = {
  home: '/',
  service: '/service',
  apply: '/apply',
  chat: '/chat',
} as const;
