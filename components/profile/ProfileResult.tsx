"use client";
import Chart from "react-apexcharts";

import { useUserStore } from "@/store/user-store";
import { chartOptions } from "@/components/configs/chart-config";

import styles from "./ProfileResult.module.scss";

const ProfileResult = () => {
  const userResult = useUserStore((state) => state.user?.answerdQuestions);

  const resultCount = userResult?.reduce((arc) => {
    return arc + 1;
  }, 0);

  const resultCountPercent = Math.round((resultCount! / 16) * 100);
  const color : string = !resultCountPercent || resultCountPercent <= 50 ? "#ff3400" : resultCountPercent <= 70 ? "#e5a900" : "#00ffa9"
  chartOptions.fill.colors = [color]
  chartOptions.plotOptions.radialBar.dataLabels.value.color = color

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.title}>Keep it up!</div>
        <span className={styles.text}>
          You have answerd {resultCount} out of 16 questions
        </span>
      </div>
      <Chart
        series={[resultCountPercent]}
        options={chartOptions as any}
        width={200}
        height={200}
        type="radialBar"
      />
    </div>
  );
};

export default ProfileResult;
