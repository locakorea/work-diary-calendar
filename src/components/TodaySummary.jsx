export const TodaySummary = ({ todayTasks }) => {
  const done = todayTasks.filter((t) => t.status === '완료').length;

  return (
    <section className="panel summary">
      <h2>오늘의 업무 요약</h2>
      <p>오늘 등록된 업무: <strong>{todayTasks.length}</strong>건</p>
      <p>완료된 업무: <strong>{done}</strong>건</p>
      <p>미완료 업무: <strong>{todayTasks.length - done}</strong>건</p>
    </section>
  );
};
