export default function Loader({ size = 16, label }) {
  return (
    <span className="loader" style={{ width: size, height: size }} role="status" aria-label={label ?? 'loading'}>
      <span className="loader__spinner" />
    </span>
  )
}
