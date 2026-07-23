/** Studio stats strip (§6.4). Numbers count up on scroll. [CONTENT] real figures. */

export type Stat = {
  value: number; // numeric target for the count-up tween
  suffix?: string; // e.g. "+", "K"
  label: string;
};

export const STATS: Stat[] = [
  { value: 3, suffix: "+", label: "Years Building" },
  { value: 100, suffix: "+", label: "Projects" },
];
