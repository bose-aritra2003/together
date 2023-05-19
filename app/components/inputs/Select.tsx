'use client';

import { FC } from "react";
import ReactSelect from "react-select";
import { selectTheme, selectStyles } from "@/app/libs/react-select-config";
import makeAnimated from 'react-select/animated';
import clsx from "clsx";
import Avatar from "@/app/components/avatars/Avatar";

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

const Select: FC<SelectProps> = (
  {
    label,
    value,
    onChange,
    options,
    disabled
  }
) => {
  const animatedComponents = makeAnimated();

  return (
    <div className="z-50">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        { label }
      </label>
      <div
        className={clsx(
        "mt-2",
          disabled && "cursor-not-allowed"
        )}
      >
        <ReactSelect
          isMulti
          value={value}
          closeMenuOnSelect={false}
          isDisabled={disabled}
          // @ts-ignore
          onChange={onChange}
          components={animatedComponents}
          options={options}
          // @ts-ignore
          formatOptionLabel={(option: Record<string, any>) => (
            <div className="flex space-x-2 items-center">
              <Avatar user={ option.label } small noStatus/>
              <div>
                <p>{ option.label.name }</p>
                <p className="text-gray-500 text-xs">{ option.label.email }</p>
              </div>

            </div>
          )}
          menuPortalTarget={document.body}
          styles={selectStyles}
          theme={selectTheme}
        />
      </div>
    </div>
  );
}
export default Select;