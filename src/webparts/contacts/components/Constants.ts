import { FontWeights, IButtonStyles, ITooltipHostStyles, getTheme, mergeStyleSets } from "@fluentui/react";

export default class Constants {
    public static THEME = getTheme();

    public static ERROR_MESSAGES = {
        COLLECTION_DATA_EMPTY: "Please edit this webpart to enter tiles data.",
        FIELD_IS_REQUIRED: "Field is required",
        MAXIMUM_EXCEED: "Exceeds the maxlength allowed.",
        EDIT_WEBPART_FROM_PROPERTY_PANE : "Please edit this webpart to add contact details.",
    }

    public static COLORS_LIST = [
        { key: "#EA7D21", text: "Orange" },
        { key: "#FDB71A", text: "Yellow" },
        { key: "#00A9B7", text: "Teal" },
        { key: "#90BF3E", text: "Lime Green" },
        { key: "#80539C", text: "Light Purple" },
        { key: "#41A2D0", text: "Sky Blue" },
        { key: "#1A87BB", text: "Platform Blue" },
    ];
    public static TARGET_TYPE = [
        { key: "yes", text: "Yes" },
        { key: "no", text: "No" }
    ]
    public static LISTNAMES = {
        PROCESSQUESTION_LISTNAME: "ProcurementProcessQuestions",
        PROCESSOPTIONS_LISTNAME: "ProcurementProcessOptions"
    }

    public static SELECT_COLUMN_NAMES = {
        QUESTIONS_SELECT_COLUMNNAMES: "ID,Process_x0020_Stage,Question,Is_x0020_Start_x0020_Question",
        OPTIONS_SELECT_COLUMNNAMES: "Option_x0020_Title,Target_x0020_Type,Target_x0020_Link,Question_x0020_ID,Question_x0020_ID/ID,Question_x0020_ID/Title,Target_x0020_Question_x0020_Id,Target_x0020_Question_x0020_Id/ID,Target_x0020_Question_x0020_Id/Title"
    }

    public static EXPAND_COLUMNNAMES = {
        OPTIONS_EXPAND_COLUMNNAMES: "Question_x0020_ID,Target_x0020_Question_x0020_Id"
    }

    public static PROCESSFLOWCHART_STARTHERE_BUTTON: Partial<IButtonStyles> = {
        root: {
            backgroundColor: '#E37820', border: '1px solid #E37820',
            font: 'normal normal 600 12px/15px Segoe UI', color: '#FFFFFF'
        },
        rootHovered: {
            backgroundColor: 'transparent',
            border: '1px solid #E37820'

        }
    };
    
    public static TOOLTIP_ELLIPSIS_STYLES: Partial<ITooltipHostStyles> = {
        root: {
          width: "100%",
          display: "block",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          cursor:"default"
        },
      }

    public static ICONS = {
        CHROMECLOSE: 'Cancel',
        SOURCINGICON: 'JoinOnlineMeeting',
        CONTACT_DETAILS_ICON : {iconName: "ContactInfo",  style: { fontSize: 22, color: '#fff' }},
        PHONE: {iconName: "Phone", style: {fontSize: 15}},
        EMAIL: {iconName: "Mail", style: {fontSize: 15}},
        LINK: {iconName: "Link", style: {fontSize: 15}},
        PERSON:  {iconName: "Contact", style: {fontSize: 15}}
    }

    public static STACKTOKENS = {
        STACKCONTROLSTOKEN: { childrenGap: 20 },
        STACKTOKENSWITHGAP10: { childrenGap: 10 }
    };

    public static PROCESS_QUESTION_MODAL = mergeStyleSets({
        CONTAINER: {
            display: 'flex',
            width: '45%',
            flexFlow: 'column nowrap',
            alignItems: 'stretch',
        },
        HEADERICON: {
            fontSize: 26
        },
        CLOSEICON: {
            marginLeft: 'auto',
            color: '#ffff',
            ":hover": {
                backgroundColor: '#2D2247',
                color: '#ffff'
            },
            iconPressed: {
                backgroundColor: '#2D2247',
                color: '#ffff'
            }
        },
        HEADER: [
            Constants.THEME.fonts.xLarge,
            {
                flex: '1 1 auto',
                color: Constants.THEME.palette.white,
                display: 'flex',
                alignItems: 'center',
                fontWeight: FontWeights.semibold,
                padding: '12px 12px 14px 8%',
                background: '#2D2247 0% 0% no-repeat padding-box',
                borderBottom: '6px solid #5A2A82'
            },
        ],
        HEADING: {
            color: Constants.THEME.palette.white,
            fontWeight: FontWeights.semibold,
            fontSize: 24,
            padding: '5px 15px',
            width: '100%',
            margin: '0',
            '@media only screen and  (max-width: 480px)': {
                fontSize: 16
            },
            '@media screen and (min-width: 480px) and (max-width: 992px)': {
                fontSize: 20
            }
        },
        BODY: {
            flex: '4 4 auto',
            padding: '5% 3% 0px 8%',
            overflowY: 'auto',
            maxHeight: 370,
            '@media (min-width: 540px) and (max-width: 913px)': {
                maxHeight: 'fit-content',
            },
            '@media (min-width: 1399px) and (max-width: 2561px)': {
                maxHeight: 'unset',
            },
            selectors: {
                p: { margin: '14px 0' },
                'p:first-child': { marginTop: 0 },
                'p:last-child': { marginBottom: 0 },
            },
        },
        FOOTER: {
            padding: '0px 24px 24px 24px;',
            marginTop: '10px'
        }
    });
}