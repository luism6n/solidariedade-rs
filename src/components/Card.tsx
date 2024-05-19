import { Cell, Col, Row } from "@/types";
import Link from "next/link";
import { PiMapPinBold } from "react-icons/pi";
import Pill from "./Pill";
import { Fragment } from "react";

export default function Card({ cols, row }: { cols: Col[]; row: Row }) {
  const renderedCols: Record<number, boolean> = {};

  return (
    <div className="bg-white p-md flex flex-col gap-lg rounded-md border-card">
      {cols.map((col, i) => {
        let indicesInGroup: number[] = [];

        if (col.hidden || col.index in renderedCols) {
          return null;
        } else if (col.groupName) {
          indicesInGroup = cols
            .filter((c) => c.groupName === col.groupName && !c.hidden)
            .map((c) => c.index);
        } else {
          indicesInGroup = [i];
        }

        for (const index of indicesInGroup) {
          renderedCols[index] = true;
        }

        indicesInGroup = indicesInGroup.filter(
          (index) => row.cells[index].content
        );

        if (indicesInGroup.length === 0) {
          return null;
        }

        const renderedCells = indicesInGroup.map((index) => (
          <RenderCell key={index} cell={row.cells[index]} col={cols[index]} />
        ));

        if (hasBorder(cols, row, indicesInGroup)) {
          return (
            <div
              key={`${col.name}-${i}`}
              className="rounded-md border border-stone-200 p-md flex flex-col gap-md"
            >
              {renderedCells}
            </div>
          );
        } else {
          return renderedCells;
        }
      })}
    </div>
  );
}

function RenderCell({ cell, col }: { cell: Cell; col: Col }) {
  const { content, updatedAt, googleMaps } = cell;
  const label = col.name;

  if (!content) return null;

  if (col.hidden) {
    return null;
  }

  const elements: JSX.Element[] = [];

  if (Array.isArray(content)) {
    elements.push(
      <div className="flex flex-col gap-md">
        <p className="font-semibold text-stone-700">{label}: </p>
        <div className="flex flex-wrap gap-xs">
          {content.map((item, i) => (
            <Pill key={i}>{item}</Pill>
          ))}
        </div>
      </div>
    );
  } else if (col.name === "Nome") {
    return <p className="font-bold text-lg">{content}</p>;
  } else if (col.link && typeof content === "string") {
    elements.push(
      <Link
        className="underline"
        href={content}
        target="_blank"
        rel="noreferrer"
      >
        {label}
      </Link>
    );
  } else if (googleMaps) {
    elements.push(
      <div className="flex gap-sm items-center font-semibold underline text-stone-700">
        <PiMapPinBold className="text-xl flex-shrink-0" />
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${content}`}
          target="_blank"
          rel="noreferrer"
        >
          {content}
        </Link>
      </div>
    );
  } else if (content && typeof content === "string") {
    elements.push(
      <div className="flex gap-md">
        <p className="font-semibold text-stone-700">{label}: </p>
        <p>{content}</p>
      </div>
    );
  }

  if (updatedAt) {
    elements.push(
      <p className="text-stone-700 text-sm">
        Atualizado em {new Date(updatedAt).toLocaleString()}
      </p>
    );
  }

  return elements.map((e, i) => <Fragment key={i}>{e}</Fragment>);
}

function hasBorder(cols: Col[], row: Row, indices: number[]) {
  if (indices.length > 1) {
    return true;
  }

  const index = indices[0];

  if (cols[index].name === "Nome") {
    return false;
  }

  if (Array.isArray(row.cells[index].content)) {
    return false;
  }

  if (row.cells[index].googleMaps) {
    return false;
  }

  return true;
}
