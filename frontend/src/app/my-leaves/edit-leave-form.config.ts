export const EDIT_LEAVE_FORM_CONFIG = [
  {
    type: 'select',
    name: 'type',
    label: 'Leave Type',
    options: ['Casual', 'Sick', 'Paid', 'Paternity', 'Unpaid', 'Compensatory']
  },
  {
    type: 'date',
    name: 'from_date',
    label: 'From Date'
  },
  {
    type: 'date',
    name: 'to_date',
    label: 'To Date',
    minField: 'from_date' // This is optional and used to bind `min` dynamically
  },
  {
    type: 'textarea',
    name: 'reason',
    label: 'Reason'
  }
]
