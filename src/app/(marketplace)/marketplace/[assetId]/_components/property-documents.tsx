import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

export default function PropertyDocuments() {
  return (
    <div className="flex w-full flex-col items-start md:w-1/2">
      <div className="w-full">
        <Tabs defaultValue="map">
          <TabsList variant={'simple'}>
            <TabsTrigger variant={'simple'} value="map">
              <Image
                src={'/icons/portfolio.svg'}
                alt="map_icon"
                width={24}
                height={24}
                priority
              />{' '}
              Map
            </TabsTrigger>
            <TabsTrigger variant={'simple'} value="floor_plan">
              <Image src={'/icons/id.svg'} alt="map_icon" width={24} height={24} priority />
              Floor plan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="pt-6">
            <Image
              src={'/images/map.png'}
              alt="map"
              width={630}
              height={424}
              className="h-full w-full object-cover"
              priority
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
