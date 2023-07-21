'use client';

import Image from "next/image";
import Container from "../Container";

const Footer = () => {
    return (
        <div className="bg-white border-t-[1px] sticky top-[100vh]">
            <Container>
                <div className="flex flex-auto items-center text-sm">
                    <Image src="/images/logoMario.svg" className="mr-8" width={50} height={50} alt="logo" />
                    © All Rights Reserved to Mário Ponte - 2023
                </div>
            </Container>
        </div>
    )
}

export default Footer;