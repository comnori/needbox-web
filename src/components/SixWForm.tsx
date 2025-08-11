import React, { useState } from 'react';
import { useClipboard } from '../lib/clipboard';
import { validateForm } from '../lib/validation';
import { renderDescription } from '../lib/description';

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

export const SixWForm: React.FC<Props> = ({ value, onChange, description }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { copy, toast } = useClipboard();

  const update = (patch: Partial<FormValues>) => {
    const next = { ...value, ...patch };
    onChange(next);
    setErrors(validateForm(next).errors);
  };

  const reset = () => {
    onChange({ what: '', why: '', who: [], where: '', when: '', how: '' });
    setErrors({});
  };

  const copyJson = () => {
    const payload = {
      ...value,
      description: renderDescription(value),
      createdAt: new Date().toISOString(),
      version: 'needbox-web@1'
    };
    copy(JSON.stringify(payload, null, 2));
  };

  return (
    <form>
      <h2>입력 폼</h2>
      <div>
        <label htmlFor="what">What*</label>
        <input
          id="what"
          value={value.what}
          onChange={e => update({ what: e.target.value })}
          aria-describedby="what-err"
          placeholder="예: 재고 조회 화면에 브랜드 필터 추가"
        />
        {errors.what && <div id="what-err">{errors.what}</div>}
      </div>
      <div>
        <label htmlFor="why">Why*</label>
        <textarea
          id="why"
          value={value.why}
          onChange={e => update({ why: e.target.value })}
          aria-describedby="why-err"
          placeholder="예: 브랜드별 재고 문의가 많아 ..."
          rows={3}
        />
        {errors.why && <div id="why-err">{errors.why}</div>}
      </div>
      <div>
        <label htmlFor="who">Who</label>
        <input
          id="who"
          value={value.who.join(', ')}
          onChange={e => update({ who: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
          placeholder="CS상담, 매장직원"
        />
      </div>
      <div>
        <label htmlFor="where">Where</label>
        <input
          id="where"
          value={value.where}
          onChange={e => update({ where: e.target.value })}
          placeholder="WMS>재고관리>재고조회"
        />
      </div>
      <div>
        <label htmlFor="when">When</label>
        <input
          id="when"
          value={value.when}
          onChange={e => update({ when: e.target.value })}
          aria-describedby="when-err"
          placeholder="YYYY-MM-DD 또는 상시"
        />
        {errors.when && <div id="when-err">{errors.when}</div>}
      </div>
      <div>
        <label htmlFor="how">How</label>
        <textarea
          id="how"
          value={value.how}
          onChange={e => update({ how: e.target.value })}
          rows={3}
          placeholder="브랜드 권한에 따라 숨김 처리, ..."
        />
      </div>
      <div>
        <button type="button" onClick={reset}>초기화</button>
        <button type="button" onClick={() => copy(description)}>복사(설명)</button>
        <button type="button" onClick={copyJson}>복사(JSON)</button>
        {toast && <div role="status">{toast}</div>}
      </div>
    </form>
  );
};
