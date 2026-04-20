import styles from './Controls.module.css';

const FILTERS = [
  { key: 'all', label: 'All Students' },
  { key: 'present', label: 'Present' },
  { key: 'absent', label: 'Absent' },
];

const SORTS = [
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'att-desc', label: 'Attendance ↓' },
  { value: 'att-asc', label: 'Attendance ↑' },
  { value: 'id', label: 'Student ID' },
];

export default function Controls({
  filter, setFilter,
  sortMode, setSortMode,
  showLowAttendance, setShowLowAttendance,
  searchQuery, setSearchQuery,
  resultCount, totalCount,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <div className={styles.filterGroup}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${filter === f.key ? styles.active : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.rightControls}>
          <select
            className={styles.select}
            value={sortMode}
            onChange={e => setSortMode(e.target.value)}
          >
            {SORTS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <label className={styles.toggleWrap}>
            <span className={styles.toggleLabel}>Below 75% only</span>
            <div className={styles.toggle}>
              <input
                type="checkbox"
                checked={showLowAttendance}
                onChange={e => setShowLowAttendance(e.target.checked)}
              />
              <span className={styles.track}>
                <span className={styles.thumb} />
              </span>
            </div>
          </label>
        </div>
      </div>

      <div className={styles.searchRow}>
        <div className={styles.searchWrap}>
          <SearchIcon />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by name, email, or city…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className={styles.clearBtn} onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
        <div className={styles.resultCount}>
          {resultCount === totalCount
            ? `${totalCount} students`
            : `${resultCount} of ${totalCount} students`}
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg className="searchIcon" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', pointerEvents:'none', flexShrink:0 }}>
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
