'use client';

import Image from "next/image";
import Container from "../Container";
import { LogoMario } from "@/app/icons";
import moment from 'moment';
import Link from "next/link";
import ToggleTheme from "../ToggleTheme";

const Footer = () => {
    return (
        <div className="bg-white border-t-[1px] sticky top-[100vh]">
            <Container>
                <div className="flex flex-auto items-center text-xs">
                    <Link target="_blank" href="https://marioponte.github.io/Portfolio/"><LogoMario className="h-14"/></Link>
                    © All Rights Reserved to Mário Ponte - {moment().year()} <ToggleTheme/>
                </div>
            </Container>
        </div>
    )
}

export default Footer;