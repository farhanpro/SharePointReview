export interface IContactsState {
    Id:number;
    Title : string;
    ContactType:string;
    Contact : string;
    isAddOpen : boolean;
    Confirmation:boolean;
    ContactsArr  : ContactStateArr[]
}
interface ContactStateArr {
    Id:number;
    Title : string;
    ContactType:string;
    Contact : string
}