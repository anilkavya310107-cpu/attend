export function getAttendanceLevel(pct) {
  if (pct >= 75) return 'high';
  if (pct >= 50) return 'mid';
  return 'low';
}

export function getStatusLabel(pct) {
  if (pct >= 75) return 'Present';
  if (pct >= 50) return 'At Risk';
  return 'Absent';
}

export function getLevelColors(level) {
  if (level === 'high') return { color: 'var(--green)', bg: 'var(--green-bg)', border: 'var(--green-border)' };
  if (level === 'mid') return { color: 'var(--amber)', bg: 'var(--amber-bg)', border: 'var(--amber-border)' };
  return { color: 'var(--red)', bg: 'var(--red-bg)', border: 'var(--red-border)' };
}

export function formatDate() {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
}
