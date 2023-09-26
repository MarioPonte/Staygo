'use client';

interface TextAreaProps {
    id: string;
    value: string;
    onChange: any;
    placeholder: string;
    onFocus: any;
}

const TextArea: React.FC<TextAreaProps> = ({
    id,
    value,
    onChange,
    placeholder,
    onFocus
}) => {
    return (
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={1000}
            onFocus={onFocus}
            className={`
                peer
                resize-none
                w-full
                p-4
                font-light 
                bg-white
                dark:bg-zinc-900
                border-2
                dark:border-zinc-400
                dark:text-zinc-400
                rounded-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                focus:border-black
            `}>
        </textarea>
    );
}

export default TextArea;