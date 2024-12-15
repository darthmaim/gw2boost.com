import styles from "./page.module.css";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <div className={styles.placeholder}>
      <h1>GW2Boost</h1>
      Coming soon...<br/>

      <Button type="link" href="/login">Login</Button>
    </div>
  );
}
