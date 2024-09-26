import Skeleton from '@/components/skelton';

export default function ProductSkeleton() {
  return (
    <div className="container mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col items-start justify-start gap-4 px-4 pt-36 md:px-10">
      <div className="flex flex-col gap-8  md:flex-row">
        <div className="w-full md:w-1/2">
          <Skeleton className="aspect-square w-full" />
        </div>
        <div className="w-full space-y-4 md:w-1/2">
          <Skeleton className="h-10 w-3/4 " />
          <Skeleton className="h-6 w-1/4 " />
          <Skeleton className="h-4 w-1/3 " />
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 " />
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 " />
            <Skeleton className="h-8 w-16 " />
            <Skeleton className="h-8 w-8 " />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-1/2 " />
            <Skeleton className="h-10 w-1/2 " />
          </div>
          <Skeleton className="h-4 w-full " />
          <Skeleton className="h-4 w-full " />
          <Skeleton className="h-4 w-3/4 " />
        </div>
      </div>
    </div>
  );
}
