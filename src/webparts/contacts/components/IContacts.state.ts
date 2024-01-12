export interface IContactsState {
    Id:number;
    Title : string;
    ContactType:string;
    Contact : string;
    ContactsArr  : ContactStateArr[]
}
interface ContactStateArr {
    Id:number;
    Title : string;
    ContactType:string;
    Contact : string
}