'use client';

import { signIn } from "next-auth/react";
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
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
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                setIsLoading(false);

                if (callback?.ok) {
                    toast.success('Login in');
                    router.refresh();
                    loginModal.onClose();
                }

                if (callback?.error) {
                    toast.error(callback.error);
                    router.refresh();
                    loginModal.onClose();
                }
            })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    function setPasswordIcon(icon: any) {
        if (icon == "visible") {
            return (
                <AiOutlineEyeInvisible size={30} />
            )
        } else if (icon == "invisible") {
            return (
                <AiOutlineEye size={30} />
            )
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Login to your account!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            
            <div className="flex flex-row gap-4">
                <Input
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <button
                    onMouseDown={() => setShowPassword(!showPassword)}
                    onMouseUp={() => setShowPassword(!showPassword)}
                    onTouchStart={() => setShowPassword(!showPassword)}
                    onTouchEnd={() => setShowPassword(!showPassword)}
                    className="rounded text-zinc-400 cursor-pointer ">{showPassword ? setPasswordIcon("visible") : setPasswordIcon("invisible")}
                </button>
            </div>
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className="
                text-neutral-500
                dark:text-zinc-200
                text-center
                mt-4
                font-light
            ">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        First time using Staygo?
                    </div>
                    <div
                        onClick={toggle}
                        className="
                            text-neutral-800
                            dark:text-zinc-100
                            cursor-pointer
                            hover:underline
                    ">
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;