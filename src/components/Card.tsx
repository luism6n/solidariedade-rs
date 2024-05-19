import { Cell, Col, Row } from "@/types";
import Link from "next/link";
import { PiMapPinBold } from "react-icons/pi";
import Pill from "./Pill";
import { Fragment } from "react";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export default function Card({ cols, row }: { cols: Col[]; row: Row }) {
  const renderedCols: Record<number, boolean> = {};
  const { verified } = row;

  return (
    <div className="border-card flex flex-col gap-lg rounded-md bg-white p-md">
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
          (index) => row.cells[index].content,
        );

        if (indicesInGroup.length === 0) {
          return null;
        }

        const renderedCells = indicesInGroup.map((index) => (
          <RenderCell
            key={index}
            cell={row.cells[index]}
            col={cols[index]}
            verified={verified}
          />
        ));

        if (hasBorder(cols, row, indicesInGroup)) {
          return (
            <div
              key={`${col.name}-${i}`}
              className="flex flex-col gap-md rounded-md border border-stone-200 p-md"
            >
              {renderedCells}
            </div>
          );
        } else {
          return (
            <div key={`${col.name}-${i}`} className="px-md">
              {renderedCells}
            </div>
          );
        }
      })}
    </div>
  );
}

function RenderCell({
  cell,
  col,
  verified,
}: {
  cell: Cell;
  col: Col;
  verified: boolean;
}) {
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
      </div>,
    );
  } else if (col.name === "Nome") {
    elements.push(
      <div className="flex gap-4">
        <p className="text-2xl font-bold">{content}</p>
        {verified && (
          <Popover className="relative flex items-center">
            <PopoverButton>
              <FaHeartCircleCheck className="text-2xl text-mbp-red-800" />
            </PopoverButton>
            <PopoverPanel className="absolute left-1/2 top-2 -translate-x-1/2 translate-y-full rounded-md border bg-white px-md shadow">
              <p className="font-semibold text-stone-700">Verificado</p>
            </PopoverPanel>
          </Popover>
        )}
      </div>,
    );
  } else if (col.link && typeof content === "string") {
    elements.push(
      <Link
        className="underline"
        href={content}
        target="_blank"
        rel="noreferrer"
      >
        {label}
      </Link>,
    );
  } else if (googleMaps) {
    elements.push(
      <div className="flex items-center gap-sm font-semibold text-stone-700 underline">
        <PiMapPinBold className="flex-shrink-0 text-xl" />
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${content}`}
          target="_blank"
          rel="noreferrer"
        >
          {content}
        </Link>
      </div>,
    );
  } else if (content && typeof content === "string") {
    elements.push(
      <div className="flex gap-md">
        <p className="font-semibold text-stone-700">{label}: </p>
        <p>{content}</p>
      </div>,
    );
  }

  if (updatedAt) {
    elements.push(
      <p className="text-sm text-stone-700">
        Atualizado em {new Date(updatedAt).toLocaleString()}
      </p>,
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
