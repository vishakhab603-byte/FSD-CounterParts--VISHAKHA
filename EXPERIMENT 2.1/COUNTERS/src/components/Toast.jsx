export default function Toast({ message, tone = 'info', visible }) {
  if (!visible) return null
  return (
    <div className={`toast toast--${tone}`} role="status">
      {message}
    </div>
  )
}
