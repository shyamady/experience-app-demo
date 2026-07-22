import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Experiences · meuse",
  description: "Your attendee dashboard for creator experiences",
};

export default function AttendeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
