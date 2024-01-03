import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import getComments from "@/app/actions/getComments";
import { getUsers } from "@/app/actions/getUsers";

import { Metadata } from "next";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const users = await getUsers();
    const currentUser = await getCurrentUser();
    const comments = await getComments();

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState title="Listing not found" subtitle="The listing you are looking for does not exist or has been removed." />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                comments={comments}
                reservations={reservations}
                users={users}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default ListingPage;

export async function generateMetadata({ params }: { params: IParams }): Promise<Metadata> {
    const listing = await getListingById(params);

    return {
        title: listing?.title,
        description: listing?.description,
        openGraph: {
            images: [
                {
                    url: listing?.imageSrc!,
                    width: 1200,
                    height: 630,
                },
            ],
        },
    }
}