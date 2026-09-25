export type PersonLink = {
  label: string;
  href: string;
};

export type Person = {
  id: string;
  name: string;
  role: string;
  grade: string;
  portrait: {
    src: string;
    fallback: string;
    alt: string;
  };
  quote: string;
  brief: string;
  beliefs: string[];
  interests: string[];
  works: Array<{
    src: string;
    fallback: string;
    alt: string;
  }>;
  follows: PersonLink[];
  art: PersonLink[];
  music: PersonLink[];
};

export const people: Person[] = [
  {
    id: "jun",
    name: "Jun",
    role: "Unique Storytelling",
    grade: "grade-storytelling",
    portrait: {
      src: "/assets/people/jun/portrait.webp",
      fallback: "/assets/people/jun/portrait.jpg",
      alt: "Portrait of Jun",
    },
    quote: "I wait for the second just after someone decides to stay.",
    brief:
      "Jun looks for the human beat inside a room — the glance, the breath, the thing that happens when nobody is performing. The pictures are warm, close, and a little unfinished on purpose.",
    beliefs: [
      "A story is already happening. We only have to arrive in time.",
      "If a frame feels polite, it is usually a lie.",
      "Sound is part of the picture, even when the picture is still.",
    ],
    interests: [
      "Hands in mid-motion",
      "Windows at the end of the day",
      "People who forget the camera is there",
      "The quiet after a laugh",
    ],
    works: [
      {
        src: "/assets/storytelling/gallery/02.webp",
        fallback: "/assets/storytelling/gallery/02.jpg",
        alt: "Cherished still by Jun",
      },
      {
        src: "/assets/storytelling/gallery/05.webp",
        fallback: "/assets/storytelling/gallery/05.jpg",
        alt: "Cherished still by Jun",
      },
      {
        src: "/assets/storytelling/gallery/08.webp",
        fallback: "/assets/storytelling/gallery/08.jpg",
        alt: "Cherished still by Jun",
      },
    ],
    follows: [
      { label: "Nan Goldin", href: "https://en.wikipedia.org/wiki/Nan_Goldin" },
      { label: "Saidu Tejan-Thomas Jr.", href: "https://www.saidutj.com/" },
    ],
    art: [
      { label: "Andrew Wyeth", href: "https://en.wikipedia.org/wiki/Andrew_Wyeth" },
    ],
    music: [
      { label: "Grouper", href: "https://grouper.bandcamp.com/" },
      { label: "Cleo Sol", href: "https://cleosol.bandcamp.com/" },
    ],
  },
  {
    id: "mira",
    name: "Mira",
    role: "Playing with Light",
    grade: "grade-light",
    portrait: {
      src: "/assets/people/mira/portrait.webp",
      fallback: "/assets/people/mira/portrait.jpg",
      alt: "Portrait of Mira",
    },
    quote: "Light is not decoration. It is the subject wearing another body.",
    brief:
      "Mira treats seeing as an experiment. How a bee might read a flower, how a room looks when the sun is almost gone, how color splits if you refuse the polite version of it.",
    beliefs: [
      "Every animal sees a different film of the same street.",
      "Overexposure is a kind of honesty.",
      "If the color is too correct, look again.",
    ],
    interests: [
      "Hard sun through cheap glass",
      "Sodium lamps and wet pavement",
      "UV-adjacent color that humans almost miss",
      "Long lenses that flatten a crowd into pattern",
    ],
    works: [
      {
        src: "/assets/light/gallery/01.webp",
        fallback: "/assets/light/gallery/01.jpg",
        alt: "Cherished still by Mira",
      },
      {
        src: "/assets/light/gallery/04.webp",
        fallback: "/assets/light/gallery/04.jpg",
        alt: "Cherished still by Mira",
      },
      {
        src: "/assets/light/gallery/07.webp",
        fallback: "/assets/light/gallery/07.jpg",
        alt: "Cherished still by Mira",
      },
    ],
    follows: [
      { label: "James Turrell", href: "https://jamesturrell.com/" },
      { label: "Viviane Sassen", href: "https://www.vivianesassen.com/" },
    ],
    art: [
      { label: "Olafur Eliasson", href: "https://olafureliasson.net/" },
    ],
    music: [
      { label: "Oneohtrix Point Never", href: "https://pointnever.com/" },
      { label: "FKA twigs", href: "https://www.fkatwi.gs/" },
    ],
  },
  {
    id: "eli",
    name: "Eli",
    role: "Other ways of seeing",
    grade: "grade-dreamlike",
    portrait: {
      src: "/assets/people/eli/portrait.webp",
      fallback: "/assets/people/eli/portrait.jpg",
      alt: "Portrait of Eli",
    },
    quote: "I want the picture to remember a time that has not happened yet.",
    brief:
      "Eli works in the leftover light — grain, glow, double rooms, the feeling of a place you have already left. The work is nostalgic and a little future-tense at the same time.",
    beliefs: [
      "Memory is a grade, not a fact.",
      "A blur can be more precise than a sharp edge.",
      "If it feels like a dream, stay long enough to take notes.",
    ],
    interests: [
      "Empty corridors after closing",
      "Neon against old film stock",
      "Weather that erases the horizon",
      "Objects that look like they are waiting",
    ],
    works: [
      {
        src: "/assets/dreamlike/gallery/03.webp",
        fallback: "/assets/dreamlike/gallery/03.jpg",
        alt: "Cherished still by Eli",
      },
      {
        src: "/assets/dreamlike/gallery/06.webp",
        fallback: "/assets/dreamlike/gallery/06.jpg",
        alt: "Cherished still by Eli",
      },
      {
        src: "/assets/dreamlike/gallery/09.webp",
        fallback: "/assets/dreamlike/gallery/09.jpg",
        alt: "Cherished still by Eli",
      },
    ],
    follows: [
      { label: "Wong Kar-wai", href: "https://en.wikipedia.org/wiki/Wong_Kar-wai" },
      { label: "Rinko Kawauchi", href: "https://www.rinkokawauchi.com/" },
    ],
    art: [
      { label: "Hiroshi Sugimoto", href: "https://www.sugimotohiroshi.com/" },
    ],
    music: [
      { label: "Boards of Canada", href: "https://boardsofcanada.bandcamp.com/" },
      { label: "Dean Blunt", href: "https://en.wikipedia.org/wiki/Dean_Blunt" },
    ],
  },
];

export function getPerson(id: string): Person | undefined {
  return people.find((person) => person.id === id);
}
