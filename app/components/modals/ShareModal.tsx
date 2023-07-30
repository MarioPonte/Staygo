'use client';

import { signIn } from "next-auth/react";
import axios from "axios";
import { LuCopy } from "react-icons/lu";
import { BsWhatsapp, BsFacebook } from "react-icons/bs";
import { useCallback, useState} from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";
import useShareModal from "@/app/hooks/useShareModal";
import NormalModal from "./NormalModal";

import { FacebookShareButton, WhatsappShareButton } from "react-share";

const ShareModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
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

    const toggle = useCallback(() => {
        ShareModal.onClose();
        registerModal.onOpen();
    }, [ShareModal, registerModal]);

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