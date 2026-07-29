export default function Input({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  label,
  error,
  min,
  max
}) {
  return (
    <label className="field">
      {label && <span className="field__label">{label}</span>}
      <input
        className={`field__input ${error ? 'field__input--error' : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
      />
      {error && <span className="field__error">{error}</span>}
    </label>
  )
}
