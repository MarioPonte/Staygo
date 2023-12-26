'use client';

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    colorIcon?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    colorIcon
}) => {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`
                relative 
                disabled:opacity-70 
                disabled:cursor-not-allowed 
                rounded-lg 
                hover:opacity-80 
                transition 
                w-full 
                ${outline ? "bg-white dark:bg-zinc-900" : "bg-teal-500"} 
                ${outline ? "border-black dark:border-white" : "bg-teal-500"}
                ${outline ? "text-black dark:text-white" : "text-white"}
                ${small ? "py-1" : "py-3"}
                ${small ? "text-sm" : "text-md"}
                ${small ? "font-light" : "font-semibold"}
                ${small ? "border-[1px] dark:border-zinc-600" : "border-2 dark:border-zinc-600"}
            `}>
                {Icon && (
                    <Icon 
                        size={24}
                        className={`
                            absolute
                            left-4
                            top-3
                            ${colorIcon ? colorIcon : ""}
                        `}
                    />
                )}
                {disabled ? "Loading" : label}
        </button>
    )
}

export default Button;