export const renderDescription = (v: {
  what: string; why: string; who?: string[]; where?: string; when?: string; how?: string;
}) => [
  `[What] : ${v.what}`,
  `[Why]  : ${v.why}`,
  `[Who]  : ${v.who && v.who.length ? v.who.join(', ') : '-'}`,
  `[Where]: ${v.where?.trim() || '-'}`,
  `[When] : ${v.when?.trim() || '-'}`,
  `[How]  : ${v.how?.trim() || '-'}`
].join('\n');
