import type { CSSProperties, ReactNode } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { paperBg } from "../../lib/paper";

export const INK = "#2f281f";
export const RED = "#b93c32";
export const BLUE = "#244d78";
export const GREEN = "#346044";
export const GOLD = "#b88938";

export const stock = {
  cream: paperBg("#faf3df", "#f0e4c8", "#dfcfaa"),
  white: paperBg("#f8f6ee", "#eeeadf", "#ddd7c8"),
  yellow: paperBg("#f7d777", "#edc65c", "#d9ae42"),
  pink: paperBg("#f3d9d5", "#e9c7c3", "#d7aaa7"),
  green: paperBg("#dce8c8", "#cadbb2", "#adc590"),
  blue: paperBg("#d7e6e7", "#c3d9dc", "#a9c6ca"),
  kraft: paperBg("#ead7ad", "#dcc495", "#c7a976"),
  dark: paperBg("#313238", "#222329", "#15161b"),
} as const;

export function Rule({ color = "currentColor", style }: { color?: string; style?: CSSProperties }) {
  return <div style={{ height: u(1.5), background: color, opacity: 0.72, ...style }} />;
}

export function Dots({ color = "currentColor" }: { color?: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        flex: 1,
        minWidth: u(10),
        borderBottom: `${u(2)} dotted ${color}`,
        opacity: 0.55,
        transform: `translateY(${u(-3)})`,
      }}
    />
  );
}

export function Serial({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        fontFamily: F.mono,
        fontWeight: 700,
        fontSize: u(11),
        letterSpacing: u(2),
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function SmallLabel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        fontFamily: F.cond,
        fontWeight: 600,
        fontSize: u(10.5),
        letterSpacing: u(2.5),
        lineHeight: 1,
        textTransform: "uppercase",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function Punch({ x, y, hit = false, color = INK }: { x: number; y: number; hit?: boolean; color?: string }) {
  return (
    <span
      aria-hidden="true"
      className="absolute"
      style={{
        left: u(x),
        top: u(y),
        width: u(10),
        height: u(10),
        borderRadius: "50%",
        border: `${u(1.4)} solid ${color}`,
        background: hit ? color : "transparent",
        opacity: hit ? 0.78 : 0.38,
      }}
    />
  );
}

export function CornerStars({ color = "currentColor" }: { color?: string }) {
  return (
    <>
      {[
        [12, 12],
        [88, 12],
        [12, 88],
        [88, 88],
      ].map(([x, y], i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%`, color, fontSize: u(10), transform: "translate(-50%,-50%)" }}
        >
          ★
        </span>
      ))}
    </>
  );
}

export function Guilloche({ color = "currentColor", opacity = 0.15 }: { color?: string; opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        opacity,
        backgroundImage: `repeating-radial-gradient(ellipse at 50% 50%, transparent 0 ${u(7)}, ${color} ${u(7)} ${u(8)}, transparent ${u(8)} ${u(14)})`,
        backgroundSize: `${u(72)} ${u(46)}`,
      }}
    />
  );
}
