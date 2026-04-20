import { create } from 'zustand';
import type { User, Match } from '@/types';
import { SBTI_TYPES } from '@/constants/sbti';
import { calculateCompatibility } from './useSBTIStore';

interface MatchState {
  matches: Match[];
  currentMatch: Match | null;
  isLoading: boolean;
  filters: {
    gender: string | null;
    ageRange: [number, number];
    location: string | null;
    minCompatibility: number;
  };
  generateMatches: (userType: string) => void;
  likeUser: (matchId: string) => void;
  passUser: (matchId: string) => void;
  setCurrentMatch: (match: Match | null) => void;
  setFilters: (filters: Partial<MatchState['filters']>) => void;
}

const LOCATIONS = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安'];
const AVATARS = {
  male: [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&gender=male',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden&gender=male',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas&gender=male',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah&gender=male',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan&gender=male'
  ],
  female: [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&gender=female',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia&gender=female',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Ava&gender=female',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia&gender=female',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&gender=female'
  ]
};

const NAMES = {
  male: ['子轩', '浩然', '宇航', '俊杰', '明辉', '博文', '志强', '伟杰', '建宇', '晓峰'],
  female: ['雨婷', '欣怡', '梓涵', '诗琪', '梦瑶', '佳怡', '雪梅', '丽娜', '晓燕', '雅琪']
};

const BIOS = [
  '喜欢旅行，热爱生活，寻找志同道合的朋友',
  '音乐爱好者，吉他手，期待遇见有趣的你',
  '美食探店达人，喜欢尝试各种新鲜事物',
  '运动爱好者，每周跑步三次，保持健康生活方式',
  '电影迷，科幻片忠实粉丝，也喜欢文艺片',
  '爱读书，爱思考，希望找到灵魂伴侣',
  '摄影爱好者，用镜头记录生活的美好瞬间',
  '游戏玩家，但不沉迷，懂得平衡生活',
  '咖啡控，喜欢安静的氛围和深入的对话',
  '宠物爱好者，有一只可爱的猫咪陪伴'
];

const generateMockUser = (index: number, userType: string): User => {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const typeKeys = Object.keys(SBTI_TYPES);
  const randomType = typeKeys[Math.floor(Math.random() * typeKeys.length)];
  const typeInfo = SBTI_TYPES[randomType];

  return {
    id: `user-${index}`,
    nickname: NAMES[gender][Math.floor(Math.random() * NAMES[gender].length)],
    avatar: AVATARS[gender][Math.floor(Math.random() * AVATARS[gender].length)],
    gender,
    age: 22 + Math.floor(Math.random() * 10),
    location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
    bio: BIOS[Math.floor(Math.random() * BIOS.length)],
    sbtiType: randomType,
    sbtiName: typeInfo.name,
    compatibility: calculateCompatibility(userType, randomType)
  };
};

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: [],
  currentMatch: null,
  isLoading: false,
  filters: {
    gender: null,
    ageRange: [20, 35],
    location: null,
    minCompatibility: 70
  },

  generateMatches: (userType: string) => {
    set({ isLoading: true });

    const matches: Match[] = Array.from({ length: 12 }, (_, i) => {
      const user = generateMockUser(i, userType);
      return {
        id: `match-${i}`,
        user,
        compatibility: user.compatibility || 50,
        status: 'pending' as const
      };
    }).sort((a, b) => b.compatibility - a.compatibility);

    setTimeout(() => {
      set({ matches, isLoading: false });
    }, 800);
  },

  likeUser: (matchId: string) => {
    set((state) => ({
      matches: state.matches.map((match) =>
        match.id === matchId ? { ...match, status: 'liked' as const } : match
      )
    }));
  },

  passUser: (matchId: string) => {
    set((state) => ({
      matches: state.matches.filter((match) => match.id !== matchId)
    }));
  },

  setCurrentMatch: (match: Match | null) => {
    set({ currentMatch: match });
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
  }
}));
