import { getCalendarGrid, toDateKey } from '../lib/dateUtils';

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

export const CalendarView = ({ currentMonth, selectedDate, onSelectDate, taskCountByDate }) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const grid = getCalendarGrid(year, month);

  return (
    <section className="panel">
      <h2>월간 달력</h2>
      <div className="calendar-grid header">
        {weekdays.map((w) => (
          <div key={w} className="weekday">{w}</div>
        ))}
      </div>
      <div className="calendar-grid body">
        {grid.map((date) => {
          const key = toDateKey(date);
          const isCurrentMonth = date.getMonth() === month;
          const isSelected = key === selectedDate;
          const count = taskCountByDate[key] || 0;

          return (
            <button
              key={key}
              className={`date-cell ${isCurrentMonth ? '' : 'dim'} ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectDate(key)}
            >
              <span>{date.getDate()}</span>
              {count > 0 && <small>{count}건</small>}
            </button>
          );
        })}
      </div>
    </section>
  );
};
