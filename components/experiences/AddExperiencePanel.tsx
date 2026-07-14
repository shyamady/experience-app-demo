"use client";

import { useState } from "react";
import {
  EXPERIENCE_IMAGES,
  EXPERIENCE_TEMPLATES,
  type ExperienceProduct,
} from "@/lib/onboarding/experiences";

type AddExperiencePanelProps = {
  city: string;
  onAdd: (product: ExperienceProduct) => void;
  onClose: () => void;
};

const fieldClassName =
  "w-full rounded-xl border border-pink-100 bg-white px-3 py-2 text-sm text-zinc-900 shadow-meuse-chip focus:border-pink-300 focus:outline-none";

function createId(): string {
  return `exp-${Math.random().toString(36).slice(2, 9)}`;
}

function personalizeTitle(city: string, title: string): string {
  if (title === "Online Access") return `${city} Online Access`;
  if (title === "In-Person Experience") return `${city} In-Person Experience`;
  return title;
}

export function AddExperiencePanel({
  city,
  onAdd,
  onClose,
}: AddExperiencePanelProps) {
  const defaultTemplate = EXPERIENCE_TEMPLATES[0];
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplate.id);
  const [title, setTitle] = useState(() =>
    personalizeTitle(city, defaultTemplate.title),
  );
  const [description, setDescription] = useState(defaultTemplate.description);
  const [price, setPrice] = useState(defaultTemplate.price);
  const [spots, setSpots] = useState<string>(
    defaultTemplate.spots === "unlimited"
      ? "unlimited"
      : String(defaultTemplate.spots),
  );
  const [category, setCategory] = useState(defaultTemplate.category);

  function applyTemplate(templateId: string) {
    const template = EXPERIENCE_TEMPLATES.find((item) => item.id === templateId);
    if (!template) return;

    setSelectedTemplate(templateId);
    setCategory(template.category);
    setTitle(personalizeTitle(city, template.title));
    setDescription(template.description);
    setPrice(template.price);
    setSpots(
      template.spots === "unlimited" ? "unlimited" : String(template.spots),
    );
  }

  function handleAdd() {
    if (!title.trim()) return;

    const template = EXPERIENCE_TEMPLATES.find(
      (item) => item.id === selectedTemplate,
    );

    onAdd({
      id: createId(),
      category,
      title: title.trim(),
      description: description.trim(),
      price,
      spots: spots === "unlimited" ? "unlimited" : Number(spots),
      imageUrl: EXPERIENCE_IMAGES[template?.imageKey ?? "travel"],
      active: true,
    });
    onClose();
  }

  return (
    <div className="rounded-meuse border-2 border-dashed border-pink-200 bg-meuse-hint p-4 sm:p-5">
      <h3 className="text-sm font-semibold text-zinc-900">Add another experience</h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {EXPERIENCE_TEMPLATES.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => applyTemplate(template.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              selectedTemplate === template.id
                ? "bg-rose-50 text-pink-700 ring-2 ring-pink-300"
                : "bg-white text-zinc-600 shadow-meuse-chip hover:border-pink-100"
            }`}
          >
            {template.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          className={fieldClassName}
        />
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
          rows={2}
          className={`${fieldClassName} resize-none`}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min={0}
            value={price}
            onChange={(event) => setPrice(Number(event.target.value) || 0)}
            placeholder="Price"
            className={fieldClassName}
          />
          <select
            value={spots}
            onChange={(event) => setSpots(event.target.value)}
            className={fieldClassName}
          >
            <option value="unlimited">Unlimited</option>
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-full px-5 py-2 text-sm font-semibold text-white meuse-gradient-bg"
        >
          Add experience
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full px-5 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
