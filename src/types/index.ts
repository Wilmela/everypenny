export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl?: string;
};

export type CreatePlanParams = {
  amount: string | number;
  step: string;
  type: string;
  duration: string;
  isActive: boolean;
  subscriber: string;
};

export type ContributionParams = {
  amount: number;
  contributor: string;
  receipt: string;
  plan: string;
  dateOfContribution: Date;
  // dateOfContributionUpdate: Date;
  verifiedContribution: false;
};

export type TimeLineParams = {
  title: string;
  cardTitle: string;
  cardSubtitle: string;
  media: {
    type: string;
    source: {
      url: string;
    };
  };
};