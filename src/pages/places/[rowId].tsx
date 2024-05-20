"use client";

import { BackButton } from "@/components/BackButton";
import { Card } from "@/components/Card";
import { CardContent } from "@/components/CardContent";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";
import ShareButton from "@/components/ShareButton";
import { useData } from "@/hooks/useData";
import { getRowId, getRowName } from "@/utils/rows";
import { getUrlTo } from "@/utils/windowLocation";
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

  const row = data.rows[0];
  const cols = data.cols;

  return (
    <>
      <Header>
        <BackButton />
      </Header>

      <Map className="min-h-64" data={data} popupCard={false} />

      <div className="relative z-10">
        <Card>
          <CardContent cols={cols} row={row} />

          <ShareButton
            className="flex justify-center rounded-md border border-mbp-green-700 p-2 text-xl text-mbp-green-700"
            url={getUrlTo(`places/${getRowId(row, cols)}`)}
            title={getRowName(row, cols)}
          />
        </Card>
      </div>
    </>
  );
}
