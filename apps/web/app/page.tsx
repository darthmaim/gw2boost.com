import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.placeholder}>
      <h1>GW2Boost</h1>
      Coming soon...<br/>

      <Link href="/login">Login</Link>
    </div>
  );
}
