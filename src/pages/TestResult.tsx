import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, Sparkles, Users, Target, Zap } from 'lucide-react';
import { useSBTIStore } from '@/stores/useSBTIStore';
import { useMatchStore } from '@/stores/useMatchStore';

export default function TestResult() {
  const navigate = useNavigate();
  const { result, isTestCompleted } = useSBTIStore();
  const { generateMatches } = useMatchStore();

  useEffect(() => {
    if (!isTestCompleted || !result) {
      navigate('/test');
      return;
    }
    generateMatches(result.type);
  }, [isTestCompleted, result, navigate, generateMatches]);

  if (!result) return null;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '分析师': 'from-blue-500 to-indigo-500',
      '外交官': 'from-pink-500 to-rose-500',
      '守护者': 'from-green-500 to-emerald-500',
      '探险家': 'from-yellow-500 to-orange-500'
    };
    return colors[category] || 'from-pink-500 to-purple-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 pb-20">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <span className="font-semibold text-gray-700">测试结果</span>
        </div>
      </header>

      {/* Result Card */}
      <div className="px-6 pt-4">
        <div className="max-w-md mx-auto">
          {/* Type Badge */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryColor(result.category)} text-white text-sm font-medium mb-4`}>
              <Target className="w-4 h-4" />
              {result.category}
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
              {result.type}
            </h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{result.name}</h2>
            <p className="text-gray-600">{result.description}</p>
          </div>

          {/* Traits */}
          <div className="bg-white rounded-2xl shadow-lg shadow-pink-100 p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              性格特征
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-green-600 font-medium mb-2">优势</p>
                <div className="flex flex-wrap gap-2">
                  {result.traits.strengths.map((strength, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium mb-2">注意</p>
                <div className="flex flex-wrap gap-2">
                  {result.traits.weaknesses.map((weakness, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm"
                    >
                      {weakness}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Compatible Types */}
          <div className="bg-white rounded-2xl shadow-lg shadow-pink-100 p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" fill="currentColor" />
              最佳匹配类型
            </h3>
            <div className="flex flex-wrap gap-3">
              {result.compatibleTypes.map((type, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200"
                >
                  <span className="font-bold text-pink-600">{type}</span>
                  <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
                </div>
              ))}
            </div>
          </div>

          {/* Dimension Scores */}
          <div className="bg-white rounded-2xl shadow-lg shadow-pink-100 p-6 mb-8">
            <h3 className="font-bold text-gray-800 mb-4">维度分析</h3>
            <div className="space-y-4">
              {[
                { label: '外向 (E) - 内向 (I)', score: result.scores.ei, left: 'E', right: 'I' },
                { label: '感觉 (S) - 直觉 (N)', score: result.scores.sn, left: 'S', right: 'N' },
                { label: '思考 (T) - 情感 (F)', score: result.scores.tf, left: 'T', right: 'F' },
                { label: '判断 (J) - 知觉 (P)', score: result.scores.jp, left: 'J', right: 'P' }
              ].map((dim, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{dim.left}</span>
                    <span>{dim.label}</span>
                    <span>{dim.right}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-1000"
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/match')}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-105 transition-all"
          >
            <Users className="w-5 h-5" />
            查看匹配对象
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
