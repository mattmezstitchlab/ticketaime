import { memo, type ComponentType } from "react";
import Ticket from "../Ticket";
import { ITEMS } from "../../data/catalogue";

interface PiecePreviewProps {
  itemId: string;
  fields?: Record<string, string>;
  decorative?: boolean;
}

/** The same catalogue component is used in the printer and on the canvas. */
function PiecePreview({ itemId, fields, decorative = false }: PiecePreviewProps) {
  const item = ITEMS.find((piece) => piece.id === itemId);
  if (!item) return null;
  const Component = item.Component as ComponentType<{ personnalisation?: Record<string, string> }>;
  return (
    <div className="lma-piece-preview" aria-hidden={decorative || undefined}>
      <Ticket w={item.w} h={item.h} label={item.name} rotate={0} caption={false} disableReveal>
        <Component personnalisation={fields} />
      </Ticket>
    </div>
  );
}

export default memo(PiecePreview);