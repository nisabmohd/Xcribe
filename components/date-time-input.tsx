"use client";

import { DateField, DateInput } from "@/components/ui/datefield-rac";
import { Label } from "react-aria-components";

import { DateValue } from "react-aria-components";

export default function DateTimeInput({
  onDateChange,
  value,
}: {
  value: DateValue | null;
  onDateChange: (val: DateValue | null) => void;
}) {
  return (
    <DateField
      className="*:not-first:mt-1.5"
      granularity="minute"
      hourCycle={24}
      value={value}
      onChange={onDateChange}
    >
      <Label className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
        Timestamp
      </Label>
      <DateInput />
    </DateField>
  );
}
