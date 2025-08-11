import React, { useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Input, Tag, theme } from 'antd';

const PlusOutlined = () => (
  <svg style={{ width: '12px', height: '12px' }} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

interface Props {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export const TagInput: React.FC<Props> = ({ value: tags, onChange, placeholder }) => {
  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const newTags = tags.filter((tag) => tag !== removedTag);
    onChange(newTags);
  };

  const showInput = (e: React.MouseEvent) => {
    e.preventDefault();
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      onChange([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const tagPlusStyle: React.CSSProperties = {
    background: 'transparent',
    borderStyle: 'dashed',
    borderColor: 'var(--color-primary)',
    color: 'var(--color-primary)',
    cursor: 'pointer'
  };

  return (
    <div style={{ marginBottom: 0 }}>
      <div style={{ marginBottom: 8, display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            closable
            onClose={(e) => handleClose(tag, e)}
            style={{ marginBottom: '4px' }}
          >
            {tag}
          </Tag>
        ))}
      </div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 120 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          placeholder="태그 입력 후 Enter"
        />
      ) : (
        <Tag onClick={showInput} style={tagPlusStyle}>
          <PlusOutlined /> {tags.length === 0 ? (placeholder || '새 태그') : '새 태그'}
        </Tag>
      )}
      {tags.length > 0 && (
        <div className="form-hint" style={{ marginTop: '0.5rem' }}>
          {tags.length}명의 사용자 그룹
        </div>
      )}
    </div>
  );
};