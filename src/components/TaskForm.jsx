import { TASK_PRIORITIES, TASK_STATUSES } from '../constants/taskOptions';

export const TaskForm = ({ date, onSubmit, selectedTask, onCancelEdit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const task = Object.fromEntries(formData.entries());
    onSubmit(task);
    if (!selectedTask) e.currentTarget.reset();
  };

  return (
    <section className="panel">
      <h2>{selectedTask ? '업무 수정' : '날짜별 업무일지 작성'}</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <input name="date" type="date" defaultValue={selectedTask?.date ?? date} required />
        <input name="title" placeholder="업무 제목" defaultValue={selectedTask?.title ?? ''} required />
        <textarea name="content" placeholder="업무 내용" defaultValue={selectedTask?.content ?? ''} rows={3} required />
        <div className="row">
          <select name="priority" defaultValue={selectedTask?.priority ?? '보통'}>
            {TASK_PRIORITIES.map((priority) => <option key={priority}>{priority}</option>)}
          </select>
          <select name="status" defaultValue={selectedTask?.status ?? '예정'}>
            {TASK_STATUSES.map((status) => <option key={status}>{status}</option>)}
          </select>
        </div>
        <textarea name="memo" placeholder="메모" defaultValue={selectedTask?.memo ?? ''} rows={2} />
        <div className="row">
          <button type="submit">{selectedTask ? '저장' : '추가'}</button>
          {selectedTask && <button type="button" onClick={onCancelEdit}>취소</button>}
        </div>
      </form>
    </section>
  );
};
