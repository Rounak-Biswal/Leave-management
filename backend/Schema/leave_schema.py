def leaveEntity(item) -> dict:
    return{
        "id": str(item["_id"]),
        "type": item["type"],
        "from_date": item["from_date"],
        "to_date": item["to_date"],
        "days": item["days"],
        "status": item["status"],
        "reason": item["reason"],
    }

def leavesEntity(items) -> list:
    return [leaveEntity(item) for item in items]