import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface AuthFormFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export const AuthFormField = ({
  form,
  name,
  label,
  type = "text",
  placeholder,
}: AuthFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-pycharm-text">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              className="bg-pycharm-bg border-pycharm-border text-pycharm-text"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
};