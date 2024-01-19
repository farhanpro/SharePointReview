import * as React from "react";
import styles from "./Contacts.module.scss";
import type { IContactsProps } from "./IContactsProps";
import { Text, IconButton, Stack, TooltipHost } from "@fluentui/react";
import Constants from "../../common/Constants";
import { SPFI, SPFx, spfi } from "@pnp/sp/presets/all";
import { IContactsState } from "./IContacts.state";
import { Icon, Link, StackItem } from "@fluentui/react";

let sp: SPFI;
export default class Contacts extends React.Component<
  IContactsProps,
  IContactsState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      Id: 0,
      Title: "",
      ContactType: "",
      Contact: "",
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
        </Stack>
        <Stack className={styles.contactStack}>
          <Stack style={{  marginRight: 10 }}>
            {
              <React.Fragment>
                {this.state.ContactsArr
              
                .map((val) => {
                  return (
                    <React.Fragment>
                      <Stack
                        horizontal
                        style={{
                          borderBottom: "1px solid #EEEEEE",
                          padding: "10px 0px 10px 24px"
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
