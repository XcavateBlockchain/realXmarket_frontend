import { Shell } from '@/components/shell';

export default function PropertyInfoFees() {
  return (
    <Shell>
      <div className={'flex w-full max-w-screen-lg flex-col items-start justify-center gap-6'}>
        <h1 className=" text-3xl font-bold">RealXmarket Property Info & Fees</h1>
        <p>
          <strong> Price per token</strong> <br />
          This price is based on the Listing price divided by the total number of tokens for
          that specific property.
        </p>
        <p>
          <strong> Fees on investment</strong> <br />
          Investors pay 1% of the actual sale price of the property token each time the
          property token is sold. Buyers pay 1% of the actual purchase price of the property
          token each time the property token is sold.
        </p>
        <p>
          <strong>Listing price</strong> <br />
          This price is set by the property owner (usually the real estate developer) when the
          asset is initially listed.
        </p>
        <p>
          <strong>Rental yield</strong> <br />
          This figure is based on the total property Rental income x 12 months / Listing price.
          The amount received will be relative to the number of property tokens owned versus
          the total number of property tokens minted at time of listing. The income is not
          guaranteed and could go down as well as up.
        </p>
        <p>
          <strong>Tokens available</strong> <br />
          This is based on the number of tokens originally minted for the property minus the
          number already sold
        </p>
        <p>
          <strong>Property type</strong> <br />
          This indicates which type of property the investment relates to - for instance ….
          <br />
          <ul className="ml-6 list-disc">
            <li>Apartment</li>
            <li>House</li>
            <li>Bungalow</li>
          </ul>
        </p>
        <p>
          <strong>Area prices</strong> <br />
          There is a comparison price bar on similar properties in the same area. Data is
          supplied using RightMove Plus and is only displayed as a guide. Investors should do
          their own due diligence and research to ensure they are comfortable any property
          token investment is the right choice for them.
        </p>
        <p>
          <strong>Rental income</strong> <br />
          This price is set by the property owner (usually the real estate developer) when the
          asset is initially listed. The amount received will be relative to the number of
          property tokens owned versus the total number of property tokens minted at time of
          listing. The income is not guaranteed and could go down as well as up.
        </p>
        <strong> Rental demand</strong> <br />
        There is a rental demand comparison bar on similar properties in the same area. Data is
        supplied using RightMove Plus and is only displayed as a guide. Investors should do
        their own due diligence and research to ensure they are comfortable any property token
        investment is the right choice for them.
      </div>
    </Shell>
  );
}
