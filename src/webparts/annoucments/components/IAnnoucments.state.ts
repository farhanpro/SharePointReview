export interface IAnnouncmentsState {
    Id:number;
    isOpen:boolean;
    isModalOpen:boolean;
    title : string;
    link : any;
    linkdes:any
    image : any;
    isDeleteOpen:boolean;
    isEditCall : boolean;
    isAddCall : boolean;
    handleImage:boolean;
    Confirmation:boolean;
    deleteId : number;
    
    //For images one 
    // imageIdForEdit : string;
    // imageUploadedFile:string;
    // serverRelatedUrl : string;
    
    titleError: string;
    fileError : string;
    dialogMessage : string;
    isDialogVisible : boolean;
    bgError : string;
    uploadedFileName : string;
    uploadedFileError:string;
    file :[];
    fieldId : string;
    uploadedFile : any;
    itemId: number;
    errorMessage : string;

    employeeArr : AnnoucmentsArr[];
}
interface AnnoucmentsArr {
    Id:number;
    title:string;
    link :any;
    image:any;
}