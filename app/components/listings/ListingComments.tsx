'use client';

import axios from "axios";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { SafeListing, SafeUser } from "@/app/types";

interface CommentsProps {
    listing: SafeListing & {
      user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingComments: React.FC<CommentsProps> = ({
    listing,
    currentUser
  }) => {

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            description: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post("/api/comments", JSON.stringify({
            description: "Olarilole",
            userId: currentUser?.id,
            listingId: listing?.id
        }))
            .then(() => {
                toast.success('Success!');
            })
            .catch((error) => {
                console.log("Erro: " + error);
                toast.error("Something went wrong.");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <>
            <hr />
            <div className="flex flex-col gap-2">
                <div
                    className="
                        text-xl
                        font-semibold
                        flex
                        flex-row
                        items-center
                        gap-2
                    "
                >
                    Comments
                </div>
                <div
                    className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        font-light
                        text-neutral-500
                        dark:text-zinc-200
                    "
                >
                    See what other people say about this property.
                </div>
                {
                    /* COMENTÁRIO BASE
                        <div className="mt-4 flex flex-row">
                            <div>
                                <Avatar src={user?.image} />
                            </div>
                            <div className="ml-4">
                                <div className="font-bold text-sm">
                                    Mário
                                </div>
                                <div className="text-sm">
                                    Foi a melhor viagem de cruzeiro que já fiz.
                                </div>
                                <div className="text-xs font-light text-neutral-500">
                                    Agosto de 2023
                                </div>
                            </div>
                        </div>
                    */
                }

                <input
                    id="description"
                    type="text"
                    placeholder="Say something"
                    className={`
                        peer
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
                    `}
                />
                <button onClick={handleSubmit(onSubmit)}>
                    Send
                </button>
                <div className="text-red-500 mt-4">
                    Comments are unavailable indefinitely
                </div>
            </div>
        </>
    )
}

export default ListingComments;