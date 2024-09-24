import { Controller, useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FieldError } from '@/components/field-error';
import { Option } from '@/types';

type SelectInputProps = {
  name: string;
  label: string;
  htmlFor?: string;
  options: Option[] | null;
  placeholder: string;
};

export default function SelectInput({
  name,
  label,
  htmlFor,
  placeholder,
  options
}: SelectInputProps) {
  const { control } = useFormContext();
  return (
    <div className="flex w-full flex-col gap-2">
      {label ? (
        <label htmlFor={htmlFor} className="text-[16px]/[24px] font-medium uppercase">
          {label}
        </label>
      ) : null}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options &&
                  options.map(item => (
                    <SelectItem key={item.label} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      <FieldError name={name} />
    </div>
  );
}
