import styles from './StudentTable.module.css';
import { getAttendanceLevel, getStatusLabel, getLevelColors } from '../utils/helpers';

export default function StudentTable({ students, selectedStudent, onSelect, loading }) {
  if (loading) return <LoadingSkeleton />;
  if (!students.length) return <EmptyState />;

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.colStudent}>Student</th>
            <th className={styles.colId}>ID</th>
            <th className={styles.colAttendance}>Attendance</th>
            <th className={styles.colStatus}>Status</th>
            <th className={styles.colSessions}>Sessions</th>
            <th className={styles.colContact}>Contact</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <StudentRow
              key={student.id}
              student={student}
              isSelected={selectedStudent?.id === student.id}
              onSelect={onSelect}
              index={i}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StudentRow({ student, isSelected, onSelect, index }) {
  const level = getAttendanceLevel(student.pct);
  const statusLabel = getStatusLabel(student.pct);
  const colors = getLevelColors(level);
  const [bgColor, textColor] = student.color;

  return (
    <tr
      className={`${styles.row} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect(student)}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <td className={styles.colStudent}>
        <div className={styles.studentCell}>
          <div
            className={styles.avatar}
            style={{ background: bgColor, color: textColor }}
          >
            {student.initials}
          </div>
          <div className={styles.studentInfo}>
            <div className={styles.studentName}>{student.name}</div>
            <div className={styles.studentMeta}>@{student.username} · {student.address.city}</div>
          </div>
        </div>
      </td>

      <td className={styles.colId}>
        <span className={styles.idBadge}>#{String(student.id).padStart(3, '0')}</span>
      </td>

      <td className={styles.colAttendance}>
        <div className={styles.attCell}>
          <div className={styles.attBar}>
            <div
              className={styles.attFill}
              style={{
                width: `${student.pct}%`,
                background: colors.color,
                opacity: level === 'high' ? 0.8 : 1,
              }}
            />
          </div>
          <span className={styles.attPct} style={{ color: colors.color }}>
            {student.pct}%
          </span>
        </div>
      </td>

      <td className={styles.colStatus}>
        <span
          className={styles.statusBadge}
          style={{
            background: colors.bg,
            color: colors.color,
            border: `0.5px solid ${colors.border}`,
          }}
        >
          <span
            className={styles.statusDot}
            style={{ background: colors.color }}
          />
          {statusLabel}
        </span>
      </td>

      <td className={styles.colSessions}>
        <span className={styles.sessions}>
          {student.attended}
          <span className={styles.sessionTotal}>/{student.total}</span>
        </span>
      </td>

      <td className={styles.colContact}>
        <span className={styles.email} title={student.email}>{student.email}</span>
      </td>
    </tr>
  );
}

function LoadingSkeleton() {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.colStudent}>Student</th>
            <th className={styles.colId}>ID</th>
            <th className={styles.colAttendance}>Attendance</th>
            <th className={styles.colStatus}>Status</th>
            <th className={styles.colSessions}>Sessions</th>
            <th className={styles.colContact}>Contact</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, i) => (
            <tr key={i} className={styles.row}>
              <td className={styles.colStudent}>
                <div className={styles.studentCell}>
                  <div className={`${styles.avatar} ${styles.skeleton}`} />
                  <div>
                    <div className={`${styles.skelLine} ${styles.skelName}`} />
                    <div className={`${styles.skelLine} ${styles.skelMeta}`} />
                  </div>
                </div>
              </td>
              <td><div className={`${styles.skelLine} ${styles.skelShort}`} /></td>
              <td><div className={`${styles.skelLine} ${styles.skelMed}`} /></td>
              <td><div className={`${styles.skelLine} ${styles.skelShort}`} /></td>
              <td><div className={`${styles.skelLine} ${styles.skelShort}`} /></td>
              <td><div className={`${styles.skelLine} ${styles.skelMed}`} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState() {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>🔍</div>
      <div className={styles.emptyTitle}>No students found</div>
      <div className={styles.emptyDesc}>Try adjusting your filters or search query</div>
    </div>
  );
}
