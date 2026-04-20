export interface SBTIQuestion {
  id: number;
  question: string;
  options: {
    A: { text: string; type: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P' };
    B: { text: string; type: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P' };
    C: { text: string; type: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P' };
    D: { text: string; type: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P' };
  };
}

export interface SBTIResult {
  type: string;
  name: string;
  category: string;
  description: string;
  traits: {
    strengths: string[];
    weaknesses: string[];
  };
  compatibleTypes: string[];
  scores: {
    ei: number;
    sn: number;
    tf: number;
    jp: number;
  };
}

export interface User {
  id: string;
  nickname: string;
  avatar: string;
  gender: 'male' | 'female';
  age: number;
  location: string;
  bio: string;
  sbtiType: string;
  sbtiName: string;
  compatibility?: number;
}

export interface Match {
  id: string;
  user: User;
  compatibility: number;
  status: 'pending' | 'liked' | 'matched';
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}
