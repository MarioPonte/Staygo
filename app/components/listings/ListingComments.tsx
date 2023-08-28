'use client';

import useCountries from "@/app/hooks/useCountries";
import Heading from "../Heading";

interface ListingHeadProps {
    title: string;
    locationValue: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue
}) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

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
                <div className="text-red-500 mt-4">
                    Comments are unavailable indefinitely
                </div>
            </div>
        </>
    )
}

export default ListingHead;