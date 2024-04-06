export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl?: string;
};
export type SearchUserParams = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  regId?: string;
  plan?: string;
  role?: string;
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
  contributionId?: string;
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
  timeLineId: number;
  cardTitle: string;
  // cardSubtitle: string;
  media: {
    type: string;
    source: {
      url: string;
    };
  };
};

export type StatementProp = {
  id?: number;
  contributionId: string;
  amount: string;
  plan: string;
  dateOfContribution: Date;
  verifiedContribution: boolean;
};

// NODEMAILER
export type MailOptionType = {
  from?: string;
  to?: string;
  subject?: string;
  text?: string;
  html?: string;
};
