import React from "react";

interface InputFieldProps {
	label: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	name?: string;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	type,
	value,
	onChange,
	placeholder,
	name,
}) => {
	return (
		<div className="mb-3">
			<label
				className="block text-gray-700 text-sm font-bold mb-1"
				htmlFor={label}
			>
				{label}
			</label>
			<input
				type={type}
				id={label}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="shadow appearance-none border rounded w-full py-1.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			/>
		</div>
	);
};

export default InputField;
