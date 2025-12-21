export default function ErrorMessage({
  title = 'Oops! Something went wrong',
  description = 'Please try again later.',
}) {
  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 py-10">
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full rounded-7.5 bg-white px-6 py-10 text-center">
          <h2 className="text-2_75xl font-semibold text-primary">{title}</h2>

          <p className="mt-3 text-sm text-tertiary">{description}</p>
        </div>
      </div>
    </div>
  );
}
