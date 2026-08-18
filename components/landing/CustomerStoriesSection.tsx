import { CUSTOMER_STORIES } from "@/lib/landing/customer-stories";
import { CustomerStory } from "@/components/landing/CustomerStory";

export function CustomerStoriesSection() {
  return (
    <section
      id="customer-stories"
      className="border-t border-pink-50/80 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-pink-500 uppercase">
            Customer Stories
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Creators launching meaningful projects with their communities.
          </h2>
        </div>

        <div className="mt-14 space-y-20 sm:mt-16 sm:space-y-28">
          {CUSTOMER_STORIES.map((story, index) => (
            <CustomerStory key={story.id} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
