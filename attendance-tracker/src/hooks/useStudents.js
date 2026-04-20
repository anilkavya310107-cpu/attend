import { useState, useEffect } from 'react';

const AVATAR_COLORS = [
  ['#4f46e5','#c7d2fe'], ['#0891b2','#a5f3fc'], ['#059669','#a7f3d0'],
  ['#d97706','#fde68a'], ['#dc2626','#fecaca'], ['#7c3aed','#ddd6fe'],
  ['#db2777','#fbcfe8'], ['#0284c7','#bae6fd'], ['#16a34a','#bbf7d0'],
  ['#b45309','#fef3c7'],
];

function generateAttendance(seed) {
  const pseudo = ((seed * 9301 + 49297) % 233280) / 233280;
  // Realistic distribution: most students 60-95%, some very low
  if (pseudo < 0.15) return Math.round(30 + pseudo * 200); // at-risk: 30-60
  if (pseudo < 0.30) return Math.round(60 + pseudo * 100); // borderline: 60-75
  return Math.round(75 + pseudo * 25); // good: 75-100
}

function generateSessions(seed) {
  const total = 60 + ((seed * 7 + 13) % 41); // 60-100 total sessions
  return total;
}

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showLowAttendance, setShowLowAttendance] = useState(false);
  const [sortMode, setSortMode] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(users => {
        const enriched = users.map((user, i) => {
          const seed = user.id * 137 + i * 31;
          const pct = generateAttendance(seed);
          const total = generateSessions(seed);
          const attended = Math.round((pct / 100) * total);
          const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
          const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
          return { ...user, pct, total, attended, color, initials };
        });
        setStudents(enriched);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  const toggleSelected = (student) => {
    setSelectedStudent(prev => prev?.id === student.id ? null : student);
  };

  const getFiltered = () => {
    let list = [...students];
    if (filter === 'present') list = list.filter(s => s.pct >= 75);
    if (filter === 'absent') list = list.filter(s => s.pct < 75);
    if (showLowAttendance) list = list.filter(s => s.pct < 75);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.username.toLowerCase().includes(q) ||
        s.address.city.toLowerCase().includes(q)
      );
    }
    if (sortMode === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortMode === 'att-desc') list.sort((a, b) => b.pct - a.pct);
    else if (sortMode === 'att-asc') list.sort((a, b) => a.pct - b.pct);
    else if (sortMode === 'id') list.sort((a, b) => a.id - b.id);
    return list;
  };

  const stats = {
    total: students.length,
    avg: students.length ? Math.round(students.reduce((a, b) => a + b.pct, 0) / students.length) : 0,
    good: students.filter(s => s.pct >= 75).length,
    risk: students.filter(s => s.pct < 75).length,
    critical: students.filter(s => s.pct < 50).length,
  };

  return {
    students,
    filteredStudents: getFiltered(),
    loading,
    error,
    filter, setFilter,
    selectedStudent, toggleSelected,
    showLowAttendance, setShowLowAttendance,
    sortMode, setSortMode,
    searchQuery, setSearchQuery,
    stats,
  };
}
