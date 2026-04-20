import './index.css';
import { useStudents } from './hooks/useStudents';
import Header from './components/Header';
import Controls from './components/Controls';
import StudentTable from './components/StudentTable';
import DetailPanel from './components/DetailPanel';
import styles from './App.module.css';

export default function App() {
  const {
    filteredStudents,
    students,
    loading,
    error,
    filter, setFilter,
    selectedStudent, toggleSelected,
    showLowAttendance, setShowLowAttendance,
    sortMode, setSortMode,
    searchQuery, setSearchQuery,
    stats,
  } = useStudents();

  if (error) {
    return (
      <div className={styles.errorPage}>
        <div className={styles.errorIcon}>⚡</div>
        <h2 className={styles.errorTitle}>Connection Error</h2>
        <p className={styles.errorMsg}>{error}</p>
        <button className={styles.retryBtn} onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.appShell}>
      <div className={styles.container}>
        <Header stats={stats} />
        <Controls
          filter={filter} setFilter={setFilter}
          sortMode={sortMode} setSortMode={setSortMode}
          showLowAttendance={showLowAttendance} setShowLowAttendance={setShowLowAttendance}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          resultCount={filteredStudents.length}
          totalCount={students.length}
        />
        <div className={`${styles.mainLayout} ${selectedStudent ? styles.withPanel : ''}`}>
          <div className={styles.tableArea}>
            <StudentTable
              students={filteredStudents}
              selectedStudent={selectedStudent}
              onSelect={toggleSelected}
              loading={loading}
            />
          </div>
          {selectedStudent && (
            <div className={styles.panelArea}>
              <DetailPanel
                student={selectedStudent}
                onClose={() => toggleSelected(selectedStudent)}
              />
            </div>
          )}
        </div>
        <footer className={styles.footer}>
          <span>Attendance Tracker · Spring 2025</span>
          <span>Data from <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noreferrer">JSONPlaceholder</a></span>
        </footer>
      </div>
    </div>
  );
}
