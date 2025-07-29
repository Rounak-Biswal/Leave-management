export const LEAVE_FORM_CONFIG = [
    {
        type: "select",
        label: "Leave Type",
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
        name: "from_date"
    },
    {
        type: "date",
        label: "To Date",
        name: "to_date"
    },
    {
        type: "textarea",
        label: "Reason",
        name: "reason",
        rows: 3
    }
]
