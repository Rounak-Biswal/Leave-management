from datetime import datetime
from pydantic import BaseModel
from typing import Literal


class Leave(BaseModel):
    type: Literal["Casual", "Sick", "Paid", "Paternity", "Unpaid", "Compensatory"]
    from_date: datetime
    to_date: datetime
    days: int
    status: Literal["Pending", "Approved", "Rejected"] = "Pending"
    reason: str
