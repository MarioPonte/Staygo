'use client';

import { LuCopy, LuMail } from "react-icons/lu";
import { BsWhatsapp, BsFacebook } from "react-icons/bs";
import { useCallback, useState} from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import Heading from "../Heading";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useShareModal from "@/app/hooks/useShareModal";
import NormalModal from "./NormalModal";

import { FacebookShareButton, WhatsappShareButton, EmailShareButton } from "react-share";

const ShareModal = () => {
    const ShareModal = useShareModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Share this place"
                subtitle="You can share this place with your friends!"
            />
            <FacebookShareButton url={window.location.href}>
                <Button
                    outline
                    label="Facebook"
                    icon={BsFacebook}
                    onClick={() => {}}
                />
            </FacebookShareButton>
            <WhatsappShareButton url={window.location.href}>
                <Button
                    outline
                    label="Whatsapp"
                    icon={BsWhatsapp}
                    onClick={() => {}}
                />
            </WhatsappShareButton>
            <EmailShareButton url={window.location.href}>
                <Button
                    outline
                    label="Email"
                    icon={LuMail}
                    onClick={() => {}}
                />
            </EmailShareButton>
            <Button
                    outline
                    label="Copy Link"
                    icon={LuCopy}
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href).then(() => {
                            toast.success("Link copied successfully!");
                        })
                    }}
            />
        </div>
    );

    return (
        <NormalModal
            disabled={isLoading}
            isOpen={ShareModal.isOpen}
            title="Share"
            onClose={ShareModal.onClose}
            body={bodyContent}
        />
    )
}

export default ShareModal;