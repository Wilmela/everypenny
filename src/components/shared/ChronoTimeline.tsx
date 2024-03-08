"use client";

import { timeLineItems } from "@/constants";
import { Chrono } from "react-chrono";

const ChronoTimeline = () => {
  return (
    <div>
      <Chrono
        items={timeLineItems}
        mode="VERTICAL_ALTERNATING"
        allowDynamicUpdate={true}
        cardHeight={150}
        contentDetailsHeight={50}
        itemWidth={200}
        // activeItemIndex={1}
        mediaHeight={100}
        scrollable={true}
        slideItemDuration={2000}
        onScrollEnd={() => console.log("End of timeline")}
      />
    </div>
  );
};

export default ChronoTimeline;
