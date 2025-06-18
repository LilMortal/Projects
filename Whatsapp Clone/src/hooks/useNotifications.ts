import { useEffect } from 'react';
import { useUIStore } from '../store/uiStore';
import { useChatStore } from '../store/chatStore';

export const useNotifications = () => {
  const { notifications } = useUIStore();
  const { chats } = useChatStore();

  useEffect(() => {
    if (!notifications || !('Notification' in window)) return;

    // Request permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [notifications]);

  const showNotification = (title: string, body: string, icon?: string) => {
    if (!notifications || Notification.permission !== 'granted') return;

    try {
      const notification = new Notification(title, {
        body,
        icon: icon || '/vite.svg',
        badge: '/vite.svg',
        tag: 'whatsapp-message',
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      setTimeout(() => notification.close(), 5000);
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  };

  const getTotalUnreadCount = (): number => {
    return chats.reduce((total, chat) => total + chat.unreadCount, 0);
  };

  const updateBadge = () => {
    const count = getTotalUnreadCount();
    if ('setAppBadge' in navigator) {
      (navigator as any).setAppBadge(count > 0 ? count : undefined);
    }
  };

  useEffect(() => {
    updateBadge();
  }, [chats]);

  return {
    showNotification,
    getTotalUnreadCount,
    updateBadge,
  };
};