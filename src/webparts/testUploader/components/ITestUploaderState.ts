export interface ITestUploaderState {
    Id : number;
    title:string;
    image : any
    isOpen : boolean;
    
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

    UploaderArr : ITestUploaderArr[];
}
interface ITestUploaderArr{
    Id : number;
    title:string;
    image:any

}