export type FrequencyId =
  | "one-time"
  | "every-week"
  | "every-other-week"
  | "every-month"
  | "every-quarter"
  | "every-year"
  | "custom";

export type CustomFrequencyUnit = "days" | "weeks" | "months" | "years";

export type DateMode = "one-day" | "multiple-days";

export type FrequencyOption = {
  id: FrequencyId;
  label: string;
  fullWidth?: boolean;
};

export const FREQUENCY_OPTIONS: FrequencyOption[] = [
  { id: "one-time", label: "One time" },
  { id: "every-week", label: "Every week" },
  { id: "every-other-week", label: "Every other week" },
  { id: "every-month", label: "Every month" },
  { id: "every-quarter", label: "Every quarter" },
  { id: "every-year", label: "Every year" },
  { id: "custom", label: "Custom", fullWidth: true },
];

export const CUSTOM_FREQUENCY_UNITS: {
  value: CustomFrequencyUnit;
  label: string;
}[] = [
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" },
  { value: "months", label: "Months" },
  { value: "years", label: "Years" },
];
