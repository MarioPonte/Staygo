'use client';

import { BsShareFill, BsShare } from "react-icons/bs";

const ShareButton = () => {
    return (
        <div
            onClick={() => alert("Teste URL: " + window.location.href)}
            className="
                relative
                hover:opacity-80
                transition
                cursor-pointer
            "
        >
            <BsShare
                size={24}
                className="
                    fill-white
                    absolute
                    -top-[2px]
                    -right-[2px]
                "
            />
            <BsShareFill
                size={20}
                className='fill-neutral-500/70'
            />
        </div>
    )
}

export default ShareButton;