import { Suspense } from 'react';
import PropertyForm from './components/property-form';

export default function Page() {
  return (
    <div className="container relative mx-auto flex min-h-screen max-w-screen-2xl flex-col items-center gap-10 px-4 py-[140px] md:px-4 lg:gap-16 lg:px-[150px]">
      <Suspense fallback={null}>
        <PropertyForm />
      </Suspense>
    </div>
  );
}
