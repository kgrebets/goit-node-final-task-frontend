export default function IngredientCard({ name, measure, img }) {
  return (
    <div className="flex items-center gap-4 w-[152px] md:w-[178px] min-w-0">
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
      <div className="flex-1 min-w-0 leading-tight">
        <p className="text-primary break-words line-clamp-2">{name}</p>
        {measure && <p className="mt-1 text-sm text-tertiary">{measure}</p>}
      </div>
    </div>
  );
}
