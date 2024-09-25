import MarketCard from '@/components/cards/market-card';
import { getActiveProperties, getAllOngoingListings } from '@/lib/queries';
// import { connectWebSocket } from '@/lib/websocket';

import { FetchedProperty, Property } from '@/types';

export const maxDuration = 300;
export default async function Marketplace() {
  // function handleWebSocketMessage(event: MessageEvent) {
  //   const data = JSON.parse(event.data);
  //   console.log('Received data:', data);
  //   // Handle the received data
  // }

  // connectWebSocket(
  //   `${process.env.NEXT_PUBLIC_RPC_URL}`,
  //   handleWebSocketMessage
  // );
  const data = await getAllOngoingListings();
  console.log('ALL ONGOING LISTINGS', data);
  const properties = (await getActiveProperties()) as FetchedProperty[];

  // console.log(properties);

  return (
    <>
      <div className="container mt-12 w-[95%] py-10 sm:mt-20 ">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 uppercase text-gray-800">Property Price</label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 uppercase text-gray-800">Property Type</label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 uppercase text-gray-800">Token Price</label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 uppercase text-gray-800">Country</label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-0 uppercase text-gray-800">Town/City</label>
            <select className="rounded-md border border-gray-500 px-2 py-3 shadow-sm outline-none focus:ring">
              <option value="all">Show all</option>
              <option value="bello">Bello</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex w-[95%] flex-col py-10 lg:max-w-screen-2xl">
        {/* <div className="flex w-full flex-col items-center justify-center gap-4">
          <h1 className="bg-[linear-gradient(90deg,_#ecb278_-25.47%,_#dc7da6_35.16%,_#3b4f74_69.39%,_#57a0c5_103.47%)] bg-clip-text text-center font-mona font-black uppercase text-transparent md:text-[1.875rem]/[2.5rem] lg:text-[2.5rem]/[3.5rem]">
            Market Place
          </h1>
          <p className="text-[1.125rem]/[1.5rem] md:text-center lg:text-balance">
            Find the investment that’s right for you
          </p>
        </div> */}
        <div className="grid grid-cols-1 gap-4 sm:mt-0 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property: FetchedProperty) => (
            <MarketCard key={property.itemId} {...property} />
          ))}
        </div>
      </div>

      {/* <div className="px-4 sm:px-6 lg:px-10">
        <h1 className="bg-[linear-gradient(90deg,_#ecb278_-25.47%,_#dc7da6_35.16%,_#3b4f74_69.39%,_#57a0c5_103.47%)] bg-clip-text  text-center font-mona  text-[40px]/[48px] uppercase">
          Market Place
        </h1>
        <p className="sm:text-md mt-2 text-center text-sm sm:text-3xl">
          Find the investment that’s right for you
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-40 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property: FetchedProperty) => (
            <MarketCard key={property.itemId} {...property} />
          ))}
    
        </div>
      </div> */}
    </>
  );
}
