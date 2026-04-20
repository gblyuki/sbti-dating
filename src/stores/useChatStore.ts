import { create } from 'zustand';
import type { Chat, Message, User } from '@/types';

interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  isLoading: boolean;
  initChat: (user: User) => void;
  sendMessage: (content: string) => void;
  selectChat: (chatId: string) => void;
  generateAIResponse: (userMessage: string) => string;
}

const AI_RESPONSES: Record<string, string[]> = {
  greeting: [
    '你好呀！很高兴认识你~ 😊',
    '嗨！终于等到你了！',
    '你好！看到你的消息很开心~'
  ],
  hobby: [
    '我也很喜欢这个！我们可以一起聊聊~',
    '听起来很有趣呢，能多告诉我一些吗？',
    '哇，这个爱好很棒！我也一直想尝试。'
  ],
  movie: [
    '最近有什么好看的电影推荐吗？',
    '我喜欢看科幻片，你呢？',
    '周末一起看电影怎么样？'
  ],
  food: [
    '我知道一家很棒的餐厅，改天一起去？',
    '美食是人生的一大享受！',
    '你最喜欢吃什么菜系呢？'
  ],
  travel: [
    '旅行真的是最好的放松方式！',
    '你最想去哪里旅行呢？',
    '我最近也计划出去走走~'
  ],
  default: [
    '真的吗？继续说，我在听~',
    '这个观点很有意思！',
    '哈哈，你真有趣！',
    '嗯嗯，我明白你的意思',
    '那你平时还喜欢做什么呢？',
    '听起来你的生活很丰富多彩呢！'
  ]
};

const getResponseCategory = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('你好') || lowerMsg.includes('嗨') || lowerMsg.includes('hi')) return 'greeting';
  if (lowerMsg.includes('喜欢') || lowerMsg.includes('爱好') || lowerMsg.includes('兴趣')) return 'hobby';
  if (lowerMsg.includes('电影') || lowerMsg.includes('剧') || lowerMsg.includes('看')) return 'movie';
  if (lowerMsg.includes('吃') || lowerMsg.includes('美食') || lowerMsg.includes('餐厅')) return 'food';
  if (lowerMsg.includes('旅行') || lowerMsg.includes('旅游') || lowerMsg.includes('玩')) return 'travel';
  return 'default';
};

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  currentChat: null,
  isLoading: false,

  initChat: (user: User) => {
    const existingChat = get().chats.find((chat) => chat.user.id === user.id);
    if (existingChat) {
      set({ currentChat: existingChat });
      return;
    }

    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      user,
      lastMessage: '',
      lastMessageTime: new Date(),
      unreadCount: 0,
      messages: []
    };

    set((state) => ({
      chats: [newChat, ...state.chats],
      currentChat: newChat
    }));

    setTimeout(() => {
      const greeting = AI_RESPONSES.greeting[Math.floor(Math.random() * AI_RESPONSES.greeting.length)];
      get().sendMessage(greeting);
    }, 500);
  },

  sendMessage: (content: string) => {
    const { currentChat } = get();
    if (!currentChat) return;

    const isAI = content.includes('你好') || content.includes('嗨') || AI_RESPONSES.greeting.includes(content);

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: isAI ? currentChat.user.id : 'current-user',
      content,
      timestamp: new Date(),
      isRead: true
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
      lastMessage: content,
      lastMessageTime: new Date()
    };

    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === currentChat.id ? updatedChat : chat
      ),
      currentChat: updatedChat
    }));

    if (!isAI) {
      setTimeout(() => {
        const response = get().generateAIResponse(content);
        get().sendMessage(response);
      }, 1500);
    }
  },

  selectChat: (chatId: string) => {
    const chat = get().chats.find((c) => c.id === chatId);
    if (chat) {
      set({
        currentChat: chat,
        chats: get().chats.map((c) =>
          c.id === chatId ? { ...c, unreadCount: 0 } : c
        )
      });
    }
  },

  generateAIResponse: (userMessage: string): string => {
    const category = getResponseCategory(userMessage);
    const responses = AI_RESPONSES[category] || AI_RESPONSES.default;
    return responses[Math.floor(Math.random() * responses.length)];
  }
}));
