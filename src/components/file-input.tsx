'use client';

import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ClickAnimation from './click-animation';
import { cn } from '@/lib/utils';
import { Icons } from './icons';
import { toast } from 'sonner';
import Image from 'next/image';
import { Button } from './ui/button';
import { FileText } from 'lucide-react';

const FILE_TYPE_NAMES = {
  'image/png': 'PNG',
  'image/jpeg': 'JPEG',
  'image/webp': 'WEBP',
  'application/pdf': 'PDF'
};

export enum MimeTypes {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  WEBP = 'image/webp',
  PDF = 'application/pdf'
}

type IFileInput = {
  name?: string;
  types?: MimeTypes[];
  isMultiple?: boolean;
  maxFileSize?: number;

  disabled?: boolean;
  // handleFileChange: (files: File[]) => void;
};

const FileInput = ({
  types = [MimeTypes.PNG, MimeTypes.JPEG, MimeTypes.WEBP],
  maxFileSize = 50,
  name = 'Upload image',
  // handleFileChange,
  isMultiple = false,
  disabled
}: IFileInput) => {
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const show = isMultiple === false ? files.length !== 2 : files.length !== 4;

  console.log(files);

  const handleButtonClick = () => {
    if (documentInputRef.current) {
      documentInputRef.current.click();
    }
  };

  const handleDocumentDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const fileEvent = { target: { files: event.dataTransfer.files } };
      onImageChange(fileEvent);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files.length > 4) {
        toast.error(`File size should be less than ${maxFileSize}MB`);
        return;
      }
      const { acceptable, unacceptable } = validateFiles(
        Array.from(event.target.files),
        maxFileSize
      );

      if (unacceptable.length > 0) {
        toast.error(`File size should be less than ${maxFileSize}MB`);
      } else {
        setFiles(prevState => {
          return [...prevState, ...acceptable];
        });
        // handleFileChange(files);
      }
    }
  };

  return (
    <div className="grid h-full w-full grid-cols-4 gap-2">
      <FileDisplay files={files} types={types} />
      {show ? (
        <>
          <div
            className={cn(
              'flex h-[240px] min-w-[240px] flex-col items-center gap-2.5 rounded-lg border border-dashed border-primary bg-white px-[31px] py-[50px] transition-colors duration-300'
            )}
            onDrop={handleDocumentDrop}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragOver(false)}
          >
            <motion.div animate={{ scale: isDragOver ? 1.5 : 1 }}>
              <Icons.uploadIcon className="size-8 text-[#57A0C5]" />
            </motion.div>

            <p className="flex flex-col gap-1 self-stretch text-center">
              <span className="text-center text-sm font-medium tracking-[-0.084px] text-[#57A0C5]">
                Choose a file or drag & drop it here.
              </span>
              <span className="text-primary-750 text-xs font-normal">
                {types
                  .map(type => FILE_TYPE_NAMES[type])
                  .join(', ')
                  .replace(/,([^,]*)$/, ' or$1')}
                . to {maxFileSize}MB
              </span>
            </p>

            <ClickAnimation
              onClick={handleButtonClick}
              className="shadow-fade-dark flex items-center justify-center rounded-lg border border-primary bg-white px-4 py-[6px]"
            >
              <span className="px-1 text-center text-sm font-medium tracking-[-0.084px]">
                {name}
              </span>
            </ClickAnimation>
          </div>
          <input
            ref={documentInputRef}
            id="file-input"
            type="file"
            accept={types.join(',')}
            className="hidden"
            multiple={isMultiple}
            onChange={onImageChange}
          />
        </>
      ) : null}
    </div>
  );
};

export default FileInput;

const validateFiles = (files: File[], maxFileSize: number) => {
  let acceptable: File[] = [];
  let unacceptable: { file: File; reason: string }[] = [];
  files.forEach(file => {
    if (file.size > maxFileSize * 1024 * 1024) {
      unacceptable.push({ file, reason: 'File is too big' });
      return;
    }
    acceptable.push(file);
  });
  return {
    acceptable,
    unacceptable
  };
};

function FileDisplay({ files, types }: { files: File[]; types: MimeTypes[] }) {
  if (files.length <= 0) return;
  return (
    <>
      {files.map(file => {
        return (
          <div className="relative flex h-[240px]  w-full min-w-[240px] rounded-lg border border-dashed">
            <div className="group absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
              {types.includes(MimeTypes.PNG) ||
              types.includes(MimeTypes.JPEG) ||
              types.includes(MimeTypes.WEBP) ? (
                <Image
                  src={URL.createObjectURL(file) as string}
                  fill={true}
                  alt="uploaded image"
                  objectFit="cover"
                  className="cursor-pointer rounded-lg transition group-hover:brightness-50"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FileText size={150} />
                  <p className="text-txt-gray mt-3 line-clamp-1 max-w-[300px] text-center sm:line-clamp-2">
                    {file.name}
                  </p>
                </div>
              )}
              <Button
                variant={'outline'}
                className="absolute opacity-0 group-hover:opacity-100"
              >
                Remove
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
