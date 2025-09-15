interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  return <span className={`text-sm text-[#e53434] ${className}`}>{message}</span>;
}
