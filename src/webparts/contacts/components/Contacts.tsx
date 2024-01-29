import * as React from "react";
import styles from "./Contacts.module.scss";
import type { IContactsProps } from "./IContactsProps";
import {
  Text,
  IconButton,
  Stack,
  TooltipHost,
  Modal,
  TextField,
  DefaultButton,
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  Dialog,
  DialogType,
  MessageBar,
  MessageBarType,
  DialogFooter,
} from "@fluentui/react";
import Constants from "../../common/Constants";
import { SPFI, SPFx, spfi } from "@pnp/sp/presets/all";
import { IContactsState } from "./IContacts.state";
import { Icon, Link, StackItem } from "@fluentui/react";

//import { Button } from "@material-ui/core";

let sp: SPFI;
export default class Contacts extends React.Component<
  IContactsProps,
  IContactsState
> {
  dropdownOptions: IDropdownOption[] = [
    { key: "3", text: "email" },
    { key: "2", text: "link" },
    { key: "1", text: "number" },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      Id: 0,
      Title: "",
      ContactType: "",
      Contact: "",
      Confirmation:false,
      isAddOpen: false,
      ContactsArr: [],
    };
    sp = spfi().using(SPFx(this.props.spcontext));
  }

  componentDidMount(): void {
    sp.web.lists
      .getByTitle("Contacts")
      .items.select()()
      .then((item: any) => {
        item.map((item: any) => {
          this.setState({
            Id: item.Id,
            Title: item.Title,
            ContactType: item.ContactType,
            Contact: item.Contact,
            ContactsArr: [
              ...this.state.ContactsArr,
              {
                Id: item.Id,
                Title: item.Title,
                ContactType: item.ContactType,
                Contact: item.Contact,
              },
            ],
          });
        });

        console.log("This is Contacts Array", this.state.ContactsArr);
        console.log(item, "Items");
      });
  }

  openModal = () => {
    this.setState({
      isAddOpen: true,
      Title: "",
      ContactType: "",
      Contact: "",
    });
  };
  clearStates = () => {
    this.setState({
      isAddOpen: false,
      Title: "",
      ContactType: "",
      Contact: "",
    });
  };

  addContact = async (): Promise<void> => {
    try {
      const addItem = await sp.web.lists.getByTitle("Contacts").items.add({
        Title: this.state.Title,
        ContactType: this.state.ContactType,
        Contact: this.state.Contact,
      });
      await this.componentDidMount();

      // Reset the state after adding the item
      this.setState({
        Title: "",
        ContactType: "",
        Contact: "",
        isAddOpen: false,
        Confirmation:true
      });

      console.log(addItem, "Add Item");
    } catch (error) {
      console.log(error);
    }
  };

  public render(): React.ReactElement<IContactsProps> {
    return (
      <section className={`${styles.contacts}`}>
        <Stack horizontal className={`${styles.headingStyle}`}>
          <IconButton
            className={styles.contactInfoIcon}
            iconProps={Constants.ICONS.CONTACT_DETAILS_ICON}
          />
          <TooltipHost
            content={`Contacts`}
            className="tooltipHostStyle"
            styles={Constants.TOOLTIP_ELLIPSIS_STYLES}
          >
            <Text variant={"xLarge"} className={`${styles.headingText}`}>
              Contacts
            </Text>
          </TooltipHost>

          <IconButton
            className={styles.contactInfoIcon}
            iconProps={Constants.ICONS.ADDCIRCLE}
            onClick={() => {
              this.openModal();
            }}
          />
          <Modal
            styles={{ main: { width: "636px", height: "315px" } }}
            isOpen={this.state.isAddOpen}
            onDismiss={() => {
              this.setState({ isAddOpen: false });
            }}
          >
            <Stack
              style={{
                
                padding: "5px,5px",
                position: "sticky",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              horizontal
            >
              <Text
                variant={"xLarge"}
                style={{
                  letterSpacing: "0px",
                  color: "#5A2D83",
                  opacity: "1",
                  marginTop:"20px",
                  marginLeft: "25px",
                  display: "inline-block",
                  overflow: "hidden",
                }}
              >
                Add Contact
              </Text>
             

              <IconButton
                iconProps={{ iconName: "Cancel" }}
                className={styles.iconButton}
                title="Cancel"
                ariaLabel="Cancel"
                onClick={() => {
                  this.clearStates();
                }}
                style={{
                  letterSpacing: "0px",
                  color: "#2E3B4E",
                  opacity: "1"
                  // Adjust spacing as needed
                }}
              />
            </Stack>

            <Stack
              style={{
                marginLeft: "30px",
                marginRight: "30px",
                marginTop: "10px",
              }}
            >
              <TextField
                label="Title"
                placeholder="Title"
                required
                value={this.state.Title}
                onChange={(e, newValue: string) =>
                  this.setState({ Title: newValue })
                }
              />

              <Dropdown
                label="Contact Type"
                placeholder="Contact Type"
                required
                options={this.dropdownOptions}
                onChange={(e: any, selection: any) => {
                  this.setState({ ContactType: selection.text });
                }}
              />

              <TextField
                label="Contact"
                placeholder="Contact"
                value={this.state.Contact}
                onChange={(e, newValue: string) =>
                  this.setState({ Contact: newValue })
                }
                required
              ></TextField>
               {(
                this.state.Title==""||
                this.state.ContactType==""||
                this.state.Contact==""
                )&&(<div style={{color:"red"}}>Please Enter all fields</div>)}
              <Stack
                style={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "row",
                
                  justifyContent: "right",
                }}
                horizontal
                tokens={{ childrenGap: 10 }}
              >
               
                <DefaultButton
                  style={{  width: "50px" }}
                  onClick={() => {
                    this.clearStates();
                  }}
                >
                  Cancel
                </DefaultButton>
                <PrimaryButton
                disabled={
                  this.state.Title == "" ||
                  this.state.ContactType == "" ||
                  this.state.Contact == ""}
                  style={{
                    padding: "10px",
                    backgroundColor: "#5A2A82",
                   
                    width: "50px",
                  }}
                  onClick={() => {
                    this.addContact();
                  }}
                >
                  Add
                </PrimaryButton>
              </Stack>
            </Stack>
          </Modal>

          <Dialog hidden={!this.state.Confirmation} 
          onDismiss={()=>{this.setState({Confirmation:false})}}
          dialogContentProps={{
            type: DialogType.normal,
            title: "Success!",
          }}
          >
                  <MessageBar
                        messageBarType={MessageBarType.success}
                        isMultiline={false}
                        className={"dialogMessage"}
                      >
                        Contact Added
                        </MessageBar> 
                        <DialogFooter>
                          <DefaultButton
                            onClick={() =>{this.setState({Confirmation:false})}}
                            text="OK"
                          />
                        

                          </DialogFooter> 
          </Dialog>
        </Stack>
        <Stack className={styles.contactStack}>
          <Stack style={{ marginRight: 10 }}>
            {
              <React.Fragment>
                {this.state.ContactsArr.map((val) => {
                  return (
                    <React.Fragment>
                      <Stack
                        horizontal
                        style={{
                          borderBottom: "1px solid #EEEEEE",
                          padding: "10px 0px 10px 24px",
                        }}
                      >
                        <StackItem className={styles.iconStackStyle}>
                          {val.ContactType === "number" ? (
                            <StackItem className={styles.personStack}>
                              <Icon
                                className={styles.iconStyle}
                                iconName={Constants.ICONS.PHONE.iconName}
                              />
                            </StackItem>
                          ) : val.ContactType === "email" ? (
                            <StackItem className={styles.emailStack}>
                              <Icon
                                className={styles.iconStyle}
                                iconName={Constants.ICONS.EMAIL.iconName}
                              />
                            </StackItem>
                          ) : val.ContactType === "link" ? (
                            <StackItem className={styles.linkStack}>
                              <Icon
                                className={styles.iconStyle}
                                iconName={Constants.ICONS.LINK.iconName}
                              />
                            </StackItem>
                          ) : (
                            <React.Fragment />
                          )}
                        </StackItem>
                        <Stack style={{ overflow: "hidden" }}>
                          <TooltipHost
                            content={`${val.Title}`}
                            className="tooltipHostStyle"
                            styles={Constants.TOOLTIP_ELLIPSIS_STYLES}
                          >
                            <Text className={styles.contactTitle}>
                              {val.Title}
                            </Text>
                          </TooltipHost>
                          <Stack style={{ overflow: "hidden", width: "85%" }}>
                            {val.ContactType === "email" ? (
                              <TooltipHost
                                content={`${val.Contact}`}
                                className="tooltipHostStyle"
                                styles={Constants.TOOLTIP_ELLIPSIS_STYLES}
                              >
                                <Link
                                  href={"mailto:" + val.Contact}
                                  className={styles.contactTitle}
                                >
                                  {val.Contact}
                                </Link>
                              </TooltipHost>
                            ) : val.ContactType === "link" ? (
                              <TooltipHost
                                content={`${val.Contact}`}
                                className="tooltipHostStyle"
                                styles={Constants.TOOLTIP_ELLIPSIS_STYLES}
                              >
                                <Link
                                  href={val.Contact}
                                  target="_blank"
                                  className={styles.contactDetailsStyles}
                                >
                                  {val.Contact}
                                </Link>
                              </TooltipHost>
                            ) : val.ContactType === "number" ? (
                              <TooltipHost
                                content={`${val.Title}`}
                                className="tooltipHostStyle"
                                styles={Constants.TOOLTIP_ELLIPSIS_STYLES}
                              >
                                <Link
                                  href={val.Title}
                                  target="_blank"
                                  className={styles.contactDetailsStyles}
                                >
                                  {val.Title}
                                </Link>
                              </TooltipHost>
                            ) : (
                              <></>
                            )}
                          </Stack>
                        </Stack>
                      </Stack>
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            }
          </Stack>
        </Stack>
      </section>
    );
  }
}
