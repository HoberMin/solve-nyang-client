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
  const response = await fetch('http://70.12.115.69:8000/chat', {
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
  const maxLength = 200; // 최대 글자수 제한
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setInputMessage(value);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const remainingSpace = maxLength - inputMessage.length;
    const truncatedText = pastedText.slice(0, remainingSpace);
    setInputMessage(prev => prev + truncatedText);
  };

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
          content: response.response,
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

  const getProgressColor = () => {
    const ratio = inputMessage.length / maxLength;
    if (ratio < 0.5) return 'bg-emerald-500';
    if (ratio < 0.8) return 'bg-yellow-500';
    return 'bg-red-500';
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
                className='rounded-lg p-1.5 text-slate-300 transition-colors'
              >
                <RotateCcw className='h-5 w-5 text-black' />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className='rounded-lg p-1.5 text-slate-300 transition-colors'
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
                  <p className='whitespace-pre-wrap break-words text-[0.925rem] leading-relaxed'>
                    {message.content.replace(/[#*`_~>/\]]/g, '')}
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
            <form onSubmit={handleSendMessage} className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <div className='relative flex-1'>
                  <input
                    type='text'
                    value={inputMessage}
                    onChange={handleInputChange}
                    onPaste={handlePaste}
                    disabled={mutation.isPending}
                    placeholder='메시지를 입력하세요...'
                    maxLength={maxLength}
                    className={cn(
                      'w-full rounded-xl border-0 bg-slate-800/80 px-4 py-3 pr-20',
                      'text-white placeholder-slate-400 outline-none',
                      'focus:outline-none focus:ring-2 focus:ring-violet-500/50',
                    )}
                  />
                  <span className='absolute bottom-2 right-3 text-xs text-slate-400'>
                    {inputMessage.length}/{maxLength}
                  </span>
                </div>
                <button
                  type='submit'
                  disabled={mutation.isPending || !inputMessage.trim()}
                  className={cn(
                    'rounded-xl bg-violet-500 p-3 text-white transition-colors',
                    'hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50',
                  )}
                >
                  <Send className='h-5 w-5' />
                </button>
              </div>
              <div className='h-1 w-full rounded-full bg-slate-700/30'>
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-300',
                    getProgressColor(),
                  )}
                  style={{
                    width: `${(inputMessage.length / maxLength) * 100}%`,
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;
