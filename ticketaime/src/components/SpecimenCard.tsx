import type { CSSProperties } from "react";
import Ticket from "./Ticket";
import type { Category, Item } from "../data/catalogue";
import { ITEM_INDEX } from "../data/catalogue";

interface SpecimenCardProps {
  item: Item;
  category: Category;
  index: number;
  /** Depth used to bring a dragged piece above the others */
  z?: number;
  onPick?: () => void;
}

/**
 * Stage height chosen from the piece's format, so a wide ticket doesn't sit in
 * a tall empty box and a tall one still gets a decent size.
 */
const stageHeight = (ratio: number): number =>
  ratio >= 2.6 ? 132 : ratio >= 1.8 ? 164 : ratio >= 1.25 ? 204 : ratio >= 0.9 ? 252 : ratio >= 0.7 ? 304 : 372;

/**
 * One piece laid straight on the grey dot grid - no mount, no card behind it,
 * just the ticket and its own shadow. It can be dragged with the mouse and is
 * brought to the front when picked up. A small legend sits underneath.
 */
export default function SpecimenCard({ item, category, index, z = 0, onPick }: SpecimenCardProps) {
  const n = ITEM_INDEX[item.id] ?? index + 1;
  const ratio = item.w / item.h;
  return (
    <figure
      className="piece"
      data-atlas-module={item.id}
      data-atlas-category={item.category}
      data-atlas-version="1.0.0"
      style={{ "--accent": category.accent, zIndex: z } as CSSProperties}
    >
      <div
        className="stage"
        style={
          {
            "--ratio": `${item.w} / ${item.h}`,
            "--stage-h": `${stageHeight(ratio)}px`,
          } as CSSProperties
        }
      >
        <div className="fit">
          <Ticket
            w={item.w}
            h={item.h}
            rotate={item.rotate}
            index={index}
            label={item.name}
            caption={false}
            draggable
            onPick={onPick}
            className="w-full"
          >
            <item.Component />
          </Ticket>
        </div>
      </div>

      <figcaption className="caption">
        <span className="idx" aria-hidden="true">
          {String(n).padStart(2, "0")}
        </span>
        <span className="name">{item.name}</span>
        <span className="tag">{category.name}</span>
      </figcaption>
    </figure>
  );
}
