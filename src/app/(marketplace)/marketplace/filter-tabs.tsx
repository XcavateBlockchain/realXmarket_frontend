'use client';

import { forwardRef } from 'react';
type SelectLabelType = React.ComponentProps<'select'> & React.ComponentProps<'label'>;

const options = [
  {
    name: 'All',
    value: 'all'
  }
];

export default function FilterTabs() {
  return (
    <>
      <div className="hidden w-full grid-cols-5 gap-2 lg:grid ">
        <FilterSelect label="PROPERTY PRICE" placeholder="Show all" options={options} />
        <FilterSelect label="Property Type" placeholder="Show all" options={options} />
        <FilterSelect label="Token Price" placeholder="Show all" options={options} />
        <FilterSelect label="COUNTRY" placeholder="Show all" options={options} />
        <FilterSelect label="TOWN CITY" placeholder="Show all" options={options} />
      </div>
    </>
  );
}

export interface SelectProps extends SelectLabelType {
  label: string;
  options?: { name: string; value: string }[];
  placeholder: string;
}

const FilterSelect = forwardRef<HTMLSelectElement, SelectProps>(function SelectField(
  { label, options, placeholder, htmlFor, ...props },
  ref
) {
  return (
    <div className="isolate flex w-full flex-col gap-2">
      {label ? (
        <label htmlFor={htmlFor} className="text-[16px]/[24px] font-medium uppercase">
          {label}
        </label>
      ) : null}

      <select
        className={
          'focus-visible:ring-ring flex h-10 w-full rounded-md border border-[#A6A6A6] bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
        }
      >
        <option>{placeholder}</option>
        {options &&
          options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
});
