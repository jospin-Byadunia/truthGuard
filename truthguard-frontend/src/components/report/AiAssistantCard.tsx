import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bot, Send } from 'lucide-react';
import { Button } from '../ui/Button';

export const AiAssistantCard: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userQuery = inputValue;
    setMessages((prev) => [...prev, { sender: 'user', text: userQuery }]);
    setInputValue('');

    // Simulated contextual AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `En me basant sur les données de vérification : Les agences de presse de premier ordre (Reuters, AFP) ont confirmé ces informations le 4 août. Aucune contradiction officielle n'a été trouvée.`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="bg-white rounded-[18px] border border-gray-200/90 p-6 shadow-sm mt-8">
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1976D2] flex items-center justify-center">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-heading font-bold text-[#072B74] text-base">
            {t('report.ai_assistant_title')}
          </h4>
          <p className="text-xs text-[#6B7280]">
            {t('report.ai_assistant_desc')}
          </p>
        </div>
      </div>

      {/* Message Chat Output */}
      {messages.length > 0 && (
        <div className="flex flex-col gap-2.5 mb-4 max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-xl">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl text-xs max-w-[85%] font-body leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#072B74] text-white self-end'
                  : 'bg-white border border-gray-200 text-[#111827] self-start shadow-2xs'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      )}

      {/* Input bar */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t('report.ai_assistant_placeholder')}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-xs font-body focus:bg-white focus:outline-none focus:border-[#072B74]"
        />
        <Button variant="primary" size="sm" icon={<Send className="w-3.5 h-3.5" type="submit" />}>
          Envoyer
        </Button>
      </form>

    </div>
  );
};