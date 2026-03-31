import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { COLORS, GRADIENTS } from '../constants/design';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 사전 신청 모달 컴포넌트
 * 이름, 이메일 입력 및 개인정보 수집 동의 기능 포함
 */
export function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !agreed) return;

    setIsLoading(true);
    try {
      await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
    } catch {
      // 이메일 전송 실패해도 신청은 완료 처리
    } finally {
      setIsLoading(false);
      alert('신청이 완료되었습니다!');
      setName('');
      setEmail('');
      setAgreed(false);
      setPrivacyOpen(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-md md:max-w-lg w-full p-6 md:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8" style={{ color: COLORS.navy }}>
          사전 신청
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-gray-700 md:text-lg font-medium">
              이름
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="w-full px-4 py-2 md:px-5 md:py-3 md:text-lg border border-gray-300 rounded focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': COLORS.gold } as React.CSSProperties}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-gray-700 md:text-lg font-medium">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-2 md:px-5 md:py-3 md:text-lg border border-gray-300 rounded focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': COLORS.gold } as React.CSSProperties}
              required
            />
          </div>

          {/* 개인정보 수집 동의 */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 md:gap-3">
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 md:w-5 md:h-5 border-gray-300 rounded shrink-0"
                style={{ accentColor: COLORS.gold }}
                required
              />
              <button
                type="button"
                onClick={() => setPrivacyOpen((prev) => !prev)}
                className="flex items-center gap-1 text-sm md:text-base text-gray-700 transition-colors text-left"
                style={{} as React.CSSProperties}
              >
                <span className="underline underline-offset-2 decoration-dotted">
                  개인정보 수집 및 이용에 동의합니다
                </span>
                {privacyOpen
                  ? <ChevronUp className="w-4 h-4 shrink-0 text-gray-400" />
                  : <ChevronDown className="w-4 h-4 shrink-0 text-gray-400" />
                }
              </button>
            </div>

            {/* 개인정보 처리방침 상세 */}
            {privacyOpen && (
              <div className="ml-6 md:ml-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs md:text-sm text-gray-600 space-y-3 leading-relaxed">
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                  개인정보 수집 및 이용 동의
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">수집 및 이용 목적</span>
                    <p className="mt-0.5">신규 서비스 런칭 알림 발송</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">수집하는 항목</span>
                    <p className="mt-0.5">이름, 이메일 주소</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">보유 및 이용 기간</span>
                    <p className="mt-0.5">서비스 런칭 안내 발송 완료 후 지체 없이 파기</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">동의 거부 권리 및 불이익</span>
                    <p className="mt-0.5">
                      귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 수 있습니다. 단, 동의를 거부하실 경우 서비스 런칭 안내를 받으실 수 없습니다.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 md:py-4 md:text-lg text-white rounded font-semibold transition-colors shadow-md hover:shadow-lg disabled:opacity-60"
            style={{ backgroundColor: COLORS.gold }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = GRADIENTS.goldHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.gold)}
          >
            {isLoading ? '처리 중...' : '제출하기'}
          </button>
        </form>
      </div>
    </div>
  );
}