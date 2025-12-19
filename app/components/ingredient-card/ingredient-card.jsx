export default function IngredientCard({ name, measure, img }) {
  return (
    <div className="flex items-center gap-4">
      {/* Icon */}
      <div
        className="
          h-[75px] w-[75px]
          shrink-0
          rounded-3.75
          border border-tertiary
          bg-white
          flex items-center justify-center
        "
      >
        {img && (
          <img
            src={img}
            alt={name}
            className="max-h-[55px] max-w-[55px] object-contain"
          />
        )}
      </div>

      {/* Text */}
      <div className="leading-tight">
        <p className="text-primary">{name}</p>
        {measure && <p className="mt-1 text-sm text-tertiary">{measure}</p>}
      </div>
    </div>
  );
}
