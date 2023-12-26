import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "../../components/Container";
import Image from "next/image";
import { AiFillStar, AiFillHeart, AiFillHome } from "react-icons/ai";
import Heading from "../../components/Heading";
import { getUsers } from "@/app/actions/getUsers";
import { format, parseISO } from 'date-fns';
import getComments from "@/app/actions/getComments";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import { SafeListing } from "@/app/types";
import ListingCard from "@/app/components/listings/ListingCard";

export const dynamic = 'force-dynamic';

interface IParams {
    listings: SafeListing[];
    profileId?: string;
};

const ProfilePage = async ({ params }: { params: IParams }) => {
    const currentUser = await getCurrentUser();
    const users = await getUsers();
    const userProfile = users?.find(user => user.id === params.profileId);
    const comments = await getComments();
    const reviews = comments?.filter(comment => comment.userId === params.profileId);

    const listings = await getListings({
        userId: params.profileId
    });

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
                    <div className="border-[1px] border-neutral-200 p-10 rounded-xl w-[500px]">
                        <div>
                            <Image
                                className="rounded-full"
                                height="200"
                                width="200"
                                alt="Avatar"
                                src={userProfile?.image || "/images/placeholder.jpg"}
                            />
                        </div>
                        <hr className="mt-4 mb-4" />
                        <div className="space-y-4">
                            <div className="flex flex-row items-center content-center text-lg space-x-3">
                                <AiFillStar size={20} color="#14b8a6" /><span>{reviews?.length} reviews</span>
                            </div>
                            <div className="flex flex-row items-center content-center text-lg space-x-3">
                                <AiFillHeart size={20} color="#14b8a6" /><span>{(userProfile?.favoriteIds)?.length} favorites</span>
                            </div>
                            <div className="flex flex-row items-center content-center text-lg space-x-3">
                                <AiFillHome size={20} color="#14b8a6" /><span>{listings.length} properties</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="space-y-4">
                            <div className="text-4xl font-semibold">
                                Hi, I&apos;m {userProfile?.name}
                            </div>
                            <div>
                                Joined in {format(parseISO((userProfile?.createdAt?.toISOString())!), 'MMMM dd yyyy')}
                            </div>
                        </div>
                        <div className="mt-10">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, dolorem quaerat a quas quos assumenda natus?
                            Quia fugiat voluptatum nesciunt soluta ullam recusandae maxime.
                            Tenetur explicabo quibusdam temporibus hic expedita vero rem aliquid. Autem similique
                            saepe tempore, obcaecati commodi, quas quisquam harum at ea aspernatur
                            reprehenderit deserunt enim provident porro asperiores. Eos, quos cum totam, earum eligendi maxime quisquam.
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <Heading
                        title="Properties"
                        subtitle={`List of properties owned by ${userProfile?.name}`}
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
                        {listings.map((listing: any) => (
                            <ListingCard
                                key={listing.id}
                                data={listing}
                                actionId={listing.id}
                                currentUser={currentUser}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </ClientOnly>
    );
}

export default ProfilePage;