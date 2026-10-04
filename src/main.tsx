import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent uncaught AbortError (from clipboard, cancelled popups, or aborted requests) from crashing applet
window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason?.name === 'AbortError' ||
    event.reason?.code === 20 ||
    (typeof event.reason?.message === 'string' && event.reason.message.toLowerCase().includes('abort'))
  ) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(<App />);
