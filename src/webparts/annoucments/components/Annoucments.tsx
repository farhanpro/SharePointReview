import styles from "./Annoucments.module.scss";
import type { IAnnoucmentsProps } from "./IAnnoucmentsProps";
import { SPFI, SPFx, spfi } from "@pnp/sp/presets/all";
import { IAnnouncmentsState } from "./IAnnoucments.state";
import { Stack } from "@fluentui/react/lib/Stack";
import { Icon, IconButton, Modal } from "office-ui-fabric-react";
import { PrimaryButton, DefaultButton,TextField, TooltipHost, Text } from "@fluentui/react";
import * as React from "react";
import Dropzone from "react-dropzone";
import DataService from "../../common/dataservices";

//import { WebPartContext } from "@microsoft/ps-webpart-base";
//import {DropzoneDialog} from 'material-ui-dropzone';
//import Button from '@material-ui/core/Button';
//import Constants from '../../common/Constants';
//import { PrimaryButton } from '@fluentui/react';

let sp: SPFI;
let commonService: any = null;
let items : any = null;

//const COMMONSERVICE : any = null;

export default class Annoucments extends React.Component<
  IAnnoucmentsProps,
  IAnnouncmentsState
> {
  onDrop: (files: any) => void;
  constructor(props: any) {
    super(props);
    this.state = {
      Id: 0,
      isModalOpen: false,
      isOpen: false,
      title: "",
      link: null,
      linkdes: "",
      image: null,
      isDeleteOpen: false,
      isEditCall: false,
      isAddCall:false,
      deleteId:0,
      handleImage:false,
      Confirmation:false,

      titleError: "",
      fileError: "",
      dialogMessage: "",
      isDialogVisible: false,
      bgError: "",
      uploadedFileName: "",
      uploadedFileError: "",
      file: [],
      fieldId: "",
      uploadedFile: [],
      itemId: 0,
      errorMessage: "",
      employeeArr: [],
    };


    sp = spfi().using(SPFx(this.props.spcontext));
    this.onDrop = (files) => {
      this.setState({ image: files });
    };
  }
  
  



  async componentDidMount(): Promise<void> {
    try {
      const commonService = new DataService(this.props.spcontext);

      items = await commonService.getAnnouncements();
  
      items.map((item: any) => {
        this.setState({
          Id: item.Id,
          title: item.Title,
          link: item.Link0,
          image: item.Image,
          employeeArr: [
            ...this.state.employeeArr,
            {
              Id: item.Id,
              title: item.Title,
              image: item.Image,
              link: item.Link0,
            },
          ],
        });
      });
    } catch (error) {
      console.error("Error in componentDidMount", error);
      // Handle the error if needed
    }
  }
  

  OpenModal = () => {
    this.setState({
      isModalOpen: true,
      title: "",
      link: null,
      linkdes: "",
      image: "",
      uploadedFileName: "",
    });
  };

  EditModal = async (item: any) : Promise<void> => {
    try{
      const result = await sp.web.lists.getByTitle('Announcements').items.getById(item.Id)();
      const ImageJson = JSON.parse(result.Image);
     
      this.setState({
        Id : result.Id,
        title : result.Title,
        linkdes : result.Link0.Description,
        link:result.Link0.Url,
        //For image
        fieldId : ImageJson.id,
        uploadedFileName:ImageJson.filename,
        uploadedFile:ImageJson.serverRelativeUrl,

        isModalOpen: true,
        isEditCall: true,
      });
      console.log(ImageJson,"Image Json");
      console.log("Result",result);
    }
    
    catch(err)
    {
      console.log("Error",err)
    }
    
  };

  UpdateModal = async () : Promise<void> => {
    try{
      const commonService = new DataService(this.props.spcontext);
      const uploaded = await commonService.updateAnnouncement(
        this.state.fieldId,
        this.state.uploadedFileName,
        this.state.uploadedFile,
        this.state.title,
        this.state.linkdes,
        this.state.link,
        this.state.Id);

      this.setState({
        //isEditCall:false,
        Confirmation : true,
        isDialogVisible:false,
        isModalOpen:false,
        employeeArr : []})
      console.log("Updated",uploaded);
      this.componentDidMount();
    }
    catch(err)
    {
      console.log("Error",err)
    }
    // try
    // {
    //   const json = {
    //     type: "thumbnail",
    //     nativeFile: {},
    //     fieldId: "acb3c219-a773-4563-9825-09e98adab0d9",
    //     id: `${this.state.fieldId}`,
    //     fieldName: "Image",
    //     fileName: `${this.state.uploadedFileName}`,
    //     serverUrl: "https://sonorasoftware365.sharepoint.com",
    //     serverRelativeUrl: `${this.state.uploadedFile}`,
    //   }; 

    //     const updated = sp.web.lists
    //                     .getByTitle("Announcements")
    //                     .items.getById(this.state.Id)
    //                     .update({
    //                         Title : this.state.title,
    //                         Link0:{
    //                           Description : this.state.linkdes,
    //                           Url : this.state.link,
    //                         },
    //                         Image : JSON.stringify(json),
    //                     })
    //                     console.log("Updated",updated);
    //                     this.setState({isEditCall:false,isDialogVisible:false,isModalOpen:false,employeeArr : []})
    //                     this.componentDidMount();
    // }
    // catch(error){
    //   console.log(error);
    // }
  }

  clearStates =()=>{
    this.setState({
      isOpen:false,
      isModalOpen:false,
      title:"",
      link:null,
      linkdes:"",
      image:null,
      uploadedFileName:"",
      uploadedFileError:"",
      file:[],
      fieldId:"",
      uploadedFile:[],
      itemId:0,
      errorMessage:"",
      isDeleteOpen:false,
      isEditCall:false,
      handleImage:false,
      titleError:"",
      fileError:"",
      dialogMessage:"",
      isDialogVisible:false,
      bgError:"",
    })
  }

  deleteItem = async  (item:any) => {
    try{
    commonService = new DataService(this.props.spcontext),
    await commonService.deleteItem(this.state.deleteId),
   // console.log("Deleted from parameter",item);
   // console.log("Deleted from parameter",this.state.deleteId);
     this.setState({
      Confirmation:true,
      isAddCall:false,
      isDeleteOpen:false,
      employeeArr:[]
    })
    this.componentDidMount();
  }
  catch (error)
  {
    console.log(error);
  }
  };

  AddItem = async () : Promise<void>  =>{
    try{
      const commonService = new DataService(this.props.spcontext);
      await commonService.addAnnouncement(
        this.state.fieldId,
        this.state.uploadedFileName,
        this.state.uploadedFile,
        this.state.title,
        this.state.linkdes,
        this.state.link);
      
        this.setState({ 
        isDialogVisible: false, 
        isModalOpen: false ,
        Confirmation : true,
        isAddCall:true,
        employeeArr : []
      });
         console.log("Added", items);
         this.componentDidMount();
    }
    catch(error)
    {
      console.log(error);
    }
         
  }

  public handleFileUpload = async (_files: any) => {
    console.log(_files);
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (_files.length === 0) {
      alert("No files were selected.");
      return;
    }
    const _file = _files[0];
    this.setState({ file: _file[0] });
    // const _listName = "BannerImage";
    const _folderPath = "/sites/FrahanTest/SiteAssets/Lists/Images_Testing";
    if (_file) {
      sp.web
        .getFolderByServerRelativePath(_folderPath)
        .files.addUsingPath(_file.name, _file, { Overwrite: true })
        .then(async (response: any) => {
          console.log(response);
          const _fileId = response.data.UniqueId;
          this.setState({ fieldId: _fileId });
          const imageUrl = response.data.ServerRelativeUrl;
          this.setState({ uploadedFile: imageUrl });
          console.log("Image Url",imageUrl);

          // this.addItem(imageUrl);
        })
        
    }

    const allowedExtensionsRegex = /\.(png|jpeg|jpg|svg)$/i;
    if (!allowedExtensionsRegex.test(_file.name)) {
      this.setState({
        uploadedFileError:
          "Please upload a file with one of the following extensions: png, jpeg, jpg, svg",
      });
      return;
    }
    if (_file.size > maxSizeInBytes) {
      this.setState({ uploadedFileError: "File size exceeds the 10MB limit." });
      return;
    }
    this.setState({ uploadedFileError: "" });

    this.setState({ itemId: _file.itemId });
    this.setState({ uploadedFileName: _file.name });
  };

  public render(): React.ReactElement<IAnnoucmentsProps> {
    return (
      <Stack >
        <Stack className={styles.box2}>
          <Stack className={styles.box2}>
            <Icon
              iconName="Megaphone"
              aria-label="Add Online Event Icon"
              style={{ fontSize: "40px" }}
            />
            <TooltipHost content={"Announcements"}>
              <h2 className={styles.title}>Annoucements</h2>
            </TooltipHost>
          </Stack>
          <Stack>
          <IconButton
                  className={styles.iconButton}
              iconProps={{ iconName: "Add" }}
              title="Add"
              ariaLabel="Add"
              color="#5A2A82"
              onClick={this.OpenModal}
             // style={{ fontSize: "10%" }}
            />
          </Stack>

          <Modal
            isOpen={this.state.isModalOpen}
            onDismiss={() => {
              this.setState({ isModalOpen: false , isEditCall:false,isOpen:false});
            }}
            isBlocking={false}
            styles={{ main: { width: "40%", height: "70%" } }}
          >
           
            <Stack horizontal className={`${styles.headingStyle}`}>
              <Text variant={"xLarge"} className={`${styles.headingText}`}>
               {this.state.isEditCall == true ? "Edit Modal" : "Add Model" } 
              </Text>
            </Stack>
            <Stack className={styles.insideModal}>

            <Dropzone onDrop={(files) => this.handleFileUpload(files)}>
  {({ getRootProps, getInputProps }) => (
    <Stack
        className={styles.dragDropFile}
    >
      <Stack
        {...getRootProps({
          
          onDrop: (event) => event.stopPropagation(),
        })}
       
        className={styles.inputSection}
      >
        <input
          {...getInputProps()}
          placeholder="No File Chosen"
          required
          //style={{ display: "none" }} // Hide the default input style
        />
        <Icon
          iconName="CloudUpload"
          style={{
            fontSize: "38px",
            color: "#5A2A82",
            marginBottom: "10px", // Adjust spacing as needed
          }}
        />
        <p >
          Drag and Drop files here, Or click to select files
        </p>
        <div
        
        >
          <PrimaryButton className={styles.chooseBtn}>Choose File</PrimaryButton>
          {/* Add your Edit and Cancel buttons here */}
         
        </div>
        <p style={{ margin: "10px 0", color: "red" }}>
          {this.state.uploadedFileName
            ? ""
            : this.state.uploadedFileError
            ? ""
            : this.state.fileError}
        </p>
      </Stack>
      {this.state.uploadedFileName && (
        <Stack style={{ display: "flex", alignItems: "center" }}>
          <Icon
            iconName="Document"
            style={{
              marginRight: "8px",
              fontSize: "20px",
              color: "#5A2A82",
              marginLeft: "10%",
              marginTop: "5px",
            }}
          />
          <span >
            {this.state.uploadedFileName}
          </span>
        </Stack>
      )}
    </Stack>
  )}
            </Dropzone>


             
              <TextField
                label="Title"
                placeholder="Title"
                value={this.state.title}
                onChange={(
                  e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
                  newValue?: string | undefined
                ) => this.setState({ title: newValue || "" })}
              />
              
              <TextField
                label="Link Description"
                placeholder="Link Description"
                value={this.state.linkdes}
                onChange={(
                  e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
                  newValue?: string | undefined
                ) => this.setState({ linkdes: newValue || "" })}
              />
              <TextField
                label="Link URL"
                placeholder="Link URL"
                value={this.state.link}
                onChange={(
                  e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
                  newValue?: string | undefined
                ) => this.setState({ link: newValue || "" })}
              />
              <Stack className={styles.defaultButton}>
              {this.state.isEditCall == true ?  <DefaultButton onClick={()=>{this.UpdateModal()}}>Edit Image</DefaultButton> :<DefaultButton disabled = {this.state.linkdes == "" ? true : false} onClick={()=>{this.AddItem()}}>Add Image</DefaultButton> }
              <DefaultButton onClick={() =>{this.clearStates()}} className={styles.cancelBtn}> Cancel</DefaultButton>
              </Stack>
             </Stack>
          </Modal>
        </Stack>

        {this.state.employeeArr
          .filter(
            (item) =>
              item.title && item.link && item.link.Url && item.link.Description
          )
          .map((item) => {
            const temp2 = JSON.parse(item.image);
            //console.log("Temp2 ", temp2);
            return (
              <Stack key={item.Id} className={styles.box}>
                <img
                  className={styles.welcomeImage}
                  src={
                    temp2 == null
                      ? "/sites/FrahanTest/SiteAssets/Lists/2f81825b-0aff-43ee-96b1-c48dd61edd54/Announcement%201.png"
                      : temp2.serverRelativeUrl
                  }
                  alt={item.title}
                />
                <Stack className={styles.body}>
                  <h3 className={styles.wrap}>
                    <TooltipHost content={`${item.title}`}>
                      {item.title}
                    </TooltipHost>
                  </h3>
                  <p className={styles.wrap}>
                    <TooltipHost content={`${item.link.Description}`}>
                      <a href={item.link.Url}>{item.link.Description}</a>
                    </TooltipHost>
                  </p>
                </Stack>
                <Stack className={styles.box2}>
                  <IconButton
                  className={styles.iconButton}
                    iconProps={{ iconName: "Delete" }}
                    title="Delete"
                    ariaLabel="Delete"
                    // onClick={()=>{this.deleteItem(item.Id)}}
                    onClick={() => {
                      this.setState({ isDeleteOpen: true ,deleteId:item.Id});
                    }}
                   
                  />

                  <Modal
                    isOpen={this.state.isDeleteOpen}
                    onDismiss={() => {
                      this.setState({ isDeleteOpen: false });
                    }}
                    isBlocking={false}
                    styles={{ main: { width: "40%", height: "20%" } }}
                  >
                    <Stack horizontal className={`${styles.headingStyle}`}>
                      <Text
                        variant={"xLarge"}
                        className={`${styles.headingText}`}
                      >
                        Confirmation
                      </Text>
                    </Stack>

                    <Stack styles={{ root: { paddingLeft: "20px" } }}>
                      <h2>Do you really want delete this entry?</h2>
                    </Stack>

                    <Stack
                      styles={{ root: { paddingLeft: "20px" } }}
                      horizontal
                      horizontalAlign="start"
                      tokens={{ childrenGap: 10 }}
                    >
                      <PrimaryButton
                        onClick={ () => { this.deleteItem(item.Id)}}
                      >
                        Yes
                      </PrimaryButton>
                      <PrimaryButton
                        onClick={() => this.setState({ isDeleteOpen: false })}
                      >
                        No
                      </PrimaryButton>
                    </Stack>
                  </Modal>


                  <Modal
                    isOpen={this.state.Confirmation}
                    onDismiss={() => {
                      this.setState({ Confirmation: false,isEditCall : false,isAddCall:false });
                    }}
                    isBlocking={false}
                    styles={{ main: { width: "40%", height: "20%" } }}
                  >
                    <Stack horizontal className={`${styles.headingStyle}`}>
                      <Text
                        variant={"xLarge"}
                        className={`${styles.headingText}`}
                      >
                        Confirmation
                      </Text>
                    </Stack>

                    <Stack styles={{ root: { paddingLeft: "20px" } }}>
                      <h2>{this.state.isEditCall == true ? 'Entry Updated ':'Entry Deleted' && this.state.isAddCall == true ? 'Entry Added ':'Entry Deleted' }</h2>
                    </Stack>

                    <Stack
                      styles={{ root: { paddingLeft: "20px" } }}
                      horizontal
                      horizontalAlign="start"
                      tokens={{ childrenGap: 10 }}
                    >
                      <PrimaryButton
                        onClick={ () => {this.setState({Confirmation:false,isEditCall:false,isAddCall:false})}}
                      >
                        Okay
                      </PrimaryButton>
                    </Stack>
                  </Modal>

                  <IconButton
                  className={styles.iconButton}
                    iconProps={{ iconName: "EditSolid12" }}
                    title="Edit"
                    ariaLabel="Edit"
                    color= "#5A2A82"
                    onClick={()=>{this.EditModal(item)}}
                    //style={{ fontSize: "180px" }}
                  />
                </Stack>
              </Stack>
            );
          })}
      </Stack>
    );
  }
}
