"use client";

import { Chrono } from "react-chrono";

const ChronoTimeline = ({ timeLineItems }: any) => {
  const notUndefined = typeof window !== "undefined";
  // if (typeof window === "undefined") {
  //   return (
  //     <div className="h-screen w-full flex items-center justify-center">
  //       <Spinner className="text-green-500" />
  //     </div>
  //   );
  // }
  return (
    <>
      {notUndefined && (
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
          allowDynamicUpdate={true}
          itemWidth={200}
          // activeItemIndex={0}
          mediaHeight={100}
          scrollable={{ scrollbar: true }}
          slideShow
          slideItemDuration={2000}
          slideShowType="reveal"
          // onScrollEnd={() => console.log("End of timeline")}
        />
      )}
    </>
  );
};

export default ChronoTimeline;
