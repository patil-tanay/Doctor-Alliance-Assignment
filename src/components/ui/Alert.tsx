interface AlertProps {
  type: 'error' | 'success';
  message: string;
}

export function Alert({ type, message }: AlertProps) {
  if (!message) return null;

  const styles = {
    error: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
  };

  return (
    <div className={`${styles[type]} px-4 py-3 rounded mb-4 border`}>
      {message}
    </div>
  );
}