import { useEffect, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { MessageCircle, RotateCcw, Send, X } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Chat {
  sender: 'ai' | 'me';
  content: string;
}

interface ChatBotResponse {
  response: string;
}

export const chatBot = async (message: string): Promise<ChatBotResponse> => {
  const response = await fetch('http://70.12.115.69:8080/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('API 요청에 실패했습니다.');
  }

  const data = await response.json();

  if (!data) {
    throw new Error('응답 데이터가 없습니다.');
  }

  return data;
};

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Chat[]>([
    {
      sender: 'ai',
      content:
        '솔브냥에 대해 궁금한 내용은 내가 알려주겠다냥! 아직 공부하는 중이라 모든 걸 완벽하게 알지는 못하지만, 최선을 다해 답변해줄게냥~ 😺 궁금한 걸 물어보라냥!',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const mutation = useMutation({
    mutationFn: (message: string) => chatBot(message),
    onError: (error: Error) => {
      console.error('Error in chat mutation:', error);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          content: '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.',
        },
      ]);
    },
  });

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim() || mutation.isPending) return;

    const newMessage: Chat = {
      sender: 'me',
      content: inputMessage,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    try {
      const response = await mutation.mutateAsync(inputMessage);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          content: response.response, // ChatBotResponse의 response 필드 사용
        },
      ]);
    } catch (error) {
      // 오류 처리는 mutation의 onError에서 처리됩니다
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        sender: 'ai',
        content:
          '솔브냥에 대해 궁금한 내용은 내가 알려주겠다냥! 아직 공부하는 중이라 모든 걸 완벽하게 알지는 못하지만, 최선을 다해 답변해줄게냥~ 😺 궁금한 걸 물어보라냥!',
      },
    ]);
    setInputMessage('');
  };

  return (
    <div className='fixed bottom-8 right-8 isolate z-50'>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'group flex items-center gap-2 rounded-xl bg-violet-500 p-3.5 text-white shadow-lg transition-all',
            'hover:bg-violet-600',
          )}
        >
          <MessageCircle className='h-6 w-6' />
          <span
            className={cn(
              'max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300',
              'group-hover:max-w-xs group-hover:px-2',
            )}
          >
            채팅 시작하기
          </span>
        </button>
      ) : (
        <div
          className={cn(
            'flex h-[36rem] w-[26rem] flex-col overflow-hidden rounded-2xl',
            'border border-slate-800/10 bg-gradient-to-b from-slate-900/95 to-slate-900/90',
            'shadow-2xl backdrop-blur-md',
          )}
        >
          <div className='flex items-center justify-between border-b border-slate-700/30 px-4 py-3'>
            <div className='flex items-center gap-3 text-white'>
              <MessageCircle className='h-5 w-5' />
              <h3 className='font-medium'>솔브냥 챗봇</h3>
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={handleNewChat}
                className={'rounded-lg p-1.5 text-slate-300 transition-colors'}
              >
                <RotateCcw className='h-5 w-5 text-black' />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={'rounded-lg p-1.5 text-slate-300 transition-colors'}
              >
                <X className='h-5 w-5 text-black' />
              </button>
            </div>
          </div>

          <div
            ref={chatContainerRef}
            className={cn(
              'no-scrollbar flex flex-1 flex-col space-y-4 overflow-y-auto p-4',
              'scrollbar-hide',
            )}
            onScroll={handleScroll}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex',
                  message.sender === 'me' ? 'justify-end' : 'justify-start',
                )}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3',
                    message.sender === 'me'
                      ? 'bg-violet-500/90 text-white backdrop-blur-sm'
                      : 'bg-slate-800/80 text-slate-100 backdrop-blur-sm',
                  )}
                >
                  <p className='text-[0.925rem] leading-relaxed'>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {mutation.isPending && (
              <div className='flex justify-start'>
                <div className='max-w-[85%] rounded-2xl bg-slate-800/80 px-4 py-3 backdrop-blur-sm'>
                  <div className='flex space-x-2'>
                    <div className='h-2 w-2 animate-bounce rounded-full bg-violet-400/80'></div>
                    <div className='h-2 w-2 animate-bounce rounded-full bg-violet-400/80 delay-100'></div>
                    <div className='h-2 w-2 animate-bounce rounded-full bg-violet-400/80 delay-200'></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className='h-px w-full' />
          </div>

          <div className='border-t border-slate-700/30 bg-slate-900/50 p-4 backdrop-blur-sm'>
            <form
              onSubmit={handleSendMessage}
              className='flex items-center gap-2'
            >
              <input
                type='text'
                value={inputMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputMessage(e.target.value)
                }
                disabled={mutation.isPending}
                placeholder='메시지를 입력하세요...'
                className={cn(
                  'flex-1 rounded-xl border-0 bg-slate-800/80 px-4 py-3',
                  'text-white placeholder-slate-400 outline-none',
                  'focus:outline-none focus:ring-2 focus:ring-violet-500/50',
                )}
              />
              <button
                type='submit'
                disabled={mutation.isPending}
                className={cn(
                  'rounded-xl bg-violet-500 p-3 text-white transition-colors',
                  'hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50',
                )}
              >
                <Send className='h-5 w-5' />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;
