import type { SBTIQuestion, SBTIResult } from '@/types';

export const SBTI_QUESTIONS: SBTIQuestion[] = [
  {
    id: 1,
    question: "在社交场合中，你通常：",
    options: {
      A: { text: "主动与陌生人交谈，享受社交", type: "E" },
      B: { text: "与熟悉的朋友待在一起", type: "E" },
      C: { text: "等待别人来接近你", type: "I" },
      D: { text: "找个安静的角落独处", type: "I" }
    }
  },
  {
    id: 2,
    question: "你更喜欢关注：",
    options: {
      A: { text: "具体的事实和细节", type: "S" },
      B: { text: "实际的经验和观察", type: "S" },
      C: { text: "可能性和未来设想", type: "N" },
      D: { text: "抽象的概念和模式", type: "N" }
    }
  },
  {
    id: 3,
    question: "做决定时，你更依赖：",
    options: {
      A: { text: "逻辑分析和客观标准", type: "T" },
      B: { text: "公平和原则", type: "T" },
      C: { text: "个人价值观和感受", type: "F" },
      D: { text: "对他人的影响和和谐", type: "F" }
    }
  },
  {
    id: 4,
    question: "你的生活方式更倾向于：",
    options: {
      A: { text: "有计划、有条理", type: "J" },
      B: { text: "提前安排和准备", type: "J" },
      C: { text: "灵活应变、随遇而安", type: "P" },
      D: { text: "保持开放和选择", type: "P" }
    }
  },
  {
    id: 5,
    question: "周末休息时，你更喜欢：",
    options: {
      A: { text: "参加聚会或户外活动", type: "E" },
      B: { text: "和朋友一起吃饭聊天", type: "E" },
      C: { text: "在家看书或看电影", type: "I" },
      D: { text: "独自做自己喜欢的事", type: "I" }
    }
  },
  {
    id: 6,
    question: "学习新事物时，你更喜欢：",
    options: {
      A: { text: "按照步骤和实例学习", type: "S" },
      B: { text: "通过实践和练习掌握", type: "S" },
      C: { text: "理解原理和概念", type: "N" },
      D: { text: "探索创新的方法", type: "N" }
    }
  },
  {
    id: 7,
    question: "当朋友遇到困难时，你会：",
    options: {
      A: { text: "帮助分析问题并提供解决方案", type: "T" },
      B: { text: "给出实际的建议", type: "T" },
      C: { text: "倾听并给予情感支持", type: "F" },
      D: { text: "表达理解和共情", type: "F" }
    }
  },
  {
    id: 8,
    question: "面对工作任务，你通常：",
    options: {
      A: { text: "制定详细计划并按时完成", type: "J" },
      B: { text: "尽早开始避免拖延", type: "J" },
      C: { text: "根据情况调整进度", type: "P" },
      D: { text: "在截止日期前灵感爆发", type: "P" }
    }
  },
  {
    id: 9,
    question: "在团队中，你通常扮演：",
    options: {
      A: { text: "积极发言的组织者", type: "E" },
      B: { text: "协调沟通的联络者", type: "E" },
      C: { text: "专注执行的支持者", type: "I" },
      D: { text: "独立思考的策划者", type: "I" }
    }
  },
  {
    id: 10,
    question: "你更信任：",
    options: {
      A: { text: "过去的经验和传统", type: "S" },
      B: { text: "确凿的证据和数据", type: "S" },
      C: { text: "直觉和灵感", type: "N" },
      D: { text: "创新的想法和理论", type: "N" }
    }
  },
  {
    id: 11,
    question: "评价一个方案时，你更看重：",
    options: {
      A: { text: "效率和效果", type: "T" },
      B: { text: "合理性和准确性", type: "T" },
      C: { text: "是否符合价值观", type: "F" },
      D: { text: "是否让大家都满意", type: "F" }
    }
  },
  {
    id: 12,
    question: "旅行时，你更喜欢：",
    options: {
      A: { text: "提前规划好所有行程", type: "J" },
      B: { text: "预订好酒店和交通", type: "J" },
      C: { text: "大致方向，细节随机", type: "P" },
      D: { text: "说走就走，随心所欲", type: "P" }
    }
  }
];

export const SBTI_TYPES: Record<string, SBTIResult> = {
  INTJ: {
    type: "INTJ",
    name: "建筑师",
    category: "分析师",
    description: "富有想象力和战略性的思想家，一切皆在计划之中。",
    traits: {
      strengths: ["理性", "独立", "有决心", "好奇心强"],
      weaknesses: ["傲慢", "情感迟钝", "过于批判", "好斗"]
    },
    compatibleTypes: ["ENFP", "ENTP"],
    scores: { ei: 25, sn: 75, tf: 75, jp: 75 }
  },
  INTP: {
    type: "INTP",
    name: "逻辑学家",
    category: "分析师",
    description: "具有创造力的发明家，对知识有着止不住的渴望。",
    traits: {
      strengths: ["分析", "客观", "有创意", "开放"],
      weaknesses: ["怀疑", "心不在焉", "不敏感", "孤僻"]
    },
    compatibleTypes: ["ENTJ", "ESTJ"],
    scores: { ei: 25, sn: 75, tf: 75, jp: 25 }
  },
  ENTJ: {
    type: "ENTJ",
    name: "指挥官",
    category: "分析师",
    description: "大胆、富有想象力且意志强大的领导者。",
    traits: {
      strengths: ["高效", "精力充沛", "自信", "战略思维"],
      weaknesses: ["固执", "不耐烦", "傲慢", "冷酷"]
    },
    compatibleTypes: ["INTP", "INFP"],
    scores: { ei: 75, sn: 75, tf: 75, jp: 75 }
  },
  ENTP: {
    type: "ENTP",
    name: "辩论家",
    category: "分析师",
    description: "聪明好奇的思想者，不会放弃任何智力挑战。",
    traits: {
      strengths: ["知识渊博", "思维敏捷", "原创", "优秀辩论者"],
      weaknesses: ["好辩", "不敏感", "不耐烦", "容易厌烦"]
    },
    compatibleTypes: ["INTJ", "INFJ"],
    scores: { ei: 75, sn: 75, tf: 75, jp: 25 }
  },
  INFJ: {
    type: "INFJ",
    name: "提倡者",
    category: "外交官",
    description: "安静而神秘，同时鼓舞人心且不知疲倦的理想主义者。",
    traits: {
      strengths: ["有创意", "有洞察力", "有原则", "热情"],
      weaknesses: ["对批评敏感", "完美主义", "容易倦怠", "孤僻"]
    },
    compatibleTypes: ["ENFP", "ENTP"],
    scores: { ei: 25, sn: 75, tf: 25, jp: 75 }
  },
  INFP: {
    type: "INFP",
    name: "调停者",
    category: "外交官",
    description: "诗意、善良的利他主义者，总是热情地为正义事业服务。",
    traits: {
      strengths: ["善解人意", "慷慨", "思想开放", "有创意"],
      weaknesses: ["不切实际", "自我批评", "情感脆弱", "难以取悦"]
    },
    compatibleTypes: ["ENTJ", "ENFJ"],
    scores: { ei: 25, sn: 75, tf: 25, jp: 25 }
  },
  ENFJ: {
    type: "ENFJ",
    name: "主人公",
    category: "外交官",
    description: "富有魅力、鼓舞人心的领导者，有能力迷住听众。",
    traits: {
      strengths: ["有魅力", "可靠", "有热情", "利他主义"],
      weaknesses: ["过度理想化", "太自我批评", "过于敏感", "摇摆不定"]
    },
    compatibleTypes: ["INFP", "ISFP"],
    scores: { ei: 75, sn: 75, tf: 25, jp: 75 }
  },
  ENFP: {
    type: "ENFP",
    name: "竞选者",
    category: "外交官",
    description: "热情、有创造力的自由灵魂，总能找到理由微笑。",
    traits: {
      strengths: ["创意", "社交", "观察力强", "充满热情"],
      weaknesses: ["分心", "过度乐观", "不安分", "过度取悦他人"]
    },
    compatibleTypes: ["INTJ", "INFJ"],
    scores: { ei: 75, sn: 75, tf: 25, jp: 25 }
  },
  ISTJ: {
    type: "ISTJ",
    name: "物流师",
    category: "守护者",
    description: "实际且注重事实的个人，可靠性不容怀疑。",
    traits: {
      strengths: ["诚实", "直接", "意志坚强", "负责任"],
      weaknesses: ["固执", "对情感不敏感", "审判性", "经常责备自己"]
    },
    compatibleTypes: ["ESFP", "ESTP"],
    scores: { ei: 25, sn: 25, tf: 75, jp: 75 }
  },
  ISFJ: {
    type: "ISFJ",
    name: "守卫者",
    category: "守护者",
    description: "非常专注而温暖的守护者，时刻准备着保护爱着的人。",
    traits: {
      strengths: ["支持", "可靠", "耐心", "有想象力"],
      weaknesses: ["害羞", "压抑情感", "过于利他", "抗拒改变"]
    },
    compatibleTypes: ["ESFP", "ESTP"],
    scores: { ei: 25, sn: 25, tf: 25, jp: 75 }
  },
  ESTJ: {
    type: "ESTJ",
    name: "总经理",
    category: "守护者",
    description: "出色的管理者，在管理事情或人的方面无与伦比。",
    traits: {
      strengths: ["敬业", "意志坚强", "直接", "耐心"],
      weaknesses: ["不灵活", "对情感不敏感", "自我批评", "好斗"]
    },
    compatibleTypes: ["ISFP", "ISTP"],
    scores: { ei: 75, sn: 25, tf: 75, jp: 75 }
  },
  ESFJ: {
    type: "ESFJ",
    name: "执政官",
    category: "守护者",
    description: "极有同情心，爱社交、受欢迎的人，总是热心提供帮助。",
    traits: {
      strengths: ["实践", "忠诚", "敏感", "热情"],
      weaknesses: ["担心社会地位", "不灵活", "不愿意创新", "太脆弱"]
    },
    compatibleTypes: ["ISFP", "ISTP"],
    scores: { ei: 75, sn: 25, tf: 25, jp: 75 }
  },
  ISTP: {
    type: "ISTP",
    name: "鉴赏家",
    category: "探险家",
    description: "大胆而实际的实验家，擅长使用各种工具。",
    traits: {
      strengths: ["乐观", "精力充沛", "有创意", "实用"],
      weaknesses: ["固执", "不敏感", "私密", "容易厌烦"]
    },
    compatibleTypes: ["ESFJ", "ESTJ"],
    scores: { ei: 25, sn: 25, tf: 75, jp: 25 }
  },
  ISFP: {
    type: "ISFP",
    name: "探险家",
    category: "探险家",
    description: "灵活有魅力的艺术家，时刻准备着探索和体验新鲜事物。",
    traits: {
      strengths: ["迷人", "对他人敏感", "富有想象力", "热情"],
      weaknesses: ["极度独立", "不可预测", "容易紧张", "过度竞争"]
    },
    compatibleTypes: ["ESFJ", "ESTJ"],
    scores: { ei: 25, sn: 25, tf: 25, jp: 25 }
  },
  ESTP: {
    type: "ESTP",
    name: "企业家",
    category: "探险家",
    description: "聪明、精力充沛、善于感知的人，真心享受生活在边缘。",
    traits: {
      strengths: ["大胆", "理性", "原创", "观察力强"],
      weaknesses: ["不敏感", "不耐烦", "容易冒险", "无结构"]
    },
    compatibleTypes: ["ISFJ", "ISTJ"],
    scores: { ei: 75, sn: 25, tf: 75, jp: 25 }
  },
  ESFP: {
    type: "ESFP",
    name: "表演者",
    category: "探险家",
    description: "自发的、精力充沛的娱乐者，生活在他们周围永远不会无聊。",
    traits: {
      strengths: ["大胆", "原创", "展示力", "实践"],
      weaknesses: ["敏感", "冲突回避", "容易厌烦", " Poor planner"]
    },
    compatibleTypes: ["ISFJ", "ISTJ"],
    scores: { ei: 75, sn: 25, tf: 25, jp: 25 }
  }
};

export const COMPATIBILITY_MATRIX: Record<string, Record<string, number>> = {
  INTJ: { ENFP: 95, ENTP: 90, INFJ: 85, INFP: 80, INTJ: 75 },
  INTP: { ENTJ: 95, ENFJ: 90, INTJ: 85, INFJ: 80, INTP: 75 },
  ENTJ: { INTP: 95, INFP: 90, INTJ: 85, ENTP: 80, ENTJ: 75 },
  ENTP: { INTJ: 95, INFJ: 90, ENFP: 85, ENTJ: 80, ENTP: 75 },
  INFJ: { ENFP: 95, ENTP: 90, INTJ: 85, INFP: 80, INFJ: 75 },
  INFP: { ENTJ: 95, ENFJ: 90, INFJ: 85, INTJ: 80, INFP: 75 },
  ENFJ: { INFP: 95, ISFP: 90, INFJ: 85, ENFP: 80, ENFJ: 75 },
  ENFP: { INTJ: 95, INFJ: 90, ENTP: 85, ENFJ: 80, ENFP: 75 },
  ISTJ: { ESFP: 95, ESTP: 90, ISFJ: 85, ISTP: 80, ISTJ: 75 },
  ISFJ: { ESFP: 95, ESTP: 90, ISTJ: 85, ISFP: 80, ISFJ: 75 },
  ESTJ: { ISFP: 95, ISTP: 90, ISTJ: 85, ESFJ: 80, ESTJ: 75 },
  ESFJ: { ISFP: 95, ISTP: 90, ISFJ: 85, ESFP: 80, ESFJ: 75 },
  ISTP: { ESFJ: 95, ESTJ: 90, ISTJ: 85, ESTP: 80, ISTP: 75 },
  ISFP: { ESFJ: 95, ESTJ: 90, ISFJ: 85, ESFP: 80, ISFP: 75 },
  ESTP: { ISFJ: 95, ISTJ: 90, ISTP: 85, ESFP: 80, ESTP: 75 },
  ESFP: { ISFJ: 95, ISTJ: 90, ESFJ: 85, ESTP: 80, ESFP: 75 }
};
