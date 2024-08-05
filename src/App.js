import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Login from './components/Auth/Login';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';
import PomodoroTimer from './components/pomodoro/PomodoroTimer';
import AIAssistant from './components/AI/AIAssistant';
import { useAuth } from './context/AuthContext';
import './styles/globals.css';
import './styles/index.css';
import './styles/Login.css';
import './styles/PomodoroTimer.css';
import './styles/TaskList.css';
const AppContent = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-container">
      
      <header className="app-header">
        <h1>Todo App Avanzada</h1>
        <button onClick={logout} className="logout-btn">Cerrar sesión</button>
      </header>
      <main className="app-main">
        <section className="timer-section">
          <h2>Pomodoro Timer</h2>
          <PomodoroTimer />
        </section>
        <section className="tasks-section">
          <h2> Proyectos </h2>
          {/* <TaskForm /> */}
          <TaskList />
        </section>
        <section className="ai-section">
          <h2>Asistente AI</h2>
          <AIAssistant />
        </section>
      </main>
    </div>
    
  );
};

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;