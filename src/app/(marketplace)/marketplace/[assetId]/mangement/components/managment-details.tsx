import { ScrollArea } from '@/components/ui/scroll-area';

export function ManagmentDetails() {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center">
      <ScrollArea className="h-[75vh] px-4 pb-0">
        {/* Alert Message */}
        <div className="mb-6 rounded-lg bg-gray-100 px-3 py-2">
          <p className="text-[18px]">
            Awaiting approval from You and the Developer Lawyer. Sale is not final until both
            approve.
          </p>
        </div>

        {/* Information Sections */}
        <div className="mx-auto flex w-full max-w-3xl flex-col">
          {/* Basic Information */}
          <div className=" rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Basic Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Location:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Property Name:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Plot Size:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Listing Date:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
            </div>
          </div>

          {/* Ownership Info */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Ownership Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Location:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Property Name:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Plot Size:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Listing Date:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
            </div>
          </div>

          {/* Tokenization Info */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Tokenization Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Location:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Property Name:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Plot Size:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Listing Date:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className="text-sm text-gray-900">Plot 1 - Lea Wharf</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
