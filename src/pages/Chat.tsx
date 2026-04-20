import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Phone, Video, MoreVertical, Heart } from 'lucide-react';
import { useChatStore } from '@/stores/useChatStore';
import { useMatchStore } from '@/stores/useMatchStore';

export default function Chat() {
  const navigate = useNavigate();
  const { currentChat, sendMessage } = useChatStore();
  const messages = currentChat?.messages || [];
  const { currentMatch } = useMatchStore();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!currentChat || !currentMatch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">请先选择匹配对象</p>
          <button
            onClick={() => navigate('/match')}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium"
          >
            去匹配
          </button>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = [
    '你好呀！很高兴认识你~',
    '你的头像真好看！',
    '我们的人格类型很配呢',
    '平时喜欢做什么呀？',
    '周末有什么安排吗？'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex flex-col">
      {/* Header */}
      <header className="px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/match')}
            className="p-2 rounded-full hover:bg-pink-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative">
            <img
              src={currentMatch.user.avatar}
              alt={currentMatch.user.nickname}
              className="w-10 h-10 rounded-full object-cover border-2 border-pink-200"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{currentMatch.user.nickname}</h3>
            <p className="text-xs text-gray-500">
              {currentMatch.user.sbtiType} · {currentMatch.user.sbtiName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-pink-50 transition-colors">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-pink-50 transition-colors">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-pink-50 transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Compatibility Banner */}
      <div className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center gap-2">
        <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
        <span className="text-sm text-pink-700">
          匹配度 {currentMatch.compatibility}% · {currentMatch.compatibility >= 80 ? '非常契合' : '值得了解'}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
              <Heart className="w-8 h-8 text-pink-400" />
            </div>
            <p className="text-gray-500 text-sm">开始你们的第一次对话吧</p>
          </div>
        )}

        {messages.map((message, index) => {
          const isMe = message.senderId === 'current-user';
          const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;

          return (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : ''}`}
            >
              {showAvatar && !isMe && (
                <img
                  src={currentMatch.user.avatar}
                  alt={currentMatch.user.nickname}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              {!showAvatar && !isMe && <div className="w-8" />}

              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                  isMe
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${isMe ? 'text-pink-100' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length < 3 && (
        <div className="px-4 py-2 bg-white border-t border-pink-100">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => {
                  sendMessage(reply);
                }}
                className="flex-shrink-0 px-4 py-2 rounded-full bg-pink-50 text-pink-600 text-sm hover:bg-pink-100 transition-colors whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 bg-white border-t border-pink-100">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入消息..."
              className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputMessage.trim()}
            className={`p-3 rounded-full transition-all ${
              inputMessage.trim()
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-200'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
