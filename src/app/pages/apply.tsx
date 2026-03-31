import { useState } from 'react';
import { TabBar } from '../components/tab-bar';
import { ApplyModal } from '../components/apply-modal';
import { Bell, Mail, Sparkles } from 'lucide-react';
import { COLORS } from '../constants/design';

/**
 * 사전 신청 페이지 컴포넌트
 * 서비스 오픈 알림 신청 기능 제공
 */
export default function Apply() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div 
      className="min-h-screen relative overflow-hidden pt-16 md:pt-20"
      style={{
        background: `linear-gradient(to bottom right, ${COLORS.offWhite}, white, ${COLORS.offWhite})`
      }}
    >
      <TabBar />

      {/* Decorative Background Elements */}
      <div 
        className="absolute top-20 right-0 w-80 h-80 md:w-[600px] md:h-[600px] rounded-full blur-3xl"
        style={{ backgroundColor: `${COLORS.gold}1A` }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 md:w-[700px] md:h-[700px] rounded-full blur-3xl"
        style={{ backgroundColor: `${COLORS.navy}0D` }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 30px 30px, ${COLORS.gold} 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}
      ></div>

      <div className="flex flex-col items-center justify-center px-6 md:px-12 py-16 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] relative z-10">
        {/* Icon with decoration */}
        <div className="relative mb-8">
          <div 
            className="absolute inset-0 rounded-full blur-xl"
            style={{ backgroundColor: `${COLORS.gold}33` }}
          ></div>
          <div className="relative bg-white rounded-full p-6 md:p-8 shadow-lg border border-gray-100">
            <Bell className="w-12 h-12 md:w-16 md:h-16" style={{ color: COLORS.gold }} />
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl mb-4 text-center font-bold" style={{ color: COLORS.navy }}>
          사전 신청
        </h1>

        <p className="text-base md:text-xl mb-8 md:mb-12 text-gray-600 text-center max-w-sm md:max-w-2xl leading-relaxed">
          현재 소수 인원 대상 사전 운영 중입니다
        </p>

        {/* Feature Cards */}
        <div className="w-full max-w-md md:max-w-4xl space-y-4 mb-10 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-5 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div 
                className="rounded-lg p-3 md:p-4"
                style={{ backgroundColor: `${COLORS.gold}1A` }}
              >
                <Mail className="w-5 h-5 md:w-6 md:h-6" style={{ color: COLORS.gold }} />
              </div>
              <div className="flex-1">
                <h3 className="text-base md:text-xl mb-1 md:mb-2 font-semibold" style={{ color: COLORS.navy }}>
                  서비스 오픈 알림
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  정식 서비스가 오픈되면 가장 먼저 알려드립니다
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-5 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div 
                className="rounded-lg p-3 md:p-4"
                style={{ backgroundColor: `${COLORS.gold}1A` }}
              >
                <Sparkles className="w-5 h-5 md:w-6 md:h-6" style={{ color: COLORS.gold }} />
              </div>
              <div className="flex-1">
                <h3 className="text-base md:text-xl mb-1 md:mb-2 font-semibold" style={{ color: COLORS.navy }}>
                  얼리버드 혜택
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  사전 신청자에게만 제공되는 특별 혜택을 받으세요
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-4 md:px-14 md:py-5 md:text-lg border-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          style={{ 
            borderColor: COLORS.gold,
            color: COLORS.gold
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = COLORS.gold;
            e.currentTarget.style.color = COLORS.white;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = COLORS.gold;
          }}
        >
          지금 신청하기
        </button>

        <p className="text-xs md:text-sm text-gray-500 mt-6 text-center max-w-xs md:max-w-md">
          입력하신 정보는 서비스 안내 목적으로만 사용됩니다
        </p>
      </div>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}