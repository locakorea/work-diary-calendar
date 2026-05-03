import { useMemo, useState } from 'react';
import { CalendarView } from './components/CalendarView';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TodaySummary } from './components/TodaySummary';
import { useTaskStore } from './hooks/useTaskStore';
import { todayKey } from './lib/dateUtils';

const App = () => {
  const { tasks, addTask, updateTask, deleteTask, todayTasks } = useTaskStore();
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [editingTask, setEditingTask] = useState(null);

  const taskCountByDate = useMemo(
    () => tasks.reduce((acc, task) => ({ ...acc, [task.date]: (acc[task.date] || 0) + 1 }), {}),
    [tasks],
  );

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.date === selectedDate),
    [tasks, selectedDate],
  );

  const onSubmitTask = (task) => {
    if (editingTask) {
      updateTask(editingTask.id, task);
      setEditingTask(null);
      return;
    }
    addTask(task);
  };

  const moveMonth = (delta) => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  return (
    <main className="container">
      <header>
        <h1>업무다이어리 캘린더</h1>
        <div className="row">
          <button onClick={() => moveMonth(-1)}>이전</button>
          <strong>{currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월</strong>
          <button onClick={() => moveMonth(1)}>다음</button>
        </div>
      </header>

      <TodaySummary todayTasks={todayTasks} />
      <CalendarView
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        taskCountByDate={taskCountByDate}
      />
      <TaskForm
        date={selectedDate}
        onSubmit={onSubmitTask}
        selectedTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />
      <TaskList tasks={filteredTasks} onEdit={setEditingTask} onDelete={deleteTask} />
    </main>
  );
};

export default App;
