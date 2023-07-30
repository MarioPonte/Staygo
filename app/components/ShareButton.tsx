'use client';

import { BiSolidShare, BiShare } from "react-icons/bi";
import ShareModal from "./modals/ShareModal";
import useShareModal from "../hooks/useShareModal";

const ShareButton = () => {
    const shareModal = useShareModal();
    return (
        <div
            onClick={shareModal.onOpen}
            className="
                relative
                hover:opacity-80
                transition
                cursor-pointer
            "
        >
            <BiShare
                size={24}
                className="
                    fill-white
                    absolute
                    -top-[2px]
                    -right-[2px]
                "
            />
            <BiSolidShare
                size={20}
                className='fill-neutral-500/70'
            />
        </div>
    )
}

export default ShareButton;