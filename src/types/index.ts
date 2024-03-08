export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl?: string;
};

export type CreatePlanParams = {
  type: string;
  step: string;
  amount: string | number;
  isActive: boolean;
  subscriber: string;
};

export type ContributionParams = {
  amount: string;
  contributor: string;
  receipt: string;
  plan: string;
  dateOfContribution: Date;
  dateOfContributionUpdate: Date;
  verifiedContribution: false;
};
