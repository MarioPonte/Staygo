'use client';

import { LuCopy, LuMail } from "react-icons/lu";
import { BsWhatsapp, BsFacebook } from "react-icons/bs";

import Heading from "../Heading";
import { toast } from "react-hot-toast";
import useShareModal from "@/app/hooks/useShareModal";
import NormalModal from "./NormalModal";

import { FacebookShareButton, WhatsappShareButton, EmailShareButton } from "react-share";

const ShareModal = () => {
    const ShareModal = useShareModal();

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Share this place"
                subtitle="You can share this place with your friends!"
            />

            <FacebookShareButton url={window.location.href}>
                <div className="py-3 border-2 relative flex text-blue-600 text-md rounded-lg hover:opacity-80 transition w-full border-blue-600 justify-center font-semibold">
                    <div className="mr-2"><BsFacebook size={24} /></div>
                    <div>Facebook</div>
                </div>
            </FacebookShareButton>

            <WhatsappShareButton url={window.location.href}>
                <div className="py-3 border-2 relative flex text-green-700 text-md rounded-lg hover:opacity-80 transition w-full border-green-700 justify-center font-semibold">
                    <div className="mr-2"><BsWhatsapp size={24} /></div>
                    <div>Whatsapp</div>
                </div>
            </WhatsappShareButton>

            <EmailShareButton url={window.location.href}>
                <div className="py-3 border-2 relative flex text-black dark:text-white text-md rounded-lg hover:opacity-80 transition w-full border-black dark:border-zinc-600 justify-center font-semibold">
                    <div className="mr-2"><LuMail size={24} /></div>
                    <div>Email</div>
                </div>
            </EmailShareButton>

            <button 
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        toast.success("Link copied successfully!");
                    })
                }}
            >
                <div className="py-3 border-2 relative flex text-black dark:text-white text-md rounded-lg hover:opacity-80 transition w-full border-black dark:border-zinc-600 justify-center font-semibold">
                    <div className="mr-2"><LuCopy size={24} /></div>
                    <div>Copy Link</div>
                </div>
            </button>
        </div>
    );

    return (
        <NormalModal
            isOpen={ShareModal.isOpen}
            title="Share"
            onClose={ShareModal.onClose}
            body={bodyContent}
        />
    )
}

export default ShareModal;