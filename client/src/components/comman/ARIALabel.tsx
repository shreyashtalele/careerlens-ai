interface ARIALabelProps {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export function ARIALabel({
  id,
  label,
  required = false,
  children,
}: ARIALabelProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

interface ARIAMessageProps {
  id: string;
  message?: string;
  type?: "error" | "success" | "info";
}

export function ARIAMessage({ id, message, type = "error" }: ARIAMessageProps) {
  if (!message) return null;

  const colors = {
    error: "text-red-600",
    success: "text-green-600",
    info: "text-blue-600",
  };

  return (
    <p id={id} className={`text-sm ${colors[type]} mt-1`} role="alert">
      {message}
    </p>
  );
}
