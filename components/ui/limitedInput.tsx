import React, { useState, useEffect, ChangeEvent } from 'react';

interface LimitedInputProps {
  type: 'text' | 'textarea';
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  maxLength?: number;
  maxWords?: number;
  className?: string;
  showWordCount?: boolean;
}

const LimitedInput: React.FC<LimitedInputProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  maxLength,
  maxWords,
  className = '',
  showWordCount = false
}) => {
  const [count, setCount] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(showWordCount ? (maxWords || 0) : (maxLength || 0));

  useEffect(() => {
    updateCount(value);
  }, [value, showWordCount, maxLength, maxWords]);

  const updateCount = (text: string) => {
    if (showWordCount && maxWords) {
      const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      setCount(wordCount);
      setRemaining(Math.max(0, maxWords - wordCount));
    } else if (maxLength) {
      setCount(text.length);
      setRemaining(Math.max(0, maxLength - text.length));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (showWordCount && maxWords) {
      const wordCount = inputValue.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount <= maxWords) {
        onChange(e);
        updateCount(inputValue);
      }
    } else if (maxLength && inputValue.length <= maxLength) {
      onChange(e);
      updateCount(inputValue);
    }
  };

  return (
    <div className="relative">
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${className} pr-24`}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${className} pr-24`}
        />
      )}
      <span className="absolute bottom-1 right-2 text-sm text-gray-500">
        {remaining} {showWordCount ? 'words' : 'characters'} remaining
      </span>
    </div>
  );
};

export default LimitedInput;