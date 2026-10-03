export function TicketNotice({ message, onClear }: { message: string; onClear: () => void }) {
  if (!message) return null
  return (
    <p
      role="status"
      className="rounded-xl border border-border bg-card px-3 py-2 text-sm shadow-sm"
    >
      {message}
      <button type="button" className="sr-only" onClick={onClear}>
        dismiss
      </button>
    </p>
  )
}
