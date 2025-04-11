
import { useMemo } from "react";
import TaskHeader from "@/components/TaskHeader";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import FilterBar from "@/components/FilterBar";
import { useTasks } from "@/hooks/useTasks";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const { 
    tasks, 
    addTask, 
    toggleTaskStatus, 
    editTask, 
    deleteTask,
    filter,
    setFilter
  } = useTasks();

  const taskCounts = useMemo(() => {
    const all = tasks.length;
    const active = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;

    return { all, active, completed };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-8 px-4 sm:px-6">
        <Toaster />
        
        <TaskHeader />
        
        <main>
          <TaskForm onAddTask={addTask} />
          
          <FilterBar 
            activeFilter={filter} 
            onFilterChange={setFilter} 
            taskCounts={taskCounts} 
          />
          
          <TaskList 
            tasks={tasks}
            onToggleStatus={toggleTaskStatus}
            onEdit={editTask}
            onDelete={deleteTask}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
