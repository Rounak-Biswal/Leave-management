export interface ILeave {
    id: string,
    type: string,
    from_date: Date,
    to_date: Date,
    days: number,
    status: string,
    reason: string
}

export interface ILeaveWithDaysLeft extends ILeave{
    daysLeft: number
}

export interface LeaveForm {
  type: string;
  from_date: string;
  to_date: string;
  reason: string;
  days: number;
  status: string;
  [key: string]: any; 
}

export interface IEditLeaveForm extends ILeave{
  [key: string]: any;
}
