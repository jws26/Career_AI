import { TabBar } from '../components/tab-bar';
import { useNavigate } from 'react-router';
import { COLORS, GRADIENTS, ROUTES } from '../constants/design';

/**
 * 홈 페이지 컴포넌트
 * 히어로 섹션과 CTA 버튼 포함
 */
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <TabBar />

      {/* Hero Section */}
      <div className="relative h-screen pt-14">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1762341114268-38fbe97e355d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBkZXNrfGVufDF8fHx8MTc3NDg1NTI5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center text-white md:px-12">
          <p 
            className="text-sm md:text-base mb-4 tracking-wide font-medium"
            style={{ color: COLORS.gold }}
          >
            AI 커리어 분석 서비스
          </p>

          <h1 className="text-4xl md:text-6xl mb-6 leading-tight font-bold">
            당신의 스펙,<br />방향이 맞는지 아세요?
          </h1>

          <p className="text-base md:text-xl mb-10 text-gray-200 max-w-sm md:max-w-2xl font-light">
            활동을 입력하면 AI가 취업전략을 세워드립니다
          </p>

          <button
            onClick={() => navigate(ROUTES.apply)}
            className="px-8 py-3 md:px-12 md:py-4 md:text-lg text-white rounded font-semibold transition-colors shadow-lg hover:shadow-xl"
            style={{ backgroundColor: COLORS.gold }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = GRADIENTS.goldHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.gold}
          >
            지금 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}