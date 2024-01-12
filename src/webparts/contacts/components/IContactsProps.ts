import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IContactsProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spcontext:WebPartContext
}
