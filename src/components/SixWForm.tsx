import React, { useState, useEffect } from 'react';
import { validateForm } from '../lib/validation';
import { TagInput } from './TagInput';
import { notification } from 'antd';

export type FormValues = {
  what: string;
  why: string;
  who: string[];
  where: string;
  when: string;
  how: string;
};

interface Props {
  value: FormValues;
  onChange: (v: FormValues) => void;
  description: string;
}


const ErrorIcon = () => (
  <svg style={{ width: '14px', height: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RefreshIcon = () => (
  <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const SaveIcon = () => (
  <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
  </svg>
);

const CalendarIcon = () => (
  <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const SixWForm: React.FC<Props> = ({ value, onChange, description }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const validation = validateForm(value);
    setIsValid(validation.isValid);
    
    // 터치된 필드에 대해서만 에러 표시
    const filteredErrors: Record<string, string> = {};
    Object.keys(validation.errors).forEach(field => {
      if (touched[field]) {
        filteredErrors[field] = validation.errors[field];
      }
    });
    setErrors(filteredErrors);
  }, [value, touched]);

  const update = (patch: Partial<FormValues>) => {
    const next = { ...value, ...patch };
    onChange(next);
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const reset = () => {
    onChange({ what: '', why: '', who: [], where: '', when: '', how: '' });
    setErrors({});
    setTouched({});
  };

  const handleSave = () => {
    const savedData = {
      ...value,
      description,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('needbox-saved', JSON.stringify(savedData));
    
    notification.success({
      message: '저장 완료',
      description: '✅ 요구사항이 성공적으로 저장되었습니다!',
      duration: 3
    });
    
    // 알림 표시 후 폼 초기화
    setTimeout(() => {
      reset();
    }, 500);
  };

  const getFieldClasses = (field: string, isTextarea = false) => {
    const base = isTextarea ? 'form-textarea' : 'form-input';
    const hasError = errors[field] && touched[field];
    let hasValue = false;
    
    switch (field) {
      case 'who':
        hasValue = value.who.length > 0;
        break;
      default:
        hasValue = Boolean(value[field as keyof FormValues]);
    }
    
    if (hasError) return `${base} form-input-error`;
    if (hasValue && !errors[field]) return `${base} form-input-success`;
    return base;
  };

  // 필수 필드 완료 상태 계산
  const requiredFieldsCount = 2; // What, Why
  const completedRequiredFields = [
    value.what.trim().length > 0,
    value.why.trim().length > 0
  ].filter(Boolean).length;

  // 전체 필드 완료 상태 계산 (진행률 표시용)
  const totalFields = 6;
  const completedFields = Object.keys(value).filter(key => {
    if (key === 'who') return value.who.length > 0;
    return Boolean(value[key as keyof FormValues]) && value[key as keyof FormValues].toString().trim().length > 0;
  }).length;

  const progressPercentage = (completedFields / totalFields) * 100;

  return (
    <form className="form-card">
      <div className="card-header">
        <h2 className="card-title">요구사항 작성하기</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            필수 {completedRequiredFields}/{requiredFieldsCount} · 전체 {completedFields}/{totalFields}
          </span>
          <div style={{ 
            width: '100px', 
            height: '6px', 
            background: 'var(--color-border)', 
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercentage}%`,
              height: '100%',
              background: isValid ? 'var(--color-success)' : 'var(--color-primary)',
              transition: 'width var(--transition-base)'
            }} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="what" className="form-label form-label-required">
          💡 무엇을 원하시나요?
        </label>
        <input
          id="what"
          className={getFieldClasses('what')}
          value={value.what}
          onChange={e => update({ what: e.target.value })}
          onBlur={() => handleBlur('what')}
          aria-describedby="what-err"
          placeholder="예: 재고 조회 화면에 브랜드 필터 추가 기능 (15자 이상 구체적으로)"
          autoComplete="off"
        />
        {errors.what && touched.what && (
          <div id="what-err" className="form-error">
            <ErrorIcon />
            {errors.what}
          </div>
        )}
        {!errors.what && value.what && value.what.length >= 15 && (
          <div className="form-hint">✅ 구체적인 요구사항이 입력되었습니다</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="why" className="form-label form-label-required">
          🎯 주요 목적을 알려주세요
        </label>
        <textarea
          id="why"
          className={getFieldClasses('why', true)}
          value={value.why}
          onChange={e => update({ why: e.target.value })}
          onBlur={() => handleBlur('why')}
          aria-describedby="why-err"
          placeholder="예: 브랜드별 재고 문의가 많아 상담원들의 검색 시간이 오래 걸리고 있어서 업무 효율성을 높이고 싶습니다."
          rows={4}
        />
        {errors.why && touched.why && (
          <div id="why-err" className="form-error">
            <ErrorIcon />
            {errors.why}
          </div>
        )}
        {!errors.why && value.why && (
          <div className="form-hint">✅ 목적이 입력되었습니다</div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          👥 누가 사용하나요? <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>선택사항</span>
        </label>
        <TagInput
          value={value.who}
          onChange={(tags) => {
            update({ who: tags });
            handleBlur('who');
          }}
          placeholder="사용자 그룹을 입력하세요 (예: CS 상담원)"
        />
        {errors.who && touched.who && (
          <div className="form-error">
            <ErrorIcon />
            {errors.who}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="where" className="form-label">
          📍 어느 화면에서 사용하나요? <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>선택사항</span>
        </label>
        <input
          id="where"
          className={getFieldClasses('where')}
          value={value.where}
          onChange={e => update({ where: e.target.value })}
          onBlur={() => handleBlur('where')}
          placeholder="예: WMS > 재고관리 > 재고조회 화면"
          autoComplete="off"
        />
        {errors.where && touched.where && (
          <div className="form-error">
            <ErrorIcon />
            {errors.where}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="when" className="form-label">
          ⏰ 언제까지 필요한가요? <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>선택사항</span>
        </label>
        <div className="date-input-wrapper">
          <input
            id="when"
            type="date"
            className={getFieldClasses('when')}
            value={value.when}
            onChange={e => update({ when: e.target.value })}
            onBlur={() => handleBlur('when')}
            min={getToday()}
            aria-describedby="when-err"
          />
          <CalendarIcon />
        </div>
        {errors.when && touched.when && (
          <div id="when-err" className="form-error">
            <ErrorIcon />
            {errors.when}
          </div>
        )}
        {value.when && !errors.when && (
          <div className="form-hint">
            📅 {new Date(value.when).toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}까지 완료 예정
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="how" className="form-label">
          🔧 어떻게 구현하면 좋을까요? <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>선택사항</span>
        </label>
        <textarea
          id="how"
          className={getFieldClasses('how', true)}
          value={value.how}
          onChange={e => update({ how: e.target.value })}
          onBlur={() => handleBlur('how')}
          rows={3}
          placeholder="예: 브랜드 권한에 따라 필터 노출 여부를 다르게 하고, 다중 선택이 가능하도록 체크박스로 구현"
        />
        {errors.how && touched.how && (
          <div className="form-error">
            <ErrorIcon />
            {errors.how}
          </div>
        )}
      </div>

      <div className="btn-group">
        <button type="button" className="btn btn-danger" onClick={reset}>
          <RefreshIcon />
          다시 작성하기
        </button>
        <button 
          type="button" 
          className={`btn ${isValid ? 'btn-primary' : 'btn-secondary'}`}
          onClick={handleSave}
          disabled={!isValid}
          style={{
            opacity: isValid ? 1 : 0.6,
            cursor: isValid ? 'pointer' : 'not-allowed'
          }}
        >
          {isValid ? '저장하기' : '필수 항목을 완성해 주세요'}
        </button>
      </div>

    </form>
  );
};