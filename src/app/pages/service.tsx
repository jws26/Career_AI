import { useRef, useEffect, useState, Fragment } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { TabBar } from '../components/tab-bar';
import { motion } from 'motion/react';
import { COLORS } from '../constants/design';
import { fadeUp, fadeIn, slideLeft, scaleUp } from '../constants/animations';

/**
 * 서비스 소개 페이지 컴포넌트
 * 3개의 풀스크린 섹션으로 구성된 스냅 스크롤 페이지
 * - 섹션 1: 문제 제기
 * - 섹션 2: 서비스 설명
 * - 섹션 3: 해결 예시 (인터랙티브 진단)
 */
export default function Service() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAfter, setShowAfter] = useState(false);
  const [activeCorrection, setActiveCorrection] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.style.scrollSnapType = 'y mandatory';
    container.style.overflowY = 'scroll';
    container.style.height = '100vh';

    const sections = container.querySelectorAll('.snap-section');
    sections.forEach((section) => {
      (section as HTMLElement).style.scrollSnapAlign = 'start';
    });
  }, []);

  const viewportRoot = { root: containerRef, once: true, amount: 0.3 };

  return (
    <>
      <TabBar />
      <div ref={containerRef} className="h-screen overflow-y-scroll pt-16 md:pt-20">

        {/* ────────────────────────────────────────────────────── */}
        {/* 섹션 1: 문제 제기 */}
        {/* ────────────────────────────────────────────────────── */}
        <section 
          className="snap-section min-h-screen flex flex-col items-center justify-center px-6 md:px-12 text-white relative overflow-hidden"
          style={{ backgroundColor: COLORS.navy }}
        >
          {/* Background animations */}
          <motion.div
            className="absolute top-20 right-10 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl"
            style={{ backgroundColor: COLORS.gold, opacity: 0.1 }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-80 h-80 md:w-[500px] md:h-[500px] bg-blue-500 rounded-full blur-3xl opacity-10"
            animate={{ scale: [1, 1.12, 1], opacity: [0.07, 0.13, 0.07] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div className="relative z-10 max-w-4xl w-full">
            <motion.p
              className="text-sm md:text-base mb-4 tracking-wide text-center font-medium"
              style={{ color: COLORS.gold }}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRoot}
              custom={0}
            >
              문제 제기
            </motion.p>

            <motion.h2
              className="text-3xl md:text-5xl mb-12 text-center leading-tight font-bold"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRoot}
              custom={0.1}
            >
              스펙은 쌓는데,<br />방향이 없습니다
            </motion.h2>

            <div className="w-full max-w-md md:max-w-2xl mx-auto mb-12 space-y-5 md:space-y-0 md:flex md:flex-col md:items-start md:gap-0">
              {[
                { number: '01', text: '뭘 더 해야 할지 모르겠어요', dir: -60 },
                { number: '02', text: '이 정도면 충분한지 모르겠어요', dir: 0 },
                { number: '03', text: '지원할 때마다 방향이 달라요', dir: 60 },
              ].map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: item.dir, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={viewportRoot}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 + index * 0.15 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`w-full md:w-2/3 bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-7 border border-white/20 cursor-default ${
                    index === 0 ? 'md:self-start md:mb-4' :
                    index === 1 ? 'md:self-center md:mb-4' :
                    'md:self-end'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span 
                      className="text-2xl md:text-3xl font-bold shrink-0"
                      style={{ color: COLORS.gold }}
                    >
                      {item.number}
                    </span>
                    <p className="md:text-base">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex justify-center"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRoot}
              custom={0.7}
            >
              <ChevronDown 
                className="w-6 h-6 md:w-8 md:h-8 animate-bounce"
                style={{ color: COLORS.gold }}
              />
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/* 섹션 2: 서비스 설명 */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="snap-section min-h-screen bg-white flex flex-col items-center justify-center px-6 md:px-12 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, #f0f0f0 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }} />
          <div 
            className="absolute top-0 left-0 right-0 h-40"
            style={{ background: `linear-gradient(to bottom, ${COLORS.offWhite}, transparent)` }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-40"
            style={{ background: `linear-gradient(to top, ${COLORS.offWhite}, transparent)` }}
          />

          <div className="relative z-10 max-w-4xl w-full">
            <motion.p
              className="text-sm md:text-base mb-4 tracking-wide text-center font-medium"
              style={{ color: COLORS.gold }}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRoot}
              custom={0}
            >
              서비스 설명
            </motion.p>

            <motion.h2
              className="text-3xl md:text-5xl mb-12 text-center leading-tight font-bold"
              style={{ color: COLORS.navy }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRoot}
              custom={0.1}
            >
              커리어설계소는 이렇게 작동합니다
            </motion.h2>

            <div className="w-full max-w-md md:max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
              {[
                { step: 'STEP 01', title: '활동 입력', desc: '당신의 경험과 활동을 입력하세요' },
                { step: 'STEP 02', title: 'AI 분석', desc: 'AI가 스펙과 방향성을 분석합니다' },
                { step: 'STEP 03', title: '전략 수립', desc: '맞춤형 취업 전략을 제공합니다' },
              ].map((item, index) => (
                <Fragment key={item.step}>
                  <motion.div
                    className="flex-1"
                    variants={slideLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportRoot}
                    custom={0.15 + index * 0.18}
                    whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
                  >
                    <div className="bg-white/80 backdrop-blur-sm p-5 md:p-8 rounded-lg shadow-sm transition-shadow h-full">
                      <p 
                        className="text-xs md:text-sm mb-2 font-semibold"
                        style={{ color: COLORS.gold }}
                      >
                        {item.step}
                      </p>
                      <h3 
                        className="text-xl md:text-2xl mb-1 font-bold"
                        style={{ color: COLORS.navy }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>

                  {index < 2 && (
                    <motion.div
                      className="flex justify-center items-center shrink-0 md:mx-3"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={viewportRoot}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.18 }}
                    >
                      <ArrowRight 
                        className="w-5 h-5 md:w-6 md:h-6 rotate-90 md:rotate-0"
                        style={{ color: COLORS.gold }}
                      />
                    </motion.div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/* 섹션 3: 해결 예시 (인터랙티브 진단) */}
        {/* ────────────────────────────────────────────────────── */}
        <section 
          className="snap-section min-h-screen flex flex-col items-center justify-center px-6 md:px-12 relative overflow-hidden"
          style={{ backgroundColor: COLORS.offWhite }}
        >
          <motion.div
            className="absolute top-10 right-0 w-40 h-40 md:w-80 md:h-80 rounded-full blur-2xl"
            style={{ backgroundColor: `${COLORS.gold}33` }}
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 left-0 w-60 h-60 md:w-96 md:h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `${COLORS.navy}1A` }}
            animate={{ y: [0, 16, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          <div className="relative z-10 max-w-4xl w-full">
            <motion.p
              className="text-sm md:text-base mb-4 tracking-wide text-center font-medium"
              style={{ color: COLORS.gold }}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRoot}
              custom={0}
            >
              해결 예시
            </motion.p>

            <motion.h2
              className="text-2xl md:text-4xl mb-6 text-center leading-tight font-bold"
              style={{ color: COLORS.navy }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRoot}
              custom={0.1}
            >
              AI가 부족한 활동을<br className="md:hidden" /> 짚어드립니다
            </motion.h2>

            {/* Tab Toggle Buttons */}
            <motion.div
              className="flex justify-center mb-5"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRoot}
              custom={0.2}
            >
              <div className="flex rounded-xl overflow-hidden border border-gray-200 shadow-sm text-sm font-medium">
                <button
                  onClick={() => setShowAfter(false)}
                  className={`px-6 py-2.5 transition-colors ${!showAfter ? 'text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  style={!showAfter ? { backgroundColor: COLORS.navy } : {}}
                >
                  진단
                </button>
                <button
                  onClick={() => { setShowAfter(true); setActiveCorrection(null); }}
                  className={`px-6 py-2.5 transition-colors ${showAfter ? 'text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  style={showAfter ? { backgroundColor: COLORS.gold } : {}}
                >
                  추천 활동
                </button>
              </div>
            </motion.div>

            {/* Analysis Card */}
            <motion.div
              className="w-full max-w-md md:max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl mb-4"
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRoot}
              custom={0.28}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <p className="text-xs text-gray-400">활동 프로필 · AI 진단</p>
                <div className="w-24" />
              </div>

              <div className="p-5 md:p-7">
                {!showAfter ? (
                  <DiagnosisView 
                    activeCorrection={activeCorrection}
                    setActiveCorrection={setActiveCorrection}
                  />
                ) : (
                  <RecommendationView />
                )}
              </div>
            </motion.div>

            <motion.p
              className="text-xs md:text-sm text-gray-400 text-center"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRoot}
              custom={0.5}
            >
              * 위 내용은 샘플입니다
            </motion.p>
          </div>
        </section>
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────── */
/* 진단 뷰 컴포넌트 */
/* ────────────────────────────────────────────────────── */
interface DiagnosisViewProps {
  activeCorrection: number | null;
  setActiveCorrection: (index: number | null) => void;
}

function DiagnosisView({ activeCorrection, setActiveCorrection }: DiagnosisViewProps) {
  const corrections = [
    {
      title: '🔴 실무 경험이 없습니다',
      description: '인턴십 경험 없이는 직무 적합성을 어필하기 어렵습니다. 지원 직군의 실무를 직접 경험한 이력이 필요합니다.',
      recommendation: '마케팅 에이전시 또는 스타트업 단기 인턴십 지원 (3개월 이상 권장)',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: '#dc2626',
    },
    {
      title: '🟡 직무 역량을 증빙할 자격증이 없습니다',
      description: '자격증이 없으면 채용 담당자에게 기술 수준을 객관적으로 증명하기 어렵습니다.',
      recommendation: 'Google 애널리틱스(GAIQ) · Google Ads 자격증을 2개월 내 취득 목표로 설정',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: '#d97706',
    },
    {
      title: '🟠 구체적인 성과물이 없습니다',
      description: '공모전 수상 이력이나 포트폴리오가 없으면 실력을 직접 보여줄 수단이 부족합니다.',
      recommendation: '브랜드 공모전 1회 참여 + 개인 SNS 포트폴리오 계정 운영 시작',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: '#ea580c',
    },
  ];

  return (
    <div>
      <p className="text-[10px] md:text-xs text-gray-400 mb-3 flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300" />
        사용자 입력 · 활동 기술
      </p>

      <p className="text-sm md:text-base text-gray-800 leading-9 md:leading-10">
        마케팅 동아리 1개와 대외활동 2곳에서 SNS 콘텐츠 제작을 경험했습니다.{' '}
        <span
          className={`relative inline cursor-pointer transition-all px-1.5 py-0.5 rounded-md ${activeCorrection === 0 ? 'bg-red-200 text-red-800' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
          onClick={() => setActiveCorrection(activeCorrection === 0 ? null : 0)}
        >
          인턴 경험은 아직 없고
          <span className="absolute -top-5 left-0 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded whitespace-nowrap">
            ⚠ 실무 경험 없음
          </span>
        </span>
        ,{' '}
        <span
          className={`relative inline cursor-pointer transition-all px-1.5 py-0.5 rounded-md ${activeCorrection === 1 ? 'bg-amber-200 text-amber-800' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
          onClick={() => setActiveCorrection(activeCorrection === 1 ? null : 1)}
        >
          관련 자격증도 없는 상태
          <span className="absolute -top-5 left-0 text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded whitespace-nowrap">
            ⚠ 역량 증빙 부재
          </span>
        </span>
        입니다.{' '}
        <span
          className={`relative inline cursor-pointer transition-all px-1.5 py-0.5 rounded-md ${activeCorrection === 2 ? 'bg-orange-200 text-orange-800' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
          onClick={() => setActiveCorrection(activeCorrection === 2 ? null : 2)}
        >
          공모전이나 포트폴리오는 아직 준비하지 못했습니다
          <span className="absolute -top-5 left-0 text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded whitespace-nowrap">
            ⚠ 실적 포트폴리오 없음
          </span>
        </span>
        .
      </p>

      {activeCorrection !== null ? (
        <motion.div
          key={activeCorrection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`mt-5 p-4 rounded-xl border ${corrections[activeCorrection].bgColor} ${corrections[activeCorrection].borderColor}`}
        >
          <p
            className="text-xs font-semibold mb-1.5"
            style={{ color: corrections[activeCorrection].textColor }}
          >
            {corrections[activeCorrection].title}
          </p>
          <p className="text-gray-600 text-xs md:text-sm mb-3">
            {corrections[activeCorrection].description}
          </p>
          <div className="flex items-start gap-2 bg-white rounded-lg p-3 border border-current/10">
            <span 
              className="text-xs font-bold mt-0.5 shrink-0"
              style={{ color: COLORS.gold }}
            >
              추천 →
            </span>
            <p className="text-xs md:text-sm" style={{ color: COLORS.navy }}>
              {corrections[activeCorrection].recommendation}
            </p>
          </div>
        </motion.div>
      ) : (
        <p className="mt-4 text-xs text-gray-400 text-center">
          색깔 부분을 눌러 부족한 활동을 확인해보세요
        </p>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/* 추천 활동 뷰 컴포넌트 */
/* ────────────────────────────────────────────────────── */
function RecommendationView() {
  const recommendations = [
    { 
      priority: '우선순위 1', 
      tag: '실무 경험', 
      color: 'red', 
      title: '마케팅 인턴십', 
      desc: '에이전시·스타트업 단기 인턴 지원, 3개월 이상 권장', 
      impact: '합격률 +40%' 
    },
    { 
      priority: '우선순위 2', 
      tag: '역량 증빙', 
      color: 'amber', 
      title: 'Google 애널리틱스(GAIQ) 자격증', 
      desc: '온라인 무료 취득 가능 · 목표 기간 2개월', 
      impact: '서류 통과율 +25%' 
    },
    { 
      priority: '우선순위 3', 
      tag: '포트폴리오', 
      color: 'orange', 
      title: '브랜드 공모전 + 개인 SNS 계정', 
      desc: '공모전 수상 이력 또는 운영 성과 수치화', 
      impact: '면접 전환율 +30%' 
    },
  ];

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-[10px] md:text-xs text-gray-400 mb-4 flex items-center gap-1.5">
        <span 
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: COLORS.gold }}
        />
        AI 분석 결과 · 추가해야 할 활동 3가지
      </p>

      {recommendations.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className={`flex items-start gap-4 p-4 rounded-xl border ${
            item.color === 'red' ? 'bg-red-50 border-red-200' :
            item.color === 'amber' ? 'bg-amber-50 border-amber-200' :
            'bg-orange-50 border-orange-200'
          }`}
        >
          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
            item.color === 'red' ? 'bg-red-500' :
            item.color === 'amber' ? 'bg-amber-500' :
            'bg-orange-500'
          }`}>
            {item.priority.slice(-1)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                item.color === 'red' ? 'bg-red-200 text-red-700' :
                item.color === 'amber' ? 'bg-amber-200 text-amber-700' :
                'bg-orange-200 text-orange-700'
              }`}>
                {item.tag}
              </span>
              <p 
                className="text-xs md:text-sm font-semibold"
                style={{ color: COLORS.navy }}
              >
                {item.title}
              </p>
            </div>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
          <span 
            className="shrink-0 text-[10px] bg-white border rounded-full px-2 py-1 font-semibold"
            style={{ 
              color: COLORS.navy,
              borderColor: `${COLORS.navy}33`
            }}
          >
            {item.impact}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
