import { IProperty } from '@/types';

export default function PropertyFeatures({ metadata }: { metadata: IProperty }) {
  return (
    <div className="flex w-full flex-col items-start gap-[45px] md:w-1/2">
      <div className="space-y-4 text-[1.125rem]/[1.5rem]">
        <h1 className="font-mona font-semibold text-[#4E4E4E]">Property Description</h1>
        <p className="font-sans text-[#717171] ">{metadata.property_description}</p>
      </div>
      <div className="w-full space-y-2.5">
        <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold text-[#4E4E4E]">
          Details
        </h1>
        <PropertyInfoDetails title="Blocks" value={metadata.area} />
        <PropertyInfoDetails title="Bedrooms" value={metadata.no_of_Bedrooms} />
        <PropertyInfoDetails title="Bathrooms" value={metadata.no_of_bathrooms} />
        <PropertyInfoDetails title="Type" value={metadata.property_type} />
        <PropertyInfoDetails
          title="Location"
          value={`${metadata.address_street}, ${metadata.address_town_city}`}
        />
      </div>
    </div>
  );
}

const PropertyInfoDetails = ({ title, value }: { title: string; value: any }) => (
  <ul className="flex w-full items-center justify-between border-t border-gray-200 pt-3.5 text-[18px]/[24px]">
    <li className="text-[#717171]">{title}</li>
    <li className="text-[#4E4E4E]">{value}</li>
  </ul>
);
