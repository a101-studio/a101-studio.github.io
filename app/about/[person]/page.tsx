import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PersonProfile } from "@/components/about/PersonProfile";
import { getPerson, people } from "@/lib/people";

type PersonPageProps = {
  params: Promise<{ person: string }>;
};

export function generateStaticParams() {
  return people.map((person) => ({ person: person.id }));
}

export async function generateMetadata({
  params,
}: PersonPageProps): Promise<Metadata> {
  const { person: id } = await params;
  const person = getPerson(id);
  if (!person) return { title: "About" };
  return {
    title: person.name,
    description: person.brief,
  };
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { person: id } = await params;
  const person = getPerson(id);
  if (!person) notFound();
  return <PersonProfile person={person} />;
}
