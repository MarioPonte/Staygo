import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "../components/Container";
import Image from "next/image";
import { AiFillStar, AiFillHeart, AiFillHome } from "react-icons/ai";
import Heading from "../components/Heading";
import getListings, { IListingsParams } from "../actions/getListings";
import ListingCard from "../components/listings/ListingCard";

interface ProfileProps {
    searchParams: IListingsParams
};

const ProfilePage = async ({ searchParams }: ProfileProps) => {
    const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <Container>
                <div className="flex flex-row gap-10">
                    <div className="border-[1px] border-neutral-200 p-10 rounded-xl">
                        <div>
                            <Image
                                className="rounded-full"
                                height="200"
                                width="200"
                                alt="Avatar"
                                src={"/images/placeholder.jpg"}
                            />
                        </div>
                        <hr className="mt-4 mb-4" />
                        <div className=" space-y-4">
                            <div className="flex flex-row items-center content-center text-lg space-x-3">
                                <AiFillStar size={20} color="#14b8a6" /><span>5 reviews</span>
                            </div>
                            <div className="flex flex-row items-center content-center text-lg space-x-3">
                                <AiFillHeart size={20} color="#14b8a6" /><span>3 favorites</span>
                            </div>
                            <div className="flex flex-row items-center content-center text-lg space-x-3">
                                <AiFillHome size={20} color="#14b8a6" /><span>6 properties</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-4xl font-semibold">
                            Hi, I&apos;m Manuel Silva
                        </div>
                        <div>
                            Joined in 2014
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <Heading
                        title="Properties"
                        subtitle="List of properties owned by Manuel Silva"
                    />
                    <div className="
                        mt-10
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4
                        xl:grid-cols-5
                        2xl:grid-cols-6
                        gap-8
                    ">
                        {listings.map((listing) => {
                            return (
                                <ListingCard
                                    currentUser={currentUser}
                                    key={listing.id}
                                    data={listing}
                                />
                            )
                        })}
                    </div>
                </div>
            </Container>
        </ClientOnly>
    );
}

export default ProfilePage;