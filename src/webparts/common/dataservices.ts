import { WebPartContext } from "@microsoft/sp-webpart-base";
// import { SPFI, SPFx, spfi} from "@pnp/sp";
import { SPFI, SPFx, spfi } from "@pnp/sp/presets/all";
 
let sp: SPFI;
 
export default class DataService {
  public constructor(context: WebPartContext) {
    sp = spfi().using(SPFx(context));
  }

    public deleteItem = async (itemId: number) => {
        try {
          await sp.web.lists
            .getByTitle("Announcements")
            .items.getById(itemId)
            .delete(); 
        } catch (err) {
          console.log("Error", err);
        }
      };

    public getAnnouncements = async () => {
        try {
          const result = await sp.web.lists
            .getByTitle("Announcements")
            .items.select()();
          return result;
        } catch (err) {
          console.log("Error", err);
        }
      
    }

    public addAnnouncement = async (
      fieldId:string,
      uploadedFileName:string,
      uploadedFile:string,
      title:string,
      linkdes:string,
      link:string,
      ) =>
    {
      const json = {
        type: "thumbnail",
        nativeFile: {},
        fieldId: "acb3c219-a773-4563-9825-09e98adab0d9",
        id: `${fieldId}`,
        fieldName: "Image",
        fileName: `${uploadedFileName}`,
        serverUrl: "https://sonorasoftware365.sharepoint.com",
        serverRelativeUrl: `${uploadedFile}`,
      };
      try{
      const uploaded =  await sp.web.lists
        .getByTitle("Announcements")
        .items.add({
          Title: title,
          Link0: {
            Description: linkdes,
            Url: link,
          },
          Image: JSON.stringify(json),
        });
        return uploaded;
      
      }
      catch(err){
        console.log("Error",err)
      }

    }
 
    public updateAnnouncement = async (
      fieldId:string,
      uploadedFileName:string,  
      uploadedFile:string,
      title:string,
      linkdes:string,
      link:string,
      itemId:number)=>{
        const json = {
          type: "thumbnail",
          nativeFile: {},
          fieldId: "acb3c219-a773-4563-9825-09e98adab0d9",
          id: `${fieldId}`,
          fieldName: "Image",
          fileName: `${uploadedFileName}`,
          serverUrl: "https://sonorasoftware365.sharepoint.com",
          serverRelativeUrl: `${uploadedFile}`,
        };
        try{
          const uploaded = await sp.web.lists.getByTitle("Announcements")
          .items.getById(itemId).update({
            Title: title,
            Link0: {
              Description: linkdes,
              Url: link,
            },
            Image: JSON.stringify(json),
          })
          return uploaded;
          }
          catch(err){
            console.log("Error",err)
          
          }
      }
}