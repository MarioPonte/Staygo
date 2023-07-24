'use client';

import Image from "next/image";
import Container from "../Container";
import { LogoMario } from "@/app/icons";
import moment from 'moment';

const Footer = () => {
    return (
        <div className="bg-white border-t-[1px] sticky top-[100vh]">
            <Container>
                <div className="flex flex-auto items-center text-sm">
                    <LogoMario className="h-16"/>
                    © All Rights Reserved to Mário Ponte - {moment().year()}
                </div>
            </Container>
        </div>
    )
}

export default Footer;