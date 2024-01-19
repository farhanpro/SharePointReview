import * as React from 'react';
//import styles from './QuickLinks.module.scss';
import styles from "./QuickLinks.module.scss";
import type { IQuickLinksProps } from './IQuickLinksProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { SPFI, SPFx, spfi } from '@pnp/sp/presets/all';
import { IconButton, Stack,TooltipHost,Text,  Link,StackItem, Icon } from "@fluentui/react";
import Constants from '../../common/Constants';
import { IQuickLinksState } from './IQuickLinksState';


let sp: SPFI;
export default class ProQuickLinks extends React.Component<IQuickLinksProps, IQuickLinksState> {
  constructor(props:any){
    super(props);
    this.state = {
      Id : 0,
      Title:'',
      FileType:'',
      Link:'',
      QuickLinksArr: []

    }
    sp = spfi().using(SPFx(this.props.spcontext));
  }
  componentDidMount(): void {
    sp.web.lists.getByTitle("ProdQuickLinks").items.select()()
    .then((item:any)=>{
      item.map((item:any)=>{
        this.setState({
          Id : item.Id,
          Title:item.Title,
          FileType:item.FileType,
          Link:item.Link,
          QuickLinksArr :[...this.state.QuickLinksArr,{"Id":item.Id,"Title":item.Title,"FileType":item.FileType,"Link":item.Link}]
        })

      })
      console.log("This is Quick Links arr",this.state.QuickLinksArr);
    })
  }
  public render(): React.ReactElement<IQuickLinksProps> {
    return (
    <section className={`${styles.procurementKeyContacts}`}>
       <Stack horizontal className={`${styles.headingStyle}`}>
          <IconButton className={styles.contactInfoIcon} iconProps={Constants.ICONS.CONTACT_DETAILS_ICON} />
          <TooltipHost content={`QuickLink`}
            className="tooltipHostStyle"
            styles={Constants.TOOLTIP_ELLIPSIS_STYLES}
          >
            <Text variant={'xLarge'} className={`${styles.headingText}`}>Quick Links</Text>
          </TooltipHost>
        </Stack>
        <Stack className={styles.contactStack}>
        <Stack style={{ marginRight: 10 }}>
          { 
          <React.Fragment>
            {this.state.QuickLinksArr
              .filter(val => val.Id && val.Title && val.FileType && val.Link )
            .map((val)=>{
              return(
                <React.Fragment>
                   <Stack horizontal style={{ borderBottom: '1px solid #EEEEEE', padding: '10px 0px 10px 24px' }}>
                    <StackItem className={styles.iconStackStyle}>
                      {
                        val.FileType === 'pdf'?
                        <StackItem className={styles.personStack}>
                                    <Icon className={styles.iconStyle} iconName={Constants.ICONS.PDF.iconName} />
                                  </StackItem>
                                  :
                        val.FileType === 'links' ?
                        <StackItem className={styles.emailStack}>
                                      <Icon className={styles.iconStyle} iconName={Constants.ICONS.LINK.iconName} />
                                    </StackItem>
                                    :
                        val.FileType === '.ppt' ?
                        <StackItem className={styles.linkStack}>
                                      <Icon className={styles.iconStyle} iconName={Constants.ICONS.PPT.iconName} />
                                    </StackItem>
                       : val.FileType === '.word' ?
                       <StackItem className={styles.wordStack}>
                                     <Icon className={styles.iconStyle} iconName={Constants.ICONS.WORD.iconName} />
                                   </StackItem> 
                        :
                        <StackItem className={styles.emailStack}>
                                      <Icon className={styles.iconStyle} iconName={Constants.ICONS.LINK.iconName} />
                                    </StackItem>
                      }
                    </StackItem>
                    <Stack style={{ overflow: "hidden", width: "78%" }}>
  <TooltipHost content={`${val.Title}`} className="tooltipHostStyle" styles={Constants.TOOLTIP_ELLIPSIS_STYLES}>
    <Link href={val.Link} target="_blank" onClick={(e) => e.stopPropagation()}>
      <Text className={styles.contactTitle}>{val.Title}</Text>
    </Link>
  </TooltipHost>
  <Stack style={{ overflow: "hidden", width: "85%" }}>
    {val.FileType === 'pdf' ? (
      <TooltipHost
        content={`${val.Title}`}
        className="tooltipHostStyle"
        styles={Constants.TOOLTIP_ELLIPSIS_STYLES}>
      </TooltipHost>) : val.Title === "links" ? (
        <TooltipHost
          content={`${val.Title}`}
          className="tooltipHostStyle"
          styles={Constants.TOOLTIP_ELLIPSIS_STYLES}>
          <Link
            href={val.Link}
            target="_blank"
            className={styles.contactDetailsStyles}>
            {val.Link}
          </Link>
        </TooltipHost>) : val.FileType === ".ppt" ? (
          <TooltipHost
            content={`${val.Title}`}
            className='tooltipHostStyle'
            styles={Constants.TOOLTIP_ELLIPSIS_STYLES}>
          </TooltipHost>
        ) :
        <></>}
  </Stack>
  </Stack>
                   </Stack>
                </React.Fragment>
              )
            })}
          </React.Fragment>
          }
          </Stack>
        </Stack>

    </section>
    );
  }
}
