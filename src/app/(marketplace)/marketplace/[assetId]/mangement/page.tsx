import { Shell } from '@/components/shell';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeftIcon, Link } from 'lucide-react';
import { ManagmentDetails } from './components/managment-details';
import ManagementMessage from './components/managment-message';

const tabs = ['details', 'message', 'documents', 'actions'];

export default function PropertyManagement({ params }: { params: { assetId: string } }) {
  return (
    <Shell variant={'basic'} className="px-[50px]">
      <Tabs
        defaultValue="details"
        orientation="vertical"
        className="grid flex-1 items-stretch md:grid-cols-[195px_1fr]"
      >
        {/* <div className="sticky top-0 order-1 flex flex-col gap-6 "> */}
        <div className="sticky top-0 ">
          <TabsList
            variant="vertical"
            className="h-screen border-r border-[#4E4E4E]/10 px-[30px] py-10"
          >
            <Button
              variant={'text'}
              size={'icon'}
              className="size-7 rounded-full bg-[#4E4E4E]/10"
              asChild
            >
              <Link href={`/marketplace/${params.assetId}`}>
                <ArrowLeftIcon className="size-4" />
              </Link>
            </Button>
            {tabs.map(tab => (
              <TabsTrigger variant={'vertical'} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* </div> */}

        <div className="flex flex-1 grow flex-col">
          <TabsContent value="details">
            <ManagmentDetails />
          </TabsContent>
          <TabsContent value="message">
            <ManagementMessage />
          </TabsContent>
          <TabsContent value="documents">
            <p className="px-4 py-3 text-xs text-muted-foreground">
              Content for Documents Tab
            </p>
          </TabsContent>
          <TabsContent value="actions">
            <p className="px-4 py-3 text-xs text-muted-foreground">Content for Actions Tab</p>
          </TabsContent>
        </div>
      </Tabs>
    </Shell>
  );
}
