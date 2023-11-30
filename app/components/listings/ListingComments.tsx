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
import Avatar from "../Avatar";
import { format } from 'date-fns';
import Button from "../Button";
import { useRouter } from 'next/navigation';
import useLoginModal from "@/app/hooks/useLoginModal";
import TextArea from "../inputs/TextArea";

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

    const [inputValue, setInputValue] = useState('');
    const [postButtons, setPostButtons] = useState(false);

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const {
        handleSubmit
    } = useForm<FieldValues>({
        defaultValues: {
            description: ""
        }
    });

    const router = useRouter();

    const onDelete = (id: string) => {
        const confirmation = confirm("Are you sure you want to delete comment?");
        if (confirmation) {
            axios.delete(`/api/comments/${id}`)
                .then(() => {
                    toast.success('Comment deleted');
                    router.refresh();
                })
                .catch(() => {
                    toast.error('Something went wrong.');
                })
        }
    };

    let listingComments = comments.filter((comment: any) => comment.listingId === listing.id);

    const comment = document.querySelector("#description");

    const onSubmit: SubmitHandler<FieldValues> = () => {
        setIsLoading(true);
        axios.post("/api/comments", JSON.stringify({
            description: (comment as HTMLInputElement)?.value,
            userId: currentUser?.id,
            listingId: listing?.id
        }))
            .then(() => {
                setInputValue("");
                toast.success('Success!');
                setPostButtons(false);
                router.refresh();
            })
            .catch((error) => {
                console.log("Erro: " + error);
                toast.error("Something went wrong.");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const loginModal = useLoginModal();

    /*
    const onUserProfile = useCallback(() => {
        if(!currentUser) return loginModal.onOpen();
        router.push("/profiles");
    }, [currentUser, loginModal]);
    */

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
                        <TextArea
                            id="description"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Say something"
                            onFocus={() => setPostButtons(true)}
                        />
                        {postButtons && (
                            <div className="flex flex-row items-center gap-4 w-full">
                                <Button label="Cancel" outline small onClick={() => { setPostButtons(false); setInputValue(""); }} />
                                <Button label="Post Comment" disabled={!inputValue} small onClick={handleSubmit(onSubmit)} />
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
                                        <div onClick={() => router.push(`/profiles/${user.id}`)} className="cursor-pointer"><Avatar src={user?.image} /></div>
                                        <span className="font-semibold ml-2 mr-3">{user.name}</span>
                                        <span className="font-Light text-neutral-600">{format(dateVal, "MMM. d, yyyy")}</span>
                                        
                                        {currentUser?.id === user?.id && (
                                            <button className="font-semibold ml-2" onClick={() => onDelete(comment.id)}>Delete</button>
                                        )}
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