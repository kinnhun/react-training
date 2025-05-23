import { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

const TOAST_LIMIT = 3;

function App() {
  const { toasts } = useToasterStore();

  // Enforce toast limit
  useEffect(() => {
    toasts
      .filter((t) => t.visible)       // Only visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Over limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss extras
  }, [toasts]);

  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: '14px',
          },
        }}
      />
    </>
  );
}

export default App;
