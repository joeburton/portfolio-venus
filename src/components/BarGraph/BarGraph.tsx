import styles from "./BarGraph.module.css";

interface BarGraphProps {
  data: { label: string; value: number }[];
}

export const BarGraph = ({ data }: BarGraphProps) => {
  // Calculate the total of all values to determine percentages
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles["bar-graph"]}>
      {data.map((item) => (
        <div
          key={item.label}
          className={styles["bar"]}
          style={{ width: "100%" }}
        >
          <div
            className={styles["bar-fill"]}
            style={{ width: `${(item.value / totalValue) * 100}%` }}
            title={`${((item.value / totalValue) * 100).toFixed(2)}%`}
          >
            <span className={styles["bar-percentage"]}>
              {((item.value / totalValue) * 100).toFixed(2)}%
            </span>
          </div>
          <span className={styles["bar-label"]}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
