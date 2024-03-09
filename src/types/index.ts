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
  amount: string;
  contributor: string;
  receipt: string;
  plan: string;
  dateOfContribution: string;
  // dateOfContributionUpdate: Date;
  verifiedContribution: false;
};
