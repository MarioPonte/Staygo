'use client';

import axios from "axios";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { SafeListing, SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import { format } from 'date-fns';
import Button from "../Button";

interface CommentsProps {
    listing: SafeListing & {
        user: SafeUser;
    };
    comments?: any;
    users?: any;
    currentUser?: SafeUser | null;
}

const ListingComments: React.FC<CommentsProps> = ({
    listing,
    comments,
    users,
    currentUser
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const [postButtons, setPostButtons] = useState(false);

    const {
        handleSubmit
    } = useForm<FieldValues>({
        defaultValues: {
            description: ""
        }
    });

    let listingComments = comments.filter((comment: any) => comment.listingId === listing.id);

    const comment = document.querySelector("#description");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post("/api/comments", JSON.stringify({
            description: (comment as HTMLInputElement)?.value,
            userId: currentUser?.id,
            listingId: listing?.id
        }))
            .then(() => {
                (comment as HTMLInputElement).value = "";
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

                {currentUser && (
                    <>
                        <textarea
                            id="description"
                            placeholder="Say something"
                            maxLength={1000}
                            onFocus={() => setPostButtons(true)}
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
                            `}>
                        </textarea>
                        {postButtons && (
                            <div>
                                <Button label="Post Comment" small onClick={handleSubmit(onSubmit)} />
                                <Button label="Cancel" outline small onClick={() => { setPostButtons(false); (comment as HTMLInputElement).value = ""; }} />
                            </div>
                        )}
                    </>
                )}

                {listingComments.length === 0 ? (
                    <div>
                        Esta propiedade não pussui comentarios.
                    </div>
                ) : (
                    <div className="mt-8">
                        {listingComments.map((comment: any) => {
                            let dateVal = new Date(comment.createdAt);
                            let user = users.find((user: any) => user.id === comment.userId);
                            return (
                                <div key={comment.id} className="mt-8">
                                    <div className="flex items-center text-sm">
                                        <Avatar src={user?.image} />
                                        <span className="font-semibold ml-2 mr-3">{user.name}</span>
                                        <span className="font-Light text-neutral-600">{format(dateVal, "MMM. d, yyyy")}</span>
                                    </div>
                                    <div className="font-light">
                                        {comment.description}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}

export default ListingComments;