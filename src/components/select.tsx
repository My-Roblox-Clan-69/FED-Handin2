import React from "react";

interface SelectProps {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: { value: string | number; label: string }[];
	placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
	label,
	name,
	value,
	onChange,
	options,
	placeholder,
}) => {
	return (
		<div className="mb-3">
			<label
				className="block text-gray-700 text-sm font-bold mb-1"
				htmlFor={name}
			>
				{label}
			</label>
			<select
				name={name}
				value={value}
				onChange={onChange}
				className="w-full p-2 border rounded shadow appearance-none leading-tight focus:outline-none focus:shadow-outline"
			>
				<option value="">{placeholder || "Select an option"}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
