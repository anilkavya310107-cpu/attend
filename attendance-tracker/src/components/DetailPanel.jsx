import styles from './DetailPanel.module.css';
import { getAttendanceLevel, getStatusLabel, getLevelColors } from '../utils/helpers';

export default function DetailPanel({ student, onClose }) {
  if (!student) return null;

  const level = getAttendanceLevel(student.pct);
  const statusLabel = getStatusLabel(student.pct);
  const colors = getLevelColors(level);
  const [bgColor, textColor] = student.color;
  const absent = student.total - student.attended;

  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (student.pct / 100) * circumference;

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>Student Profile</span>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.profileSection}>
        <div className={styles.avatarLg} style={{ background: bgColor, color: textColor }}>
          {student.initials}
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.profileName}>{student.name}</h2>
          <p className={styles.profileUsername}>@{student.username}</p>
          <span
            className={styles.profileStatus}
            style={{ background: colors.bg, color: colors.color, border: `0.5px solid ${colors.border}` }}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      <div className={styles.ringSection}>
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r="36" fill="none" stroke="var(--bg-hover)" strokeWidth="8"/>
          <circle
            cx="45" cy="45" r="36"
            fill="none"
            stroke={colors.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 45 45)"
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)' }}
          />
          <text x="45" y="41" textAnchor="middle" fontSize="16" fontWeight="700" fill={colors.color} fontFamily="'Syne',sans-serif">{student.pct}%</text>
          <text x="45" y="56" textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="'Instrument Sans',sans-serif">attendance</text>
        </svg>
      </div>

      <div className={styles.statsGrid}>
        <MiniStat label="Attended" value={student.attended} color="var(--green)" />
        <MiniStat label="Absent" value={absent} color="var(--red)" />
        <MiniStat label="Total" value={student.total} color="var(--text-secondary)" />
      </div>

      <div className={styles.divider} />

      <div className={styles.infoSection}>
        <InfoRow icon="✉️" label="Email" value={student.email} />
        <InfoRow icon="📞" label="Phone" value={student.phone} />
        <InfoRow icon="🌐" label="Website" value={student.website} />
        <InfoRow icon="🏢" label="Company" value={student.company.name} />
        <InfoRow icon="📍" label="City" value={`${student.address.city}, ${student.address.zipcode}`} />
        <InfoRow icon="🏠" label="Address" value={`${student.address.street}, ${student.address.suite}`} />
      </div>

      {student.pct < 75 && (
        <div className={styles.alert} style={{ background: colors.bg, borderColor: colors.border }}>
          <span className={styles.alertIcon}>⚠️</span>
          <div>
            <div className={styles.alertTitle} style={{ color: colors.color }}>Attendance Warning</div>
            <div className={styles.alertBody}>
              {student.pct < 50
                ? 'Critical attendance level. Immediate intervention required.'
                : 'Below required threshold. Student needs to attend more classes.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div className={styles.miniStat}>
      <div className={styles.miniStatValue} style={{ color }}>{value}</div>
      <div className={styles.miniStatLabel}>{label}</div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoIcon}>{icon}</span>
      <div className={styles.infoContent}>
        <span className={styles.infoLabel}>{label}</span>
        <span className={styles.infoValue}>{value}</span>
      </div>
    </div>
  );
}
