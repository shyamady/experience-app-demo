"use client";

import { useEffect, useRef, useState } from "react";
import type { CustomerStory as CustomerStoryType } from "@/lib/landing/customer-stories";
import { CustomerStoryMetadata } from "@/components/landing/CustomerStoryMetadata";
import { CreatorProfile } from "@/components/landing/CreatorProfile";
import { CreatorTestimonial } from "@/components/landing/CreatorTestimonial";
import { VerticalVideoPlaceholder } from "@/components/landing/VerticalVideoPlaceholder";

type CustomerStoryProps = {
  story: CustomerStoryType;
  index: number;
};

export function CustomerStory({ story, index }: CustomerStoryProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const contentFirst = story.layout === "content-left";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const content = (
    <div className="space-y-5 sm:space-y-6">
      <CustomerStoryMetadata items={story.metadata} />

      <div>
        <h3 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-[1.75rem]">
          {story.eventTitle}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-zinc-600">
          {story.description}
        </p>
      </div>

      <CreatorProfile {...story.creator} />

      <CreatorTestimonial
        quote={story.testimonial.quote}
        creatorName={story.creator.name}
        isMock={story.testimonial.isMock}
      />
    </div>
  );

  const video = <VerticalVideoPlaceholder />;

  return (
    <article
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        {contentFirst ? (
          <>
            <div>{content}</div>
            <div className="flex justify-center lg:justify-end">{video}</div>
          </>
        ) : (
          <>
            <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
              {video}
            </div>
            <div className="order-1 lg:order-2">{content}</div>
          </>
        )}
      </div>
    </article>
  );
}
