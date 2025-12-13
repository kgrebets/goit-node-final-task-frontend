import sprite from '../../assets/sprite.svg';

function Icon({ name, size = 20, width, height, className = '', color, ...props }) {
  const iconWidth = width || size;
  const iconHeight = height || size;

  return (
    <svg
      className={`icon icon-${name} ${className}`.trim()}
      width={iconWidth}
      height={iconHeight}
      style={color ? { color } : undefined}
      aria-hidden="true"
      {...props}
    >
      <use href={`${sprite}#icon-${name}`} />
    </svg>
  );
}

export default Icon;

