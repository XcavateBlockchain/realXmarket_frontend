import PropertyCard from '@/components/cards/property-card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AgentProperties({
  searchParams: { status }
}: {
  searchParams: { status: string };
}) {
  const types = ['NEWLY LISTED', 'UNDER INSTRUCTION', 'RENTED'];

  const BASE_URL = '/developer/properties';
  const selected = status === undefined ? 'NEWLY LISTED' : status;
  return (
    <div className="w-full space-y-10">
      <div className="flex w-full items-start gap-6 border-b border-primary-foreground/[0.10] px-2">
        {types.map((type: string) => {
          const active = selected === type;
          return (
            <Link
              key={type}
              href={`${BASE_URL}?status=${type}`}
              className={cn(
                'flex items-center justify-center px-2 pb-2 text-[1rem]/[1.5rem] uppercase',
                active ? 'text-primary' : 'text-caption'
              )}
            >
              {type}
            </Link>
          );
        })}
      </div>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </div>
    </div>
  );
}
