import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FC } from "react";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: FC<InputProps> = (
  {
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
  }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          { ...register(id, { required }) }
          className={`
            form-input block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6
            ${errors[id] && 'focus:ring-rose-500'}
            ${disabled && 'opacity-50 cursor-not-allowed'}
          `}
        />
      </div>
    </div>
  );
}
export default Input;