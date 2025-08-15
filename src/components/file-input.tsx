'use client';

import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ClickAnimation from './click-animation';
import { cn } from '@/lib/utils';
import { Icons } from './icons';
import { toast } from 'sonner';
import Image from 'next/image';
import { Button } from './ui/button';
import { FileText, Trash2 } from 'lucide-react';

const FILE_TYPE_NAMES = {
  'image/png': 'PNG',
  'image/jpg': 'JPG',
  'image/jpeg': 'JPEG',
  'image/webp': 'WEBP',
  'application/pdf': 'PDF'
};

export enum MimeTypes {
  JPG = 'image/jpg',
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  WEBP = 'image/webp',
  PDF = 'application/pdf'
}

type IFileInput = {
  name?: string;
  maxFiles?: number;
  types?: MimeTypes[];
  isMultiple?: boolean;
  maxFileSize?: number;

  disabled?: boolean;
  handleFileChange: (files: File[]) => void;
};

const FileInput = ({
  types = [MimeTypes.PNG, MimeTypes.JPEG, MimeTypes.WEBP, MimeTypes.JPG],
  maxFileSize = 50,
  name = 'Upload image',
  handleFileChange,
  isMultiple = false,
  maxFiles = 4,
  disabled
}: IFileInput) => {
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const show = isMultiple === false ? files.length !== 1 : files.length !== maxFiles;

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
      if (event.target.files.length > maxFiles) {
        toast.error(`Maximum ${maxFiles} files allowed`);
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
          handleFileChange([...prevState, ...acceptable]);
          return [...prevState, ...acceptable];
        });
        // handleFileChange((prevState: File[]) => {
        //   return [...prevState, ...acceptable];
        // });
      }
    }
  };

  return (
    <>
      <FileDisplay files={files} types={types} setFiles={setFiles} />
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
                  .replace(/,([^,]*)$/, ' or$1')}{' '}
                MAX {maxFileSize}MB
              </span>
            </p>

            <ClickAnimation
              onClick={handleButtonClick}
              className="flex items-center justify-center rounded-lg border border-primary bg-white px-4 py-[6px] shadow-primary-foreground hover:shadow"
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
    </>
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

function FileDisplay({
  files,
  types,
  setFiles
}: {
  files: File[];
  types: MimeTypes[];
  setFiles: any;
}) {
  if (files.length <= 0) return;

  function onRemove(index: number) {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  }

  return (
    <>
      {files.map((file, index) => {
        return (
          <div
            key={index}
            className={cn(
              'relative flex size-[240px] min-w-[240px] rounded-lg border border-dashed',
              {
                'w-full': files.length > 1
              }
            )}
          >
            <div className="group absolute inset-0 flex items-center justify-center">
              {types.includes(MimeTypes.PNG) ||
              types.includes(MimeTypes.JPEG) ||
              types.includes(MimeTypes.JPG) ||
              types.includes(MimeTypes.WEBP) ? (
                <Image
                  src={URL.createObjectURL(file) as string}
                  fill={true}
                  alt="uploaded image"
                  objectFit="cover"
                  className="cursor-pointer rounded-lg transition group-hover:brightness-50"
                />
              ) : (
                <div className="flex flex-col items-center justify-center px-2">
                  <FileText size={150} />
                  <p className="mt-3 line-clamp-1 max-w-[240px] text-center sm:line-clamp-2">
                    {file.name}
                  </p>
                </div>
              )}
              <Button
                type="button"
                variant={'outline'}
                size={'icon'}
                className="absolute border-red-400 bg-black text-red-400 opacity-0 shadow-none group-hover:opacity-100"
                onClick={() => onRemove(index)}
              >
                <Trash2 size={32} />
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
