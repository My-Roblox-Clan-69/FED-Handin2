import React from "react";

interface StyledHeaderButtonProps {
	label: string;
	onClick: () => void;
}

const StyledHeaderButton: React.FC<StyledHeaderButtonProps> = ({
	label,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
		>
			{label}
		</button>
	);
};

export default StyledHeaderButton;
