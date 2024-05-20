"use client";

import { BackButton } from "@/components/BackButton";
import { Card } from "@/components/Card";
import { CardContent } from "@/components/CardContent";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";
import { useData } from "@/hooks/useData";
import { useRouter } from "next/router";

export default function ItemPage() {
  const router = useRouter();
  const { rowId } = router.query;

  if (typeof rowId !== "string") {
    return null;
  }

  return <Item rowId={rowId} />;
}

function Item({ rowId }: { rowId: string }) {
  const { data } = useData(rowId);

  if (data === null || data?.rows.length === 0) {
    return <div>Erro ao buscar item com ID {rowId}</div>;
  }

  if (data === undefined) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header>
        <BackButton />
      </Header>

      <Map className="min-h-64" data={data} />

      <div className="relative z-10">
        <Card>
          <CardContent cols={data.cols} row={data.rows[0]} />
        </Card>
      </div>
    </>
  );
}
