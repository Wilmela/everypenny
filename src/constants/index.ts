import { CheckCircledIcon } from "@radix-ui/react-icons";
import { FaUserGroup } from "react-icons/fa6";
export const NAV_LINKS = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Plan",
    route: "/plan",
  },
  {
    label: "Profile",
    route: "/profile",
  },
  {
    label: "Faq",
    route: "/faq",
  },
  {
    label: "Dashboard",
    route: "/dashboard",
  },
];

// REVIEW

export const review = [
  {
    photo: "/assets/images/dp.jpeg",
    name: "Mchenry Ibra",
    location: "Port Harcourt",
    remark:
      "Every-Penny made saving for my dream project a breeze! Highly intuitive and customizable, it helped me reach my goal faster than expected.",
  },

  {
    photo: "/assets/images/dp.jpeg",
    name: "John Daniel",
    location: "Lagos",
    remark:
      "Thanks to Every-Penny, I achieved my dream project with ease. Customizable plans and user-friendly features made saving a joy.",
  },
];

// ABOUT
export const points = [
  {
    title: "Security",
    image: "/assets/icons/security.png",
    desc: "Rest assured that the security of your finances is our paramount concern. Our organization utilizes a meticulously designed and rigorously maintained system to manage financial transactions with absolute integrity and zero tolerance for any potential compromises.",
  },
  {
    title: "Ease of Use",
    image: "/assets/icons/ease.png",
    desc: "Our application prioritizes user experience with an intuitive interface and streamlined features. It ensures hassle-free navigation for users of all levels, enabling confident financial management. With thorough design, it empowers users to achieve their goals effortlessly.",
  },
  {
    title: "Plans",
    image: "/assets/icons/plan.png",
    desc: "Our plans offer complete customization, allowing you to tailor your savings strategy. They are meticulously designed to assist in decision-making, ensuring alignment with your financial goals",
  },
];

// SUB PLANS
export const subscriptionPlans = [
  {
    type: "Micro",
    duration: "3 Monthly",
    bgImg: "/assets/images/micro.jpg",
    desc: "Start saving for the next 3 months.",
  },
  {
    type: "Mini",
    duration: "6 Monthly",
    bgImg: "/assets/images/mini.jpg",
    desc: "Start saving for the next 6 months.",
  },
  {
    type: "Midi",
    duration: "9 Monthly",
    bgImg: "/assets/images/mid.jpg",
    desc: "Start saving for the next 9 months.",
  },
  {
    type: "Maxi",
    duration: "12 Monthly",
    bgImg: "/assets/images/jumbo.jpg",
    desc: "Start saving for the next 1 year.",
  },
];

// SUB TYPE
export const getSubType = (plan: { type?: string }): string => {
  const userSub = subscriptionPlans.find(
    (sub) => sub.type === plan?.type
  ) as (typeof subscriptionPlans)[number];
  return userSub?.type;
};

export const initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  imageUrl: "",
};

//FAQ
export const FAQ: {
  question: string;
  answer: { main: string; points: string[] };
}[] = [
  {
    question: "What services does EveryPenny providers?",
    answer: {
      main: "Every Penny is a secure, user-friendly platform designed to help you save for your goals. We offer:",
      points: [
        "Goal Setting Tools: Set clear, achievable goals and track your progress with our intuitive interface.",
        "Automated Savings: Schedule automatic transfers from your checking account to your Every Penny account, making saving effortless",
        "Progress Visualization: Stay motivated with progress charts and celebratory milestones!",
        "Community Support: Connect with other savers, share tips, and celebrate each other's successes!",
      ],
    },
  },
  {
    question: "How can Every Penny benefit me?",
    answer: {
      main: "Every Penny is more than just a savings app. It's your personalized financial cheerleader",
      points: [
        "Break Down Barriers: Small, consistent savings add up! Every Penny helps you conquer seemingly impossible goals.",
        "Stay Focused: Eliminate temptation by separating your spending and saving accounts.",
        "Progress Visualization: Stay motivated with progress charts and celebratory milestones!",
        "Empowerment Through Knowledge: Our financial resources and community forum equip you with the tools to manage your money with confidence.",
      ],
    },
  },
  {
    question:
      "Is EveryPenny compliant with financial regulations and standards?",
    answer: {
      main: "Financial security is our top priority. Every Penny is a registered 501(c)(3) non-profit organization. Your funds are held in a secure, FDIC-insured partner bank. We prioritize transparency and accountability, so you can save with peace of mind.",
      points: [],
    },
  },
  {
    question:
      "What sets EveryPenny apart from other financial savings providers? ",
    answer: {
      main: "Every Penny goes beyond traditional savings. We're a community-driven platform with a mission:",
      points: [
        "Non-Profit Focus: We're not driven by profit margins. We're driven by your success!",
        "Empowerment Over Selling: We don't push investment products or hidden fees. We focus on helping you save smart.",
        "Building Confidence: We believe financial literacy is key. We offer resources and support to help you understand your finances.",
      ],
    },
  },
];

// DASHBOARD
export const adminActions = [
  {
    href: "/dashboard/verify-contribution",
    icon: CheckCircledIcon,
    text: "Verify contribution",
    tag: "Verify",
  },
  {
    href: "/dashboard/users",
    icon: FaUserGroup,
    text: "View all Users",
    tag: "Users",
  },
];
