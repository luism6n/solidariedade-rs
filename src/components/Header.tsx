import { PiInfo } from "react-icons/pi";
import { TitleLogo } from "./TitleLogo";
import React from 'react';
import Modal from 'react-modal';
import Link from "next/link";
import Image from "next/image";

export function Header({ children }: { children?: React.ReactNode }) {

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <header className="sticky top-0 z-50 w-full">
            <div className="flex flex-col gap-md bg-mbp-green-700 px-lg laptop:gap-lg laptop:p-lg">
                <div className="flex w-full items-center justify-between">
                    <TitleLogo />
                    <PiInfo className="text-4xl" color="white" onClick={openModal} />
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Modal de exemplo"
                    >
                        <button className='float-right' onClick={closeModal}>&#x2716;</button>
                        <h2 className="text-2xl font-bold mt-lg mb-lg">Sobre nós</h2>
                        <div>
                            <p className="mb-sm">A Campanha Popular Solidariedade Rio Grande do Sul surgiu a partir da necessidade de auxiliar na mobilização de ações de voluntariado neste momento tão grave de nossa história. O projeto tem sido desenvolvido pelos integrantes do Movimento Brasil Popular, em colaboração com a Cooperativa EITA e apoio da Fiocruz, como forma de fazer chegar todo o amparo àqueles que mais precisam.</p>
                            <p className="mb-sm">Para isto, desenvolvemos esta iniciativa de mapeamento que tem como objetivo conectar àqueles com disponibilidade para apoiar, seja com força de trabalho ou doações, aos locais onde toda a ajuda será necessária a curto, médio e longo prazo. No momento, temos condições de contribuir na coordenação deste fluxo em Porto Alegre e em breve ampliaremos a organização para região metropolitana e interior.</p>
                            <p className="mb-sm">Criamos uma plataforma, com atualizações periódicas, capaz de filtrar as provisões necessárias de modo a fazer com que a vontade de ajudar do voluntário não esbarre no portão por falta de informação confiável. O diferencial do nosso trabalho de mobilização está no contato direto dos integrantes do nosso movimento social com os locais selecionados, sejam eles abrigos, cozinhas solidárias ou pontos de distribuição, de modo a ofertar informações confiáveis e atualizadas no que se refere às suas reais necessidades.</p>
                            <p className="mb-sm">Temos o compromisso ético e ideológico com o povo do nosso estado, com a certeza que a nossa iniciativa veio para ficar e que irá perdurar até que todos os desabrigados reencontrem o caminho da dignidade nos seus bairros, nas suas casas e nas suas vidas. Que seja plantada a semente da solidariedade, de forma que esta não fique restrita ao contexto das emergências, das crises e dos desastres, mas que floresça em um novo tempo: um amanhã solidário.</p>
                            <p className="mb-sm font-bold">Realização:</p>
                            <div className="flex gap-lg">
                                <Link href="https://brasilpopular.org"
                                    className="font-extrabold uppercase text-white desktop:text-xl" target="_blank">
                                    <Image
                                        src="/mbp.webp"
                                        alt={"Movimento Brasil Popular"}
                                        width={200}
                                        height={117}
                                        aria-description={"Movimento Brasil Popular"}
                                    />
                                </Link>
                                <Link href="https://eita.coop.br"
                                    className="font-extrabold uppercase text-white desktop:text-xl" target="_blank">
                                    <Image
                                        src="/EITA.png"
                                        alt={"Cooperativa EITA"}
                                        width={120}
                                        height={117}
                                        aria-description={"Cooperativa EITA"}
                                    />
                                </Link>
                            </div>
                            <p className="mb-sm font-bold">Apoio:</p>
                            <div className="flex gap-lg">
                                <Link href="https://fiocruz.br"
                                    className="font-extrabold uppercase text-white desktop:text-xl" target="_blank">
                                    <Image
                                        src="/Fiocruz.jpg"
                                        alt={"Fiocruz"}
                                        width={200}
                                        height={117}
                                        aria-description={"Movimento Brasil Popular"}
                                    />
                                </Link>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div >

            {children}
        </header >
    );
}
