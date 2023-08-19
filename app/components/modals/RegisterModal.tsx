'use client';

import axios from "axios";
import { AiFillGithub, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
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
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            repeatPassword: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(data.password === data.repeatPassword){
            setIsLoading(true);
            axios.post("/api/register", data)
                .then(() => {
                        toast.success('Success!');
                        registerModal.onClose();
                        loginModal.onOpen();
                })
                .catch((error) => {
                    toast.error("Something went wrong.");
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }else{
            toast.error("You have entered different passwords.");
        }
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
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
                title="Welcome to Staygo"
                subtitle="Create an account!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
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
            <div className="flex flex-row gap-4">
                <Input
                    id="repeatPassword"
                    label="Repeat Password"
                    type={showRepeatPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <button
                    onMouseDown={() => setShowRepeatPassword(!showRepeatPassword)}
                    onMouseUp={() => setShowRepeatPassword(!showRepeatPassword)}
                    onTouchStart={() => setShowRepeatPassword(!showRepeatPassword)}
                    onTouchEnd={() => setShowRepeatPassword(!showRepeatPassword)}
                    className="rounded text-zinc-400 cursor-pointer ">{showRepeatPassword ? setPasswordIcon("visible") : setPasswordIcon("invisible")}
                </button>
            </div>
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
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
                text-center
                mt-4
                font-light
            ">
                <div className="justify-center flex flex-row items-center gap-2 dark:text-zinc-200">
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={toggle}
                        className="
                            text-neutral-800
                            dark:text-zinc-100
                            cursor-pointer
                            hover:underline
                    ">
                        Login
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;