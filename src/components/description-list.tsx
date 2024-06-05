export const DescriptionList = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
      <dt className="font-mona text-[1rem]/[1.5rem] font-medium">{title}</dt>
      <dd className="flex w-full shrink-0 items-center justify-between gap-2.5 self-stretch rounded-lg bg-[#E9EBEC] px-4 py-3 text-[1rem]/[1.5rem] lg:w-[660px]">
        {value}
      </dd>
    </div>
  );
};
