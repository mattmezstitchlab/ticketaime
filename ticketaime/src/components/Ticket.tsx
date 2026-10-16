import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import clsx from "clsx";

export interface TicketProps {
  /** Design width/height in source pixels */
  w: number;
  h: number;
  /** Resting rotation in degrees */
  rotate?: number;
  /** Stagger index for the reveal animation */
  index?: number;
  /** Allow free dragging (collage mode, mouse & pen only) */
  draggable?: boolean;
  /** Called when the ticket is picked up (used to bring it to front) */
  onPick?: () => void;
  label: string;
  /** Show the hover caption */
  caption?: boolean;
  className?: string;
  style?: CSSProperties;
  isSelected?: boolean;
  disableReveal?: boolean;
  handwrittenNote?: {
    text: string;
    ink?: "blue" | "sepia" | "black" | "red";
    rotation?: number;
  };
  stampOverlay?: string;
  sealOverlay?: string;
  children: ReactNode;
}

/**
 * The shell shared by every piece of ephemera. It establishes a container so
 * children can be sized in container-query units (through `--u`), handles the
 * scroll reveal, hover lift and optional drag interaction.
 */
export default function Ticket({
  w,
  h,
  rotate = 0,
  index = 0,
  draggable = false,
  onPick,
  label,
  caption = true,
  className,
  style,
  isSelected = false,
  disableReveal = false,
  handwrittenNote,
  stampOverlay,
  sealOverlay,
  children,
}: TicketProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ px: number; py: number; ox: number; oy: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // Reveal when entering the viewport, or if already scrolled past (e.g. anchor jumps)
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    onPick?.();
    // Touch keeps its native scrolling; only mouse / pen can drag.
    if (!draggable || e.button !== 0 || e.pointerType === "touch") return;
    dragStart.current = { px: e.clientX, py: e.clientY, ox: offset.x, oy: offset.y };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (!dragging || !dragStart.current) return;
    const { px, py, ox, oy } = dragStart.current;
    setOffset({ x: ox + (e.clientX - px), y: oy + (e.clientY - py) });
  };

  const endDrag = (e: ReactPointerEvent<HTMLElement>) => {
    if (!dragging) return;
    setDragging(false);
    dragStart.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const vars = {
    "--rot": `${rotate}deg`,
    "--dx": `${offset.x}px`,
    "--dy": `${offset.y}px`,
    "--delay": `${Math.min(index, 14) * 55}ms`,
    aspectRatio: `${w} / ${h}`,
    ...style,
  } as CSSProperties;

  const inkColor = handwrittenNote?.ink === "sepia"
    ? "#54371b"
    : handwrittenNote?.ink === "black"
    ? "#1a1817"
    : handwrittenNote?.ink === "red"
    ? "#b52026"
    : "#1f3a6b";

  return (
    <article
      ref={ref}
      aria-label={label}
      data-reveal=""
      className={clsx(
        "ticket",
        (inView || disableReveal) && "is-in",
        dragging && "is-dragging",
        draggable ? "cursor-grab" : "cursor-default",
        isSelected && "ring-2 ring-amber-400/80 rounded-sm shadow-[0_0_24px_rgba(245,158,11,0.4)]",
        className,
      )}
      style={vars}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="ticket-inner" style={{ "--u": `calc(100cqw / ${w})` } as CSSProperties}>
        <div className="ticket-face">
          {children}

          {/* ---------------- Overlay: Handwritten Note ---------------- */}
          {handwrittenNote?.text && (
            <div
              className="absolute pointer-events-none z-30 select-none"
              style={{
                bottom: "16%",
                left: "10%",
                right: "10%",
                transform: `rotate(${handwrittenNote.rotation ?? -2}deg)`,
                color: inkColor,
                fontFamily: "var(--font-script)",
                fontSize: `calc(28 * var(--u))`,
                lineHeight: 1.15,
                textShadow: "0 0 1px rgba(0,0,0,0.2)",
              }}
            >
              {handwrittenNote.text}
            </div>
          )}

          {/* ---------------- Overlay: Rubber Stamp ---------------- */}
          {stampOverlay && (
            <div
              className="absolute pointer-events-none z-30 select-none"
              style={{
                top: "14%",
                right: "10%",
                transform: "rotate(-7deg)",
              }}
            >
              {stampOverlay === "paye" && (
                <div
                  className="ink-worn border-[calc(3.5*var(--u))] border-[#c42d27] border-double rounded-[calc(4*var(--u))] px-[calc(10*var(--u))] py-[calc(4*var(--u))] text-center"
                  style={{ color: "#c42d27", background: "rgba(196,45,39,0.06)" }}
                >
                  <div style={{ fontFamily: "var(--font-bebas)", fontSize: `calc(30 * var(--u))`, letterSpacing: `calc(3 * var(--u))` }}>PAYÉ</div>
                  <div style={{ fontFamily: "var(--font-mono-vintage)", fontSize: `calc(8.5 * var(--u))`, fontWeight: 700 }}>ACQUITTÉ</div>
                </div>
              )}
              {stampOverlay === "confidentiel" && (
                <div
                  className="ink-worn border-[calc(3*var(--u))] border-[#b82a25] rounded-[calc(2*var(--u))] px-[calc(8*var(--u))] py-[calc(3*var(--u))] text-center"
                  style={{ color: "#b82a25", background: "rgba(184,42,37,0.06)" }}
                >
                  <div style={{ fontFamily: "var(--font-heavy)", fontSize: `calc(22 * var(--u))`, letterSpacing: `calc(2 * var(--u))` }}>CONFIDENTIEL</div>
                </div>
              )}
              {stampOverlay === "vu" && (
                <div
                  className="ink-worn border-[calc(2.5*var(--u))] border-[#234e8c] rounded-[calc(3*var(--u))] px-[calc(8*var(--u))] py-[calc(3*var(--u))] text-center"
                  style={{ color: "#234e8c", background: "rgba(35,78,140,0.06)" }}
                >
                  <div style={{ fontFamily: "var(--font-condensed)", fontSize: `calc(18 * var(--u))`, fontWeight: 700, letterSpacing: `calc(1.5 * var(--u))` }}>VU & APPROUVÉ</div>
                </div>
              )}
              {stampOverlay === "prioritaire" && (
                <div
                  className="ink-worn border-[calc(2.5*var(--u))] border-[#c43329] rounded-[calc(2*var(--u))] px-[calc(8*var(--u))] py-[calc(3*var(--u))] text-center"
                  style={{ color: "#c43329", background: "rgba(196,51,41,0.06)" }}
                >
                  <div style={{ fontFamily: "var(--font-heavy)", fontSize: `calc(18 * var(--u))`, letterSpacing: `calc(2 * var(--u))` }}>PRIORITAIRE</div>
                </div>
              )}
            </div>
          )}

          {/* ---------------- Overlay: Wax Seal with Ribbon ---------------- */}
          {sealOverlay && (
            <div
              className="absolute pointer-events-none z-30 select-none"
              style={{
                bottom: "-6%",
                right: "-4%",
                width: `calc(80 * var(--u))`,
                height: `calc(100 * var(--u))`,
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.45))",
              }}
            >
              <svg viewBox="0 0 160 200" style={{ width: "100%", height: "100%" }}>
                {/* Ribbon */}
                <path d="M 66 80 L 48 185 L 64 172 L 78 185 Z" fill="#9e1117" />
                <path d="M 82 80 L 102 190 L 88 178 L 76 190 Z" fill="#b8161e" />
                {/* Wax puddle */}
                <circle cx="80" cy="68" r="54" fill="#a80f15" stroke="#4a0407" strokeWidth="2" />
                <circle cx="80" cy="68" r="44" fill="#800a0f" stroke="#d6242c" strokeWidth="2" />
                {/* Fleur de Lys emblem */}
                <path
                  d="M 80 44 C 88 52 90 60 86 78 L 74 78 C 70 60 72 52 80 44 Z
                     M 74 78 C 64 76 56 68 58 58 C 60 50 68 54 70 60 C 72 66 76 74 78 76 Z
                     M 86 78 C 96 76 104 68 102 58 C 100 50 92 54 90 60 C 88 66 84 74 82 76 Z
                     M 64 78 H 96 V 82 H 64 Z"
                  fill="#c41a21"
                  stroke="#ff8287"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {caption && (
        <span className="ticket-caption" aria-hidden="true">
          {label}
        </span>
      )}
    </article>
  );
}
