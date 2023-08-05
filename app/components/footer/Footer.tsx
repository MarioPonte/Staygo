'use client';

import Image from "next/image";
import Container from "../Container";
import { LogoMario } from "@/app/icons";
import moment from 'moment';
import Link from "next/link";
import ToggleTheme from "../ToggleTheme";
import { FiArrowUp } from "react-icons/fi";

const Footer = () => {
    return (
        <div className="bg-white dark:bg-zinc-900 border-t-[1px] dark:border-zinc-600 sticky top-[100vh]">
            <Container>
                <div className="flex flex-auto items-center text-xs justify-between">
                    <Link target="_blank" href="https://marioponte.github.io/Portfolio/"><LogoMario className="h-14 fill-black dark:fill-white"/></Link>
                    © All Rights Reserved to Mário Ponte - {moment().year()}
                    <div className="flex">
                        <ToggleTheme />
                        <button onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })
                        }}><FiArrowUp size={20} /></button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Footer;