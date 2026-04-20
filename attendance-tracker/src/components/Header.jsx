import styles from './Header.module.css';
import { formatDate } from '../utils/helpers';

export default function Header({ stats }) {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logoMark}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="1" y="1" width="9" height="9" rx="2.5" fill="var(--accent)" opacity="0.9"/>
              <rect x="12" y="1" width="9" height="9" rx="2.5" fill="var(--accent)" opacity="0.5"/>
              <rect x="1" y="12" width="9" height="9" rx="2.5" fill="var(--accent)" opacity="0.5"/>
              <rect x="12" y="12" width="9" height="9" rx="2.5" fill="var(--accent)" opacity="0.25"/>
            </svg>
          </div>
          <div>
            <h1 className={styles.title}>Attendance Tracker</h1>
            <p className={styles.date}>{formatDate()}</p>
          </div>
        </div>
        <div className={styles.semester}>
          <span className={styles.semBadge}>Spring 2025</span>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Total Students" value={stats.total} icon="👥" />
        <StatCard label="Avg Attendance" value={`${stats.avg}%`} icon="📊" accent={stats.avg >= 75 ? 'green' : 'red'} />
        <StatCard label="Good Standing" value={stats.good} icon="✅" accent="green" />
        <StatCard label="At Risk" value={stats.risk} icon="⚠️" accent="amber" />
        <StatCard label="Critical" value={stats.critical} icon="🚨" accent="red" />
      </div>
    </header>
  );
}

function StatCard({ label, value, icon, accent }) {
  const accentMap = {
    green: 'var(--green)',
    red: 'var(--red)',
    amber: 'var(--amber)',
  };
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div
        className={styles.statValue}
        style={accent ? { color: accentMap[accent] } : {}}
      >
        {value}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}
