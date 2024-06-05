import { cn } from '@/lib/utils';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function PageHeader({
  className,
  title,
  description,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn('flex w-full items-center justify-between border-b px-2 pb-2', className)}
      {...props}
    >
      <div className="flex flex-col items-start gap-2">
        <h3 className="font-mona text-[1.125rem]/[1.5rem] font-semibold">{title}</h3>
        <p className="text-[0.875rem]/[1.5rem]">{description}</p>
      </div>
      {children}
    </div>
  );
}
