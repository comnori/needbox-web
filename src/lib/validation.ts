const vagueWords = ['개선', '정리'];
const effectKeywords = ['시간', '비용', '오류', '만족도'];
const whenEnum = ['상시', '월간', '분기'];

export const validateWhat = (what: string): { ok: boolean; reason?: string } => {
  const trimmed = what.trim();
  if (trimmed.length === 0) {
    return { ok: false, reason: 'What 필드는 필수입니다.' };
  }
  if (trimmed.length < 15 || trimmed.length > 120) {
    return { ok: false, reason: '15~120자 범위로 입력하세요.' };
  }
  if (vagueWords.includes(trimmed)) {
    return { ok: false, reason: '모호한 표현은 허용되지 않습니다. (예: "개선" 단독)' };
  }
  return { ok: true };
};

export const validateWhy = (why: string): { ok: boolean; reason?: string } => {
  const trimmed = why.trim();
  if (trimmed.length === 0) {
    return { ok: false, reason: 'Why 필드는 필수입니다.' };
  }
  if (trimmed.length > 400) {
    return { ok: false, reason: '400자 이내로 입력하세요.' };
  }
  return { ok: true };
};

export const validateWho = (who: string[]): { ok: boolean; reason?: string } => {
  // Who는 선택사항이지만, 입력 시 검증
  if (who.length === 0) return { ok: true }; // 선택사항
  if (who.some(person => person.trim().length === 0)) {
    return { ok: false, reason: '빈 태그는 허용되지 않습니다.' };
  }
  if (who.length > 10) {
    return { ok: false, reason: '최대 10개의 사용자 그룹만 입력 가능합니다.' };
  }
  return { ok: true };
};

export const validateWhere = (where: string): { ok: boolean; reason?: string } => {
  // Where는 선택사항이지만, 입력 시 검증
  if (!where || where.trim().length === 0) return { ok: true }; // 선택사항
  const trimmed = where.trim();
  if (trimmed.length > 100) {
    return { ok: false, reason: '100자 이내로 입력하세요.' };
  }
  return { ok: true };
};

export const validateWhen = (when?: string): { ok: boolean; reason?: string } => {
  if (!when || when.trim().length === 0) return { ok: true }; // 선택사항
  const trimmed = when.trim();
  if (whenEnum.includes(trimmed)) return { ok: true };
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    // 날짜가 오늘 이후인지 확인
    const inputDate = new Date(trimmed);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
    if (inputDate < today) {
      return { ok: false, reason: '오늘 이후의 날짜를 선택하세요.' };
    }
    return { ok: true };
  }
  return { ok: false, reason: 'YYYY-MM-DD 또는 상시/월간/분기로 입력하세요.' };
};

export const validateHow = (how: string): { ok: boolean; reason?: string } => {
  // How는 선택사항이지만, 입력 시 검증
  if (!how || how.trim().length === 0) return { ok: true }; // 선택사항
  const trimmed = how.trim();
  if (trimmed.length > 500) {
    return { ok: false, reason: '500자 이내로 입력하세요.' };
  }
  return { ok: true };
};

export const validateForm = (v: {
  what: string; 
  why: string; 
  who: string[]; 
  where: string; 
  when: string; 
  how: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  // 모든 필드 검증
  const whatResult = validateWhat(v.what);
  if (!whatResult.ok && whatResult.reason) errors.what = whatResult.reason;
  
  const whyResult = validateWhy(v.why);
  if (!whyResult.ok && whyResult.reason) errors.why = whyResult.reason;
  
  const whoResult = validateWho(v.who);
  if (!whoResult.ok && whoResult.reason) errors.who = whoResult.reason;
  
  const whereResult = validateWhere(v.where);
  if (!whereResult.ok && whereResult.reason) errors.where = whereResult.reason;
  
  const whenResult = validateWhen(v.when);
  if (!whenResult.ok && whenResult.reason) errors.when = whenResult.reason;
  
  const howResult = validateHow(v.how);
  if (!howResult.ok && howResult.reason) errors.how = howResult.reason;
  
  // 필수 필드 체크: What과 Why만 필수
  const hasRequiredFields = v.what.trim().length > 0 && v.why.trim().length > 0;
  const hasNoErrors = Object.keys(errors).length === 0;
  
  return { 
    isValid: hasRequiredFields && hasNoErrors, 
    errors 
  };
};