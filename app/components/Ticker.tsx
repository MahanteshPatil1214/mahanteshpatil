import { stackLayers } from "@/app/data/stack";
import styles from "./portfolio.module.scss";

const tickerItems = stackLayers.flatMap((layer) => layer.items);

export default function Ticker() {
  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.tickerTrack}>
        {[0, 1, 2].map((copy) => (
          <div className={styles.tickerGroup} key={copy}>
            {tickerItems.map((item) => (
              <span key={`${copy}-${item}`}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
