// 'use client';
// import * as React from 'react';
// import { ChevronsUpDown, Plus } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from '@/components/ui/command';
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from '@/components/ui/popover';

// interface AdvancedSelectorProps {
//   value?: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
//   presets: string[];
// }

// export function AdvancedSelector({
//   value,
//   onChange,
//   placeholder = 'Select or create...',
//   presets,
// }: AdvancedSelectorProps) {
//   const [options, setOptions] = React.useState<string[]>(presets);
//   const [open, setOpen] = React.useState(false);
//   const [search, setSearch] = React.useState('');

//   const handleEnter = () => {
//     if (!search.trim()) return;

//     const match = options.find(
//       (opt) => opt.toLowerCase() === search.toLowerCase()
//     );

//     if (match) {
//       onChange(match);
//     } else {
//       setOptions((prev) => [...prev, search]);
//       onChange(search);
//     }

//     setSearch('');
//     setOpen(false);
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild className="w-full cursor-pointer">
//         <Button variant="outline" className="justify-between">
//           {value || placeholder}
//           <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent
//         className="p-0 w-(--radix-popover-trigger-width)"
//         align="start"
//       >
//         <Command>
//           <CommandInput
//             placeholder="Search or create..."
//             value={search}
//             onValueChange={setSearch}
//             onKeyDown={(e) => {
//               const hasActive = document.querySelector(
//                 '[cmdk-item][aria-selected="true"]'
//               );

//               if (e.key === 'Enter' && !hasActive) {
//                 e.preventDefault();
//                 handleEnter();
//               }
//             }}
//           />

//           <CommandList>
//             <CommandEmpty>
//               <div className="p-2 flex flex-col gap-2">
//                 <span>No results.</span>
//                 <Button
//                   size="sm"
//                   onClick={handleEnter}
//                   disabled={!search.trim()}
//                 >
//                   <Plus className="h-4 w-4 mr-1" /> Add “{search}”
//                 </Button>
//               </div>
//             </CommandEmpty>

//             <CommandGroup>
//               {options.map((opt) => (
//                 <CommandItem
//                   className="cursor-pointer"
//                   key={opt}
//                   value={opt}
//                   onSelect={(selected) => {
//                     onChange(selected);
//                     setSearch('');
//                     setOpen(false);
//                   }}
//                 >
//                   {opt}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }

'use client';
import * as React from 'react';
import { ChevronsUpDown, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

interface AdvancedSelectorProps {
  value?: string | string[]; // <-- updated
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  presets: string[];
  multi?: boolean; // <-- new
}

export function AdvancedSelector({
  value,
  onChange,
  placeholder = 'Select or create...',
  presets,
  multi = false,
}: AdvancedSelectorProps) {
  const [options, setOptions] = React.useState<string[]>(presets);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const selectedValues = Array.isArray(value) ? value : [];

  const toggleValue = (opt: string) => {
    if (!multi) {
      onChange(opt);
      setOpen(false);
      return;
    }

    const exists = selectedValues.includes(opt);

    if (exists) {
      onChange(selectedValues.filter((v) => v !== opt));
    } else {
      onChange([...selectedValues, opt]);
    }
  };

  const handleEnter = () => {
    if (!search.trim()) return;

    const match = options.find(
      (opt) => opt.toLowerCase() === search.toLowerCase()
    );

    const newValue = match || search;

    if (!match) setOptions((prev) => [...prev, search]);

    toggleValue(newValue);
    setSearch('');

    if (!multi) setOpen(false);
  };

  const displayValue = multi
    ? selectedValues.length
      ? selectedValues.join(', ')
      : placeholder
    : (value as string) || placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full cursor-pointer">
        <Button variant="outline" className="justify-between">
          {displayValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="p-0 w-(--radix-popover-trigger-width)"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder="Search or create..."
            value={search}
            onValueChange={setSearch}
            onKeyDown={(e) => {
              const hasActive = document.querySelector(
                '[cmdk-item][aria-selected="true"]'
              );

              if (e.key === 'Enter' && !hasActive) {
                e.preventDefault();
                handleEnter();
              }
            }}
          />

          <CommandList>
            <CommandEmpty>
              <div className="p-2 flex flex-col gap-2">
                <span>No results.</span>
                <Button
                  size="sm"
                  onClick={handleEnter}
                  disabled={!search.trim()}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add “{search}”
                </Button>
              </div>
            </CommandEmpty>

            <CommandGroup>
              {options.map((opt) => {
                const selected = multi && selectedValues.includes(opt);

                return (
                  <CommandItem
                    key={opt}
                    value={opt}
                    className="cursor-pointer flex justify-between"
                    onSelect={() => toggleValue(opt)}
                  >
                    {opt}
                    {selected && <Check className="w-4 h-4 text-primary" />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
