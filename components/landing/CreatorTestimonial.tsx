type CreatorTestimonialProps = {
  quote: string;
  creatorName: string;
  isMock?: boolean;
};

export function CreatorTestimonial({
  quote,
  creatorName,
  isMock = false,
}: CreatorTestimonialProps) {
  return (
    <blockquote className="border-l-[3px] border-pink-300 pl-5 sm:pl-6">
      <p className="text-lg leading-relaxed font-medium text-zinc-800 sm:text-[1.2rem] sm:leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="mt-3 flex flex-wrap items-center gap-2">
        <cite className="text-sm font-medium text-zinc-500 not-italic">
          — {creatorName}
        </cite>
        {isMock && (
          <span className="text-[10px] font-medium tracking-wide text-zinc-300 uppercase">
            Mock quote
          </span>
        )}
      </footer>
    </blockquote>
  );
}
