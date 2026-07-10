import GamesGrid from "@/components/games/GamesGrid";
import styles from "./games.module.css";

export const metadata = {
  title: "All Games — BloodNexus Studio",
  description:
    "Explore games and projects from BloodNexus Studio — built with Unreal Engine and Unity across PC, console, mobile and VR.",
};

// §7 /games — grid + filters
export default function GamesPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <p className="label">Our Work</p>
        <h1 className={styles.heading}>All Games</h1>
        <GamesGrid />
      </div>
    </section>
  );
}
