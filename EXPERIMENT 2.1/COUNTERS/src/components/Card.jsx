export default function Card({ title, eyebrow, action, children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || eyebrow || action) && (
        <div className="card__header">
          <div>
            {eyebrow && <span className="card__eyebrow">{eyebrow}</span>}
            {title && <h3 className="card__title">{title}</h3>}
          </div>
          {action && <div className="card__action">{action}</div>}
        </div>
      )}
      <div className="card__body">{children}</div>
    </div>
  )
}
