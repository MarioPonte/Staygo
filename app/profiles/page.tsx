import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "../components/Container";
import Image from "next/image";
import { AiFillStar, AiFillHeart, AiFillHome } from "react-icons/ai";

const ProfilePage = async () => {
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
                            Hi, I'm Manuel Silva
                        </div>
                        <div>
                            Joined in 2014
                        </div>
                    </div>
                </div>
            </Container>
        </ClientOnly>
    );
}

export default ProfilePage;