import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, X, MessageCircle, MapPin, ArrowLeft, Filter, Sparkles } from 'lucide-react';
import { useSBTIStore } from '@/stores/useSBTIStore';
import { useMatchStore } from '@/stores/useMatchStore';
import { useChatStore } from '@/stores/useChatStore';

export default function Match() {
  const navigate = useNavigate();
  const { result, isTestCompleted } = useSBTIStore();
  const { matches, isLoading, likeUser, passUser, setCurrentMatch } = useMatchStore();
  const { initChat } = useChatStore();

  useEffect(() => {
    if (!isTestCompleted) {
      navigate('/test');
    }
  }, [isTestCompleted, navigate]);

  const handleLike = (matchId: string) => {
    likeUser(matchId);
  };

  const handlePass = (matchId: string) => {
    passUser(matchId);
  };

  const handleChat = (match: typeof matches[0]) => {
    setCurrentMatch(match);
    initChat(match.user);
    navigate('/chat');
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-pink-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-gray-500';
  };

  const getCompatibilityBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-pink-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 z-10">
        <button
          onClick={() => navigate('/result')}
          className="p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <span className="font-semibold text-gray-700">为你推荐</span>
        </div>
        <button className="p-2 rounded-full hover:bg-white/50 transition-colors">
          <Filter className="w-6 h-6 text-gray-600" />
        </button>
      </header>

      {/* My Type Badge */}
      {result && (
        <div className="px-6 mb-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>你的人格类型:</span>
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold">
              {result.type} - {result.name}
            </span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center animate-pulse">
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </div>
            <p className="text-gray-600">正在为你寻找最佳匹配...</p>
          </div>
        </div>
      )}

      {/* Match Cards */}
      {!isLoading && (
        <div className="px-6 pb-20">
          <div className="grid gap-4 max-w-md mx-auto">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-2xl shadow-lg shadow-pink-100 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-4 flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={match.user.avatar}
                      alt={match.user.nickname}
                      className="w-20 h-20 rounded-full object-cover border-4 border-pink-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-400 border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        {match.user.nickname}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getCompatibilityBg(match.compatibility)} ${getCompatibilityColor(match.compatibility)}`}>
                        {match.compatibility}% 匹配
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <span>{match.user.age}岁</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {match.user.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-lg bg-purple-100 text-purple-700 text-xs font-medium">
                        {match.user.sbtiType}
                      </span>
                      <span className="text-xs text-gray-500">
                        {match.user.sbtiName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{match.user.bio}</p>
                </div>

                {/* Actions */}
                <div className="flex border-t border-gray-100">
                  <button
                    onClick={() => handlePass(match.id)}
                    className="flex-1 py-3 flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    <span className="text-sm font-medium">跳过</span>
                  </button>
                  <div className="w-px bg-gray-100" />
                  <button
                    onClick={() => handleLike(match.id)}
                    className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
                      match.status === 'liked'
                        ? 'text-pink-500 bg-pink-50'
                        : 'text-pink-500 hover:bg-pink-50'
                    }`}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={match.status === 'liked' ? 'currentColor' : 'none'}
                    />
                    <span className="text-sm font-medium">
                      {match.status === 'liked' ? '已喜欢' : '喜欢'}
                    </span>
                  </button>
                  <div className="w-px bg-gray-100" />
                  <button
                    onClick={() => handleChat(match)}
                    className="flex-1 py-3 flex items-center justify-center gap-2 text-purple-500 hover:bg-purple-50 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">聊天</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {matches.length === 0 && (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">暂时没有更多推荐啦</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium"
              >
                刷新看看
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
