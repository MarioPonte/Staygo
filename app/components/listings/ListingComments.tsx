'use client';

import Avatar from "../Avatar";
import { SafeUser } from "@/app/types";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    user: SafeUser;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    user
}) => {

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
                <div className="text-red-500 mt-4">
                    Comments are unavailable indefinitely
                </div>
            </div>
        </>
    )
}

export default ListingHead;