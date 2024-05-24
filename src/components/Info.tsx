import React from 'react';
import Modal from 'react-modal';
import Link from "next/link";
import Image from "next/image";

export function Info({ modalIsOpen, onClose }: { modalIsOpen: boolean; onClose: any }) {

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={onClose}
            contentLabel="Sobre nós"
        >
            <button className='float-right' onClick={onClose}>&#x2716;</button>
            <h2 className="text-2xl font-bold mt-lg mb-lg">Sobre nós</h2>
            <div>
                <p className="mb-sm">A Campanha Popular Solidariedade Rio Grande do Sul surgiu a partir da necessidade de auxiliar na mobilização de ações de voluntariado neste momento tão grave de nossa história. O projeto tem sido desenvolvido pelos integrantes do Movimento Brasil Popular, em colaboração com a Cooperativa EITA e apoio da Fiocruz, como forma de fazer chegar todo o amparo àqueles que mais precisam.</p>
                <p className="mb-sm">Para isto, desenvolvemos esta iniciativa de mapeamento que tem como objetivo conectar àqueles com disponibilidade para apoiar, seja com força de trabalho ou doações, aos locais onde toda a ajuda será necessária a curto, médio e longo prazo. No momento, temos condições de contribuir na coordenação deste fluxo em Porto Alegre e em breve ampliaremos a organização para região metropolitana e interior.</p>
                <p className="mb-sm">Criamos uma plataforma, com atualizações periódicas, capaz de filtrar as provisões necessárias de modo a fazer com que a vontade de ajudar do voluntário não esbarre no portão por falta de informação confiável. O diferencial do nosso trabalho de mobilização está no contato direto dos integrantes do nosso movimento social com os locais selecionados, sejam eles abrigos, cozinhas solidárias ou pontos de distribuição, de modo a ofertar informações confiáveis e atualizadas no que se refere às suas reais necessidades.</p>
                <p className="mb-sm">Temos o compromisso ético e ideológico com o povo do nosso estado, com a certeza que a nossa iniciativa veio para ficar e que irá perdurar até que todos os desabrigados reencontrem o caminho da dignidade nos seus bairros, nas suas casas e nas suas vidas. Que seja plantada a semente da solidariedade, de forma que esta não fique restrita ao contexto das emergências, das crises e dos desastres, mas que floresça em um novo tempo: um amanhã solidário.</p>
                <p className="mb-sm mt-lg font-bold">Realização:</p>
                <div className="flex gap-lg">
                    <Link href="https://brasilpopular.org"
                        className="desktop:text-xl" target="_blank">
                        <Image
                            src="/mbp.webp"
                            alt={"Movimento Brasil Popular"}
                            width={200}
                            height={117}
                            aria-description={"Movimento Brasil Popular"}
                        />
                    </Link>
                    <Link href="https://eita.coop.br"
                        className="mt-lg desktop:text-xl" target="_blank">
                        <Image
                            src="/EITA.png"
                            alt={"Cooperativa EITA"}
                            width={120}
                            height={117}
                            aria-description={"Cooperativa EITA"}
                        />
                    </Link>
                </div>
                <p className="mb-sm mt-lg font-bold">Apoio:</p>
                <div className="flex gap-lg">
                    <Link href="https://fiocruz.br"
                        className="desktop:text-xl" target="_blank">
                        <Image
                            src="/Fiocruz.jpg"
                            alt={"Fiocruz"}
                            width={200}
                            height={117}
                            aria-description={"Movimento Brasil Popular"}
                        />
                    </Link>
                </div>
                <Link href="https://github.com/luism6n/solidariedade-rs/"
                    className="desktop:text-xl" target="_blank">
                    <p className="mt-lg mb-sm">Feito em Software Livre</p>
                </Link>
            </div>
        </Modal>
    );
}
