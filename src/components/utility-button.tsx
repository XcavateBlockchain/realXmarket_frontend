import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';

const buttonVariants = cva(
  'inline-flex w-full h-[228px] flex-col items-center justify-center gap-2 rounded-lg border transition-colors duration-300 px-16 py-12',
  {
    variants: {
      variant: {
        investor: 'border-primary-200 bg-transparent hover:bg-primary-200 hover:text-white',
        developer: 'border-primary-400 bg-transparent hover:bg-primary-400 hover:text-white',
        agent: 'border-primary-300 bg-transparent hover:bg-primary-300 hover:text-white',
        lawyer: 'border-primary bg-transparent hover:bg-primary hover:text-white'
      }
    },
    defaultVariants: {
      variant: 'investor'
    }
  }
);

interface AccountTypeButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  account: 'developer' | 'investor' | 'agent' | 'lawyer';
  icon: string;
  disabled?: boolean;
}

export function AccountTypeButton({
  variant,
  account,
  icon,
  disabled = false,
  className,
  ...props
}: AccountTypeButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      disabled={disabled}
      {...props}
    >
      <div className="flex size-[100px] items-center justify-center rounded-full bg-white">
        <Image
          src={icon}
          alt={account}
          width={100}
          height={100}
          //   className="pointer-events-none"
        />
      </div>
      <span className="font-mona text-[1.125rem]/[1.5rem] font-semibold capitalize">
        {account}
      </span>
    </button>
  );
}
