import * as React from 'react';
//import styles from './TestUploader.module.scss';
import type { ITestUploaderProps } from './ITestUploaderProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { SPFI, SPFx, spfi } from '@pnp/sp/presets/all';
import { ITestUploaderState } from './ITestUploaderState';
import { Icon, PrimaryButton, Stack, TextField } from '@fluentui/react';
//import {DropzoneArea} from 'material-ui-dropzone';
//import {DropzoneDialog} from 'material-ui-dropzone'
//import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import styles from './TestUploader.module.scss';


let sp:SPFI;
export default class TestUploader extends React.Component<ITestUploaderProps,ITestUploaderState > {
  addItem() {
    throw new Error('Method not implemented.');
  }
  constructor (props:any){
    super(props);
    this.state = {
      Id : 0,
      title : '',
      isOpen :false,
      image : null,

      titleError: '',
      fileError: '',
      dialogMessage: '',
      isDialogVisible: false,
      bgError: '',
      uploadedFileName: '',
      uploadedFileError: '',
      file: [],
      fieldId: '',
      uploadedFile: [],
      itemId: 0,
      errorMessage: '',

      UploaderArr : []
    }
    sp = spfi().using(SPFx(this.props.spcontext));
  }

  handleClose() {
    this.setState({
        isOpen: false
    });
    console.log(this.state.image)
}
  handleChange(file : any ){
    console.log("This is file,", file)
    this.setState({
      image : file,
      isOpen : false
    });
    console.log(file)
    this.createUploader( )
  }
  handleOpen(){
    this.setState({
      isOpen : true,
      image:null,
    })
  }
  createUploader = async (): Promise<void> =>{
    try{
      const item = await sp.web.lists.getByTitle("Test2UploadImage").items.add({
        Title:this.state.title,
        Image:this.state.image
      })
      console.log("This is the Item",item);
      this.setState({title:"",image:[]})
  }
  catch (error){
    console.log(error);
  }
}
  componentDidMount(): void {
    sp.web.lists.getByTitle("Test2UploadImage").items.select()()
    .then((items:any)=>{
      console.log("Data is getting fetched",items);
      items.map((item:any)=>{
        this.setState({
          Id:item.Id,
          title:item.Title,
          image:item.Image,
          UploaderArr:[...this.state.UploaderArr ,{"Id":item.Id,"title":item.Title,"image":item.Image}]
        })
      })
    })
   
  }
  public handleFileUpload = async (_files: any) => {
    console.log(_files);
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (_files.length === 0) {
      alert('No files were selected.');
      return;
    }
    const _file = _files[0];
    this.setState({ file: _file[0] });
    // const _listName = "BannerImage";
    const _folderPath = "/sites/FrahanTest/SiteAssets/Lists/Images_Testing";
    if (_file) {
      sp.web.getFolderByServerRelativePath(_folderPath)
        .files.addUsingPath(_file.name, _file, { Overwrite: true })
        .then(async (response: any) => {
          console.log(response)
          const _fileId = response.data.UniqueId;
          this.setState({ fieldId: _fileId });
          const imageUrl = response.data.ServerRelativeUrl;
          this.setState({ uploadedFile: imageUrl });
          console.log(imageUrl);

          // this.addItem(imageUrl);
        }).then(()=>{
          const json = {
            "type":"thumbnail",
            "nativeFile":{},
            "fieldId":"e56f91aa-0e9b-4e0e-a182-3bc91e9a0af1",
            "id":`${this.state.fieldId}`,
            "fieldName":"Image",
            "fileName":`${this.state.uploadedFileName}`,
            "serverUrl":"https://sonorasoftware365.sharepoint.com",
            "serverRelativeUrl":`${this.state.uploadedFile}`,
          }
          try{
            const uploaded = sp.web.lists.getByTitle("Test2UploadImage").items.select().add({
                Title:this.state.title,
                Image:JSON.stringify(json)
            })
            console.log("Added",uploaded);
          }
          catch(error){
            console.log("Error this is error while adding := ",error);
          }
        })


    }

 
 
    
 
    const allowedExtensionsRegex = /\.(png|jpeg|jpg|svg)$/i;
    if (!allowedExtensionsRegex.test(_file.name)) {
      this.setState({ uploadedFileError: 'Please upload a file with one of the following extensions: png, jpeg, jpg, svg' });
      return;
    }
    if (_file.size > maxSizeInBytes) {
      this.setState({ uploadedFileError: 'File size exceeds the 10MB limit.' });
      return;
    }
    this.setState({ uploadedFileError: '' });
 
    this.setState({ itemId: _file.itemId });
    this.setState({ uploadedFileName: _file.name });
  };


  public render(): React.ReactElement<ITestUploaderProps> {
    return (
     <div>
      
      <h1>Add a Component</h1>
      <Stack horizontal tokens={{ childrenGap: 40 }}>
          <TextField 
            label = "Enter Title"
            type = 'string'
           value = {this.state.title}
            onChange={(e:any)=>{this.setState({title:e.target.value})}}
          />
         
                <Dropzone onDrop={files => this.handleFileUpload(files)}>
                {({ getRootProps, getInputProps }) => (
                  <Stack className="container" style={{ width: "80%" }}>
                    <div
                      {...getRootProps({
                        className: 'dropzone',
                        onDrop: event => event.stopPropagation()
                      })}
                      className={styles.dragDropFile}
                    >
                      <input {...getInputProps()} placeholder='No File Chosen' required />
                      <Icon iconName="CloudUpload" style={{ marginRight: '8px', fontSize: '38px', marginTop: '27px', color: '#0078D4', }} />
                      <p style={{ marginTop: '13px', marginBottom: '10px' }}>Drag and Drop files here, Or click to select files</p>
                      <div className={styles.defaultButton}>
                        <PrimaryButton className={styles.chooseBtn}>Choose File</PrimaryButton>
                      </div>
                      <p style={{ margin: '0', padding: '0', marginBottom: '20px', marginTop: '9px' }}>File size must be less 10 MB</p>
                    </div>
                    {this.state.uploadedFileName ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon iconName="Document" style={{ marginRight: '8px', fontSize: '20px', color: '#0078D4', marginLeft: '10%', marginTop: '5px' }} />
                        <span style={{ marginRight: '8px' }}>{this.state.uploadedFileName}</span>
                      </div>
                    ) : (
                      <div style={{ color: 'red', marginLeft: '10%' }}>{this.state.uploadedFileError ? "" : this.state.fileError}</div>
                    )}
 
                  </Stack>
                )}
              </Dropzone>
      </Stack>
     </div>
    );
  }
}
