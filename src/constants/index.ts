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
    label: "Support",
    route: "/support",
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
    image: "/assets/icons/security.png",
    desc: "Our application prioritizes user experience with an intuitive interface and streamlined features. It ensures hassle-free navigation for users of all levels, enabling confident financial management. With thorough design, it empowers users to achieve their goals effortlessly.",
  },
  {
    title: "Plans",
    image: "/assets/icons/security.png",
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
};
