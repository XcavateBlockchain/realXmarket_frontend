import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const transactions = [
  {
    no: 1,
    action: 'Buy',
    from: 'WS326484dSR....',
    tokenPrice: 10,
    price: '£250,00',
    to: 'A20DFG',
    date: 'May / 07 / 2024'
  },
  {
    no: 2,
    action: 'Buy',
    from: 'WS326484dSR....',
    tokenPrice: 10,
    price: '£250,00',
    to: 'A20DFG',
    date: 'May / 07 / 2024'
  },
  {
    no: 3,
    action: 'Sell',
    from: 'WS326484dSR....',
    tokenPrice: 10,
    price: '£250,00',
    to: 'A20DFG',
    date: 'May / 07 / 2024'
  },
  {
    no: 4,
    action: 'Sell',
    from: 'WS326484dSR....',
    tokenPrice: 10,
    price: '£250,00',
    to: 'A20DFG',
    date: 'May / 07 / 2024'
  },
  {
    no: 5,
    action: 'Sell',
    from: 'WS326484dSR....',
    tokenPrice: 10,
    price: '£250,00',
    to: 'A20DFG',
    date: 'May / 07 / 2024'
  }
];

export default function PropertyTransactionsTable() {
  return (
    <div className="w-full overflow-auto">
      {/* <table className="min-w-full border-separate border-spacing-y-2 border-t-2 border-gray-200 bg-[#FAFAFA] px-4">
        <thead className="border-b lg:table-header-group">
          <tr>
            <td className="whitespace-normal px-4 py-4 text-sm font-medium text-gray-500 sm:text-sm">
              No
            </td>
            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-sm">
              Action
            </td>
            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-sm">
              From
            </td>
            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-sm">
              Token Price
            </td>
            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-sm">
              Price
            </td>
            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-sm">
              To
            </td>
            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-sm">
              Date
            </td>
          </tr>
        </thead>
        <tbody className="bg-[#E2E2E2] lg:border-gray-300">
          {[1, 23, 4, 6, 7, 8].map((_, index) => {
            return (
              <tr key={index} className="rounded-lg bg-[#E2E2E2]">
                <td className="whitespace-no-wrap rounded-l-md px-4 py-4 text-sm text-gray-600 sm:text-sm">
                  01
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-sm">
                  $59.00
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-sm">
                  $59.00
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-sm">
                  $29.00
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-sm">
                  $29.00
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-sm">
                  $29.00
                </td>
                <td className="whitespace-no-wrap rounded-r-md py-4 text-sm text-gray-600 sm:text-sm">
                  $29.00
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>From</TableHead>
            <TableHead>Token price</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={transaction.no}>
              <TableCell className=" rounded-l-lg">{transaction.no}</TableCell>
              <TableCell>{transaction.action}</TableCell>
              <TableCell>{transaction.from}</TableCell>
              <TableCell>{transaction.tokenPrice}</TableCell>
              <TableCell>{transaction.price}</TableCell>
              <TableCell>{transaction.to}</TableCell>
              <TableCell className=" rounded-r-lg">{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
