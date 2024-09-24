// export default function NEwPRperty () {
//     return (
//         <Form form={form} className="gap-[60px]">
//         <Input label="Property name" />
//         <div className="grid w-full grid-cols-2 gap-2">
//           <SelectInput
//             label="Region"
//             placeholder="select"
//             options={propertyTypes}
//             {...form.register('property_type')}
//           />
//           <SelectInput
//             label="Property Type"
//             placeholder="select"
//             options={propertyTypes}
//             {...form.register('property_type')}
//           />
//         </div>
//         <div className="grid w-full grid-cols-3 gap-2">
//           <Input label="Property Address" placeholder="Street" />
//           <Input label="Town / City" placeholder="Town/City" />
//           <Input label="Postal Code" placeholder="Postal code" />
//         </div>
//         <div className="grid w-full grid-cols-3 gap-2">
//           <Input label="local authority" placeholder="e.g" />
//           <Input label="title deed number" placeholder="e.g" />
//           <Input label="google map link" placeholder="e.g" />
//         </div>

//         <div className="flex flex-col">
//           <span className="font-mona text-[18px]/[24px] font-semibold">Property Images</span>
//           <Separator className="mb-8 mt-4" />
//           <FileInput name="Upload Images" isMultiple />
//         </div>
//         <div className="grid w-full grid-cols-3 gap-4">
//           <Input label="INTERNAL AREA" placeholder="" />
//           <Input label="FINISHING QUALITY" placeholder="" />
//           <Input label="CONSTRUCTION DATE" placeholder="" />
//           <Input label="OFF STREET PARKING" placeholder="" />
//           <Input label="PROPERTY TYPE" placeholder="" />
//         </div>
//         <div className="flex w-full flex-col">
//           <span className="font-mona text-[18px]/[24px] font-semibold">
//             Property Description
//           </span>
//           <Separator className="mb-8 mt-4" />
//           <Textarea placeholder="description" />
//         </div>
//       </Form>
//     )
// }
