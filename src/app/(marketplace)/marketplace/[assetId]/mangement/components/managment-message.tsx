'use client';

import { Button } from '@/components/ui/button';
import Form, { useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNodeContext } from '@/context';
import { useSendTransaction } from '@/hooks/use-send-txt';
import { STATE_STATUS } from '@/types';
import { CircleCheckIcon, SendIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

export default function ManagementMessage() {
  const params = useParams<{ assetId: string }>();
  const [success, setSuccess] = useState<STATE_STATUS>(STATE_STATUS.IDLE);

  const form = useZodForm({
    schema: z.object({
      message: z.string().min(1)
    })
  });

  const { api } = useNodeContext();
  const { sendTransactionAsync } = useSendTransaction();

  async function handleSubmit(vote: number) {
    if (!api) return;
    setSuccess(STATE_STATUS.LOADING);
    try {
      const extrinsic = api.tx.marketplace.lawyerConfirmDocuments(
        Number(params.assetId),
        vote
      );
      const receipt = await sendTransactionAsync({
        extrinsic: extrinsic as any
      });
      if (receipt.status !== 'success') {
        setSuccess(STATE_STATUS.ERROR);
        throw new Error(receipt.errorMessage);
      }
      setSuccess(STATE_STATUS.SUCCESS);
      toast.success('Transaction successful');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
      setSuccess(STATE_STATUS.ERROR);
    }
  }
  return (
    <div className="flex h-full">
      {/* Left Panel - Status Navigation */}
      <div className="w-[408PX] border-r border-gray-200 bg-white p-4">
        <div className="space-y-4">
          <div className="flex w-full flex-col gap-2 rounded-lg bg-gray-100 px-2 py-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Pending Legal Sign-off</h3>
              <span className="text-xs text-gray-500">5:02 AM</span>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-gray-900">Approval & Documentation</h3>
              <p className="mt-1 text-xs text-gray-500">You Developer lawyer...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Activity Log */}
      <div className="flex-1 bg-white p-6">
        <ScrollArea className="h-[75vh] pb-0">
          <div className="space-y-6">
            {/* Lawyer's First Message */}
            <div className="flex justify-start">
              <div className="max-w-md">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm font-medium text-green-600">Lawyer</span>
                  <span className="text-xs text-gray-500">Sent Aug 5, 2025, 10:16 AM</span>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-sm text-gray-900">
                    I&apos;ve reviewed your property listing for Plot 1 lea wharf. Before we
                    can proceed, please upload the Land Title Certificate and Approved Building
                    Plan. These documents are required to finalize the legal review and proceed
                    with token issuance.
                  </p>
                </div>
              </div>
            </div>

            {/* System Notification */}
            <div className="flex justify-center">
              <div className="rounded-full bg-gray-50 px-4 py-2">
                <p className="text-xs text-gray-500">A new document has been uploaded</p>
              </div>
            </div>

            {/* User's Message */}
            <div className="flex justify-end">
              <div className="max-w-md">
                <div className="mb-2 flex items-center justify-end gap-2">
                  <span className="text-xs text-gray-500">Sent Aug 5, 2025, 12:24 PM</span>
                </div>
                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-sm text-gray-900">
                    I have the documents ready. Uploading now. Let me know if anything else is
                    required.
                  </p>
                </div>
              </div>
            </div>

            {/* Lawyer's Second Message */}
            <div className="flex justify-start">
              <div className="max-w-md">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm font-medium text-green-600">Lawyer</span>
                  <span className="text-xs text-gray-500">Sent Aug 5, 2025, 12:43 PM</span>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-sm text-gray-900">
                    I&apos;m starting document review now. Expect my signed consent in 24-48
                    hours unless I find material issues
                  </p>
                </div>
              </div>
            </div>

            {/* Lawyer's Third Message */}
            <div className="flex justify-start">
              <div className="max-w-md">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm font-medium text-green-600">Lawyer</span>
                  <span className="text-xs text-gray-500">Sent Aug 5, 2025, 01:43 PM</span>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-sm text-gray-900">
                    Expect my signed consent in -24-48 hours unless I find material issues
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex w-full flex-col gap-[42px]">
          <Form form={form}>
            <div className="*:not-first:mt-2">
              <div className="relative">
                <Input
                  name="message"
                  id={'message'}
                  className="pe-9"
                  placeholder="Email"
                  type="email"
                />
                <button
                  className="focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <SendIcon size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </Form>

          <div className="flex w-full items-center gap-2.5">
            <Button
              className="bg-[#457461] hover:bg-[#457461]/90"
              fullWidth
              onClick={() => handleSubmit(1)}
              disabled={success === STATE_STATUS.LOADING}
            >
              Approve
            </Button>
            <Button
              className="bg-[#FF544B] hover:bg-[#FF544B]/90"
              fullWidth
              onClick={() => handleSubmit(0)}
              disabled={success === STATE_STATUS.LOADING}
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
