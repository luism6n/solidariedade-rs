import { PiInfo } from "react-icons/pi";
import { TitleLogo } from "./TitleLogo";
import React from 'react';
import Modal from 'react-modal';
import Link from "next/link";
import Image from "next/image";
import { Info } from "./Info";

export function Header({ children }: { children?: React.ReactNode }) {

    const [modalIsOpen, setIsOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full">
            <div className="flex flex-col gap-md bg-mbp-green-700 px-lg laptop:gap-lg laptop:p-lg">
                <div className="flex w-full items-center justify-between">
                    <TitleLogo />
                    <PiInfo className="text-4xl cursor-pointer" color="white" onClick={() => setIsOpen(true)} />
                    <Info modalIsOpen={modalIsOpen} onClose={() => setIsOpen(false)} />
                </div>
            </div >

            {children}
        </header >
    );
}
