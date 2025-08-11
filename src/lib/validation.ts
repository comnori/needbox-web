const vagueWords = ['개선', '정리'];
const effectKeywords = ['시간', '비용', '오류', '만족도'];
const whenEnum = ['상시', '월간', '분기'];

export const validateWhat = (what: string): { ok: boolean; reason?: string } => {
  const trimmed = what.trim();
  if (trimmed.length < 15 || trimmed.length > 120) {
    return { ok: false, reason: '15~120자 범위로 입력하세요.' };
  }
  if (vagueWords.includes(trimmed)) {
    return { ok: false, reason: '모호한 표현은 허용되지 않습니다. (예: ‘개선’ 단독)' };
  }
  return { ok: true };
};

export const validateWhy = (why: string): { ok: boolean; reason?: string } => {
  const trimmed = why.trim();
  if (!effectKeywords.some(k => trimmed.includes(k))) {
    return { ok: false, reason: '효과 키워드(시간/비용/오류/만족도) 중 하나를 포함하세요.' };
  }
  if (trimmed.length > 400) {
    return { ok: false, reason: '400자 이내로 입력하세요.' };
  }
  return { ok: true };
};

export const validateWhen = (when?: string): { ok: boolean; reason?: string } => {
  if (!when) return { ok: true };
  const trimmed = when.trim();
  if (whenEnum.includes(trimmed)) return { ok: true };
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return { ok: true };
  return { ok: false, reason: 'YYYY-MM-DD 또는 상시/월간/분기로 입력하세요.' };
};

export const validateForm = (v: {
  what: string; why: string; who?: string[]; where?: string; when?: string; how?: string;
}): { ok: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  const w = validateWhat(v.what);
  if (!w.ok && w.reason) errors.what = w.reason;
  const y = validateWhy(v.why);
  if (!y.ok && y.reason) errors.why = y.reason;
  const d = validateWhen(v.when);
  if (!d.ok && d.reason) errors.when = d.reason;
  return { ok: Object.keys(errors).length === 0, errors };
};
