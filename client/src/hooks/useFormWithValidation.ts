import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function useFormWithValidation<T extends z.ZodType>(
  schema: T,
  defaultValues?: UseFormProps<z.infer<T>>["defaultValues"],
) {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });
}

export type FormWithValidation<T extends z.ZodType> = ReturnType<
  typeof useFormWithValidation<T>
>;
