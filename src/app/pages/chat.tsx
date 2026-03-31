import { useState, useRef, useEffect } from 'react';
import { TabBar } from '../components/tab-bar';
import { getClaudeResponse } from '../../services/claude';
import { COLORS } from '../constants/design';
import { Send } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'claude';
}

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMsg: Message = { text: message.trim(), sender: 'user' };
    setChatHistory(prev => [...prev, userMsg]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await getClaudeResponse(userMsg.text);
      setChatHistory(prev => [...prev, { text: response, sender: 'claude' }]);
    } catch {
      setChatHistory(prev => [...prev, { text: '오류가 발생했습니다. 다시 시도해주세요.', sender: 'claude' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.offWhite }}>
      <TabBar />

      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto pt-16 md:pt-20 pb-28 px-4">
        {chatHistory.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: `${COLORS.gold}22` }}>
              <span className="text-3xl">✨</span>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.navy }}>AI 커리어 상담</h2>
            <p className="text-gray-500 max-w-sm">
              궁금한 것을 물어보세요.<br />취업 전략, 스펙, 자소서 등 무엇이든 답해드립니다.
            </p>
          </div>
        )}

        <div className="flex-1 space-y-4 py-4">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'claude' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 shrink-0 mt-1"
                  style={{ backgroundColor: COLORS.gold }}>
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'text-white rounded-br-sm'
                    : 'text-gray-800 rounded-bl-sm'
                }`}
                style={{
                  backgroundColor: msg.sender === 'user' ? COLORS.navy : 'white',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 shrink-0"
                style={{ backgroundColor: COLORS.gold }}>
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white text-sm text-gray-400"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                답변 작성 중...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-3 items-center">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="메시지를 입력하세요..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-opacity-100 transition-colors"
            style={{ '--tw-ring-color': COLORS.gold } as React.CSSProperties}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !message.trim()}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-opacity disabled:opacity-40"
            style={{ backgroundColor: COLORS.gold }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
