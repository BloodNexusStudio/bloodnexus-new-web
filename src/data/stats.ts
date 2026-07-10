/** Studio stats strip (§6.4). Numbers count up on scroll. [CONTENT] real figures. */

export type Stat = {
  value: number; // numeric target for the count-up tween
  suffix?: string; // e.g. "+", "K"
  label: string;
};

export const STATS: Stat[] = [
  { value: 12, suffix: "+", label: "Team Members" }, // [CONTENT]
  { value: 5, suffix: "+", label: "Years Building" }, // [CONTENT]
  { value: 8, suffix: "", label: "Projects Shipped" }, // [CONTENT]
  { value: 2, suffix: "", label: "Engines Mastered" }, // [CONTENT] Unreal + Unity
];
