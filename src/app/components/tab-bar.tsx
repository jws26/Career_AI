import { Home, Briefcase, FileText, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { COLORS, ROUTES } from '../constants/design';

/**
 * Careermap 로고 컴포넌트
 * 브랜드 아이덴티티를 나타내는 경로 형태의 SVG 로고
 */
function CareermapLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill={COLORS.gold} fillOpacity="0.15" />
      <path
        d="M6 22 Q10 14 16 16 Q22 18 26 10"
        stroke={COLORS.gold}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="6" cy="22" r="2.5" fill={COLORS.gold} />
      <circle cx="26" cy="10" r="3.5" fill={COLORS.gold} />
      <circle cx="26" cy="10" r="1.5" fill={COLORS.navy} />
      <circle cx="16" cy="16" r="2" fill="white" stroke={COLORS.gold} strokeWidth="1.5" />
    </svg>
  );
}

/**
 * 상단 탭 바 컴포넌트
 * 로고와 네비게이션 탭을 포함한 고정 헤더
 */
export function TabBar() {
  const location = useLocation();

  const tabs = [
    { path: ROUTES.home, icon: Home, label: '홈' },
    { path: ROUTES.service, icon: Briefcase, label: '서비스' },
    { path: ROUTES.apply, icon: FileText, label: '사전신청' },
    { path: ROUTES.chat, icon: MessageCircle, label: 'AI 상담' },
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-lg"
      style={{ backgroundColor: COLORS.navy }}
    >
      <div className="max-w-6xl mx-auto h-16 md:h-20 px-5 md:px-8 grid grid-cols-3 items-center">
        {/* Logo */}
        <Link to={ROUTES.home} className="flex items-center gap-2.5">
          <CareermapLogo />
          <div className="flex flex-col leading-tight">
            <span className="text-base md:text-xl font-bold text-white tracking-tight">
              Careermap
            </span>
            <span 
              className="text-[10px] md:text-xs hidden sm:block mt-0.5"
              style={{ color: COLORS.gold }}
            >
              AI 커리어 분석 서비스
            </span>
          </div>
        </Link>

        {/* Tab Navigation */}
        <nav className="flex items-center justify-center gap-1 md:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;

            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 rounded-lg text-sm md:text-base font-medium transition-all ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                style={isActive ? { backgroundColor: COLORS.gold } : {}}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right spacer */}
        <div />
      </div>
    </header>
  );
}