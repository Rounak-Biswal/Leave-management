export const LEAVE_FORM_CONFIG = [
    {
        type: "select",
        label: "Leave Type",
        id: "selectType",
        name: "type",
        options: [
            "Casual",
            "Sick",
            "Paid",
            "Paternity",
            "Unpaid",
            "Compensatory"
        ],
        placeholder: "Select leave type"
    },
    {
        type: "date",
        label: "From Date",
        id: "fromDate",
        name: "from_date"
    },
    {
        type: "date",
        label: "To Date",
        id: "toDate",
        name: "to_date"
    },
    {
        type: "textarea",
        label: "Reason",
        id: "reason",
        name: "reason",
        rows: 3
    }
]
