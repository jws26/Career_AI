import Anthropic from '@anthropic-ai/sdk';

// Anthropic 클라이언트를 생성하는 함수
const getClient = () => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  // API 키가 없으면 경고를 출력하고 null을 반환합니다.
  if (!apiKey) {
    console.warn('Anthropic API key not found. Please add VITE_ANTHROPIC_API_KEY to your .env file.');
    return null;
  }
  return new Anthropic({ apiKey });
};

// Claude로부터 응답을 받아오는 비동기 함수
export const getClaudeResponse = async (message: string): Promise<string> => {
  const anthropic = getClient();

  // 클라이언트가 생성되지 않았으면 (API 키가 없으면) 사용자에게 안내 메시지를 반환합니다.
  if (!anthropic) {
    return "I can't respond right now. The API key is missing. Please set your VITE_ANTHROPIC_API_KEY in the .env file.";
  }

  try {
    // Claude API에 메시지를 보내고 응답을 받습니다.
    const response = await anthropic.messages.create({
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }],
      model: 'claude-3-opus-20240229',
    });

    // 응답에서 텍스트를 추출하여 반환합니다.
    if (response.content && response.content.length > 0 && 'text' in response.content[0]) {
      return response.content[0].text;
    }
    return "Sorry, I couldn't get a proper response.";

  } catch (error) {
    console.error('Error getting response from Claude:', error);

    // Anthropic SDK에서 발생한 에러인 경우, 더 구체적인 에러 메시지를 반환합니다.
    if (error instanceof Anthropic.APIError) {
         return `API Error: ${error.status} ${error.name} - ${error.message}`;
    }
    return 'Sorry, something went wrong while communicating with the API.';
  }
};
