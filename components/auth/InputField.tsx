import { NextPage } from 'next';
import React from 'react';

interface InputFieldType {
  title: string;
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type: string;
  value: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: NextPage<InputFieldType> = ({
  title,
  name,
  Icon,
  type,
  value,
  error,
  onChange,
}) => {
  return (
    <div className="input_container flex flex-col mt-3">
      <label htmlFor={name}>{title}:</label>
      <div className="relative mt-1">
        <Icon className="absolute text-xl top-1/2 left-4  -translate-x-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className=" border border-gray-400 focus:outline-yellow-300 rounded pl-8 pr-3  py-1 w-full"
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <p className="mt-2 text-red-500 font-bold">{error}</p>}
    </div>
  );
};
export default InputField;
