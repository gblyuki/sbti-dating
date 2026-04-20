import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Users, MessageCircle } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Floating Hearts Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.15
              }}
            >
              <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              心动匹配
            </span>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-6 pt-12 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-pink-200 mb-8">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-pink-700">基于 SBTI 人格测试的智能匹配</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            发现你的
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              SBTI灵魂伴侣
            </span>
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
            通过科学的人格测试，找到与你最契合的那个TA
            <br />
            开启一段美好的缘分
          </p>

          <button
            onClick={() => navigate('/test')}
            className="group relative px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              开始测试
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" />
            </span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>

          <p className="mt-4 text-sm text-gray-500">预计用时 3-5 分钟</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-16 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
            三步找到你的缘分
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-100 to-pink-200 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">1. 人格测试</h3>
              <p className="text-sm text-gray-600">完成SBTI人格测试，了解真实的自己</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">2. 智能匹配</h3>
              <p className="text-sm text-gray-600">系统根据人格类型推荐最佳匹配对象</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-100 to-purple-200 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">3. 开始聊天</h3>
              <p className="text-sm text-gray-600">与心仪的对象开启甜蜜对话</p>
            </div>
          </div>
        </div>
      </div>

      {/* SBTI Types Preview */}
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            16种人格类型
          </h2>
          <p className="text-center text-gray-600 mb-10">
            每种人格都有独特的魅力，找到与你互补的那个TA
          </p>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
              'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'].map((type) => (
              <div
                key={type}
                className="aspect-square rounded-xl bg-white shadow-sm border border-pink-100 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all cursor-pointer"
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-sm text-gray-500 border-t border-pink-100">
        <p> 2024 心动匹配 - 基于 SBTI 的科学交友平台</p>
      </footer>
    </div>
  );
}
