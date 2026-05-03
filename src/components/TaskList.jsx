import { PRIORITY_COLORS, STATUS_COLORS } from '../constants/taskOptions';
import { formatDateKorean } from '../lib/dateUtils';

export const TaskList = ({ tasks, onEdit, onDelete }) => (
  <section className="panel">
    <h2>업무 목록</h2>
    {tasks.length === 0 ? (
      <p>등록된 업무가 없습니다.</p>
    ) : (
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.content}</p>
              <small>{formatDateKorean(task.date)}</small>
            </div>
            <div className="badges">
              <span style={{ background: PRIORITY_COLORS[task.priority] }}>{task.priority}</span>
              <span style={{ background: STATUS_COLORS[task.status] }}>{task.status}</span>
            </div>
            <div className="actions">
              <button onClick={() => onEdit(task)}>상세/수정</button>
              <button onClick={() => onDelete(task.id)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </section>
);
