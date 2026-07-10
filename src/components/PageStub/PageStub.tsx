import styles from "./PageStub.module.css";

/** Temporary stub for routes built in later passes (§7 / build plan weeks 2–4). */
export default function PageStub({
  label,
  title,
  note,
}: {
  label: string;
  title: string;
  note: string;
}) {
  return (
    <section className={styles.stub}>
      <div className="container">
        <p className="label">{label}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.note}>{note}</p>
      </div>
    </section>
  );
}
