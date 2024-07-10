export default function Skeleton({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`animate-pulse rounded bg-foreground/10 ease-in-out ${className}`} />;
}
