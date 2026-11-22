interface Props {
  className?: string
  tone?: 'light' | 'dark'
}

// Wordmark FRIGOJEFE : la segunda «O» es un sensor con su arco verde.
export function Logo({ className = '', tone = 'light' }: Props) {
  const ink = tone === 'light' ? '#F4F5F2' : '#0A0B0C'
  return (
    <span className={`inline-flex items-center font-display font-extrabold tracking-[0.18em] ${className}`} style={{ color: ink }} aria-label="Frigojefe">
      <span aria-hidden>FRIG</span>
      <svg aria-hidden viewBox="0 0 24 24" className="mx-[0.06em] h-[0.82em] w-[0.82em]">
        <circle cx="12" cy="12" r="9" fill="none" stroke={ink} strokeWidth="3.2" />
        <path d="M12 3a9 9 0 0 1 7.8 4.5" fill="none" stroke="#7BD88F" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
      <span aria-hidden>JEFE</span>
    </span>
  )
}
