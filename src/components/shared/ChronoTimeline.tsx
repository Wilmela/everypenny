"use client";

import { TimeLineParams } from "@/types";
import { Chrono } from "react-chrono";

const ChronoTimeline = ({ timeLineItems }: any) => {
  if (typeof window === "undefined") {
    alert("Window is undefined");
  }
  
  return (
    <>
      <Chrono
        items={timeLineItems}
        mode="VERTICAL_ALTERNATING"
        theme={{
          primary: "green",
          secondary: "lightGreen",
          cardBgColor: "white",
          titleColor: "black",
          // titleColorActive: "white",
        }}
        fontSizes={{
          cardText: "0.8rem",
          cardSubtitle: "0.7rem",
          cardTitle: "0.8rem",
          title: "1rem",
        }}
        cardHeight={100}
        contentDetailsHeight={50}
        itemWidth={200}
        // activeItemIndex={0}
        mediaHeight={100}
        scrollable={{ scrollbar: true }}
        slideShow
        slideItemDuration={2000}
        slideShowType="reveal"
        onScrollEnd={() => console.log("End of timeline")}
      />
    </>
  );
};

export default ChronoTimeline;
