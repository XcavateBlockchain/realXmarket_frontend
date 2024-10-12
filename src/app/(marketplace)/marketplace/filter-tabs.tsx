'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
type SelectLabelType = React.ComponentProps<'select'> & React.ComponentProps<'label'>;

const filters = [
  {
    label: 'PROPERTY PRICE',
    options: [
      {
        name: 'All',
        value: 'all'
      }
    ]
  },
  {
    label: 'Property Type',
    options: [
      {
        name: 'All',
        value: 'all'
      },
      {
        name: 'Apartment',
        value: 'apartment'
      },
      {
        name: 'Flat',
        value: 'flat'
      }
    ]
  },
  {
    label: 'Token Price',
    options: [
      {
        name: 'All',
        value: 'all'
      }
    ]
  },
  {
    label: 'COUNTRY',
    options: [
      {
        name: 'All',
        value: 'all'
      },
      {
        name: 'United kingdom',
        value: 'United kingdom'
      }
    ]
  },
  {
    label: 'TOWN CIT',
    options: [
      {
        name: 'All',
        value: 'all'
      },
      {
        name: 'London',
        value: 'london'
      }
    ]
  }
];

export default function FilterTabs() {
  return (
    <>
      <div className="hidden w-full grid-cols-5 gap-6 border-b px-4 pb-10 md:px-[50px] lg:grid">
        {filters.map((filter, index) => (
          <FilterSelect
            key={index}
            label={filter.label}
            placeholder="Show all"
            options={filter.options}
          />
        ))}
      </div>
    </>
  );
}

export interface SelectProps extends SelectLabelType {
  label: string;
  options?: { name: string; value: string }[];
  placeholder: string;
}

const FilterSelect = ({ label, options, placeholder, htmlFor }: SelectProps) => {
  return (
    <div className="isolate flex w-full flex-col gap-2">
      {label ? (
        <label htmlFor={htmlFor} className="text-[16px]/[24px] font-medium uppercase">
          {label}
        </label>
      ) : null}
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options?.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
