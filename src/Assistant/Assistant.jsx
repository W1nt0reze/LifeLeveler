import { useEffect, useState } from 'react';
import './styles.css';

const messages = {
  taskAdded: {
    text: 'Отличное начало! Не забудь выполнить задачу вовремя.',
    emoji: '💪'
  },
  taskCompleted: {
    text: 'Так держать! Продолжай в том же духе.',
    emoji: '🎉'
  },
  dailyGoalComplete: {
    text: 'Потрясающе! Ты выполнил дневную цель. 🔥',
    emoji: '🏆'
  },
  allCompleted: {
    text: 'Вау! Все задачи выполнены. Ты просто супергерой!',
    emoji: '🦸'
  },
  newDay: {
    text: 'Новый день - новые свершения! У тебя всё получится!',
    emoji: '🌞'
  }
};

export function Assistant({ action }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (action) {
      const msg = messages[action.type] || {
        text: 'Отличная работа! Продолжай в том же духе.',
        emoji: '👍'
      };

      setMessage(msg);
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [action]);

  if (!visible || !message) return null;

  return (
    <div className="assistant">
      <div className="assistant-message">
        <span className="emoji">{message.emoji}</span>
        {message.text}
      </div>
    </div>
  );
}