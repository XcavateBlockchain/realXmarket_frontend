import { Shell } from '@/components/shell';
// import FilterTabs from './filter-tabs';
// import Listings from './components/listings';
import dynamic from 'next/dynamic';

const FilterTabs = dynamic(() => import('./filter-tabs'), { ssr: false });
const Listings = dynamic(() => import('./components/listings'), { ssr: false });

export default function Page() {
  return (
    <Shell variant={'basic'} className="gap-10 pb-32">
      <FilterTabs />
      <div className="flex flex-col gap-6 px-4 md:px-[50px]">
        <div className="flex items-end justify-end">
          <span className="flex items-center gap-2 font-sans text-[1rem]">
            Sort: Recommended
            <SortIcon />
          </span>
        </div>
        <Listings />
      </div>
    </Shell>
  );
}

const SortIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="11"
    viewBox="0 0 21 11"
    fill="none"
  >
    <path
      opacity="0.8"
      d="M17.25 5.55078C17.25 5.74969 17.171 5.94046 17.0303 6.08111C16.8897 6.22176 16.6989 6.30078 16.5 6.30078H4.5C4.30109 6.30078 4.11032 6.22176 3.96967 6.08111C3.82902 5.94046 3.75 5.74969 3.75 5.55078C3.75 5.35187 3.82902 5.1611 3.96967 5.02045C4.11032 4.8798 4.30109 4.80078 4.5 4.80078H16.5C16.6989 4.80078 16.8897 4.8798 17.0303 5.02045C17.171 5.1611 17.25 5.35187 17.25 5.55078ZM20.25 0.300781H0.75C0.551088 0.300781 0.360322 0.379799 0.21967 0.520451C0.0790176 0.661104 0 0.851869 0 1.05078C0 1.24969 0.0790176 1.44046 0.21967 1.58111C0.360322 1.72176 0.551088 1.80078 0.75 1.80078H20.25C20.4489 1.80078 20.6397 1.72176 20.7803 1.58111C20.921 1.44046 21 1.24969 21 1.05078C21 0.851869 20.921 0.661104 20.7803 0.520451C20.6397 0.379799 20.4489 0.300781 20.25 0.300781ZM12.75 9.30078H8.25C8.05109 9.30078 7.86032 9.3798 7.71967 9.52045C7.57902 9.6611 7.5 9.85187 7.5 10.0508C7.5 10.2497 7.57902 10.4405 7.71967 10.5811C7.86032 10.7218 8.05109 10.8008 8.25 10.8008H12.75C12.9489 10.8008 13.1397 10.7218 13.2803 10.5811C13.421 10.4405 13.5 10.2497 13.5 10.0508C13.5 9.85187 13.421 9.6611 13.2803 9.52045C13.1397 9.3798 12.9489 9.30078 12.75 9.30078Z"
      fill="#4E4E4E"
    />
  </svg>
);
