import { generateRandomNumber } from "@/lib/utils";
import { Document, Schema, model, models, Model } from "mongoose";

export interface TimeLineProps extends Document {
  userId: string;
  timeLineId: number;
  timeline: {
    title: string;
    cardTitle: string;
    // cardSubtitle: string;
    media: {
      type: string;
      source: {
        url: string;
      };
    };
  };
  createdAt: Date;
}

const timeLineSchema = new Schema<TimeLineProps>({
  userId: { type: String, required: true },
  timeLineId: { type: Number, required: true },
  timeline: {
    title: {
      type: String,
      required: true,
    },
    cardTitle: {
      type: String,
      required: true,
    },
    // cardSubtitle: {
    //   type: String,
    //   required: true,
    // },
    media: {
      type: {
        type: String,
        required: true,
        default: "IMAGE",
      },
      source: {
        url: {
          type: String,
          required: true,
        },
      },
    },
  },
  createdAt: { type: Date, default: Date.now },
});

const TimeLines = models?.TimeLines || model("TimeLines", timeLineSchema);
export default TimeLines as Model<TimeLineProps>;
