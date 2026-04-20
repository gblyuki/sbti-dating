import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useSBTIStore } from '@/stores/useSBTIStore';
import { SBTI_QUESTIONS } from '@/constants/sbti';

export default function SBTITest() {
  const navigate = useNavigate();
  const {
    currentQuestion,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    submitTest
  } = useSBTIStore();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const question = SBTI_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / SBTI_QUESTIONS.length) * 100;
  const hasAnswer = answers[question.id] !== undefined;

  const handleOptionSelect = (optionKey: string, type: string) => {
    setSelectedOption(optionKey);
    setAnswer(question.id, type);
  };

  const handleNext = () => {
    if (currentQuestion < SBTI_QUESTIONS.length - 1) {
      nextQuestion();
      setSelectedOption(null);
    } else {
      submitTest();
      navigate('/result');
    }
  };

  const handlePrev = () => {
    prevQuestion();
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <span className="font-semibold text-gray-700">SBTI 人格测试</span>
        </div>
        <div className="w-10" />
      </header>

      {/* Progress Bar */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">进度</span>
          <span className="text-sm font-medium text-pink-600">
            {currentQuestion + 1} / {SBTI_QUESTIONS.length}
          </span>
        </div>
        <div className="h-2 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="px-6 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-3xl shadow-lg shadow-pink-100 p-8">
            {/* Question Number */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold flex items-center justify-center">
                {question.id}
              </span>
              <span className="text-sm text-gray-400">题目</span>
            </div>

            {/* Question Text */}
            <h2 className="text-xl font-bold text-gray-800 mb-8 leading-relaxed">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {Object.entries(question.options).map(([key, option]) => {
                const isSelected = answers[question.id] === option.type;
                return (
                  <button
                    key={key}
                    onClick={() => handleOptionSelect(key, option.type)}
                    className={`w-full p-4 rounded-xl text-left border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-100 hover:border-pink-200 hover:bg-pink-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-pink-500 bg-pink-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </span>
                      <span className={`font-medium ${isSelected ? 'text-pink-700' : 'text-gray-700'}`}>
                        {option.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                currentQuestion === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              上一题
            </button>

            <button
              onClick={handleNext}
              disabled={!hasAnswer}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all ${
                hasAnswer
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion === SBTI_QUESTIONS.length - 1 ? '查看结果' : '下一题'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
