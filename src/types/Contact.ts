export type Contact = {
  id: string;
  jobTitle: string;
  emailAddress: string;
  firstNameLastName: string;
};

export type UIContact = {
  data: Contact;
  isSelected: boolean;
  isPinned: boolean;
};
