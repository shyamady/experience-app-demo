"use client";

import { AttendeeShell } from "@/components/attendee/AttendeeShell";
import { ExperienceCard } from "@/components/attendee/ExperienceCard";
import { getMockExperiences } from "@/lib/attendee/mock-data";

export function AttendeeExperiencesScreen() {
  const experiences = getMockExperiences();

  return (
    <AttendeeShell
      title="My Experiences"
      subtitle="All your purchased creator experiences in one place."
    >
      <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id + experience.orderId}
            experience={experience}
            defaultExpanded={index === 0}
          />
        ))}
      </div>
    </AttendeeShell>
  );
}
