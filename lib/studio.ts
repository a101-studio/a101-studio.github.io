export const studio = {
  name: "A101 Studio",
  email: "hello@a101.studio",
};

export const contactSubjects = [
  { id: "storytelling", label: "Storytelling" },
  { id: "light", label: "Playing with light" },
  { id: "other", label: "Other" },
] as const;

export type ContactSubject = (typeof contactSubjects)[number]["id"];
