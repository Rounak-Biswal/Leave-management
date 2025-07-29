from bson import ObjectId
from fastapi import FastAPI, APIRouter, Request
from starlette.responses import HTMLResponse

from Models.leave_model import Leave
from Config.db import collection as db
from Schema.leave_schema import leaveEntity, leavesEntity
from fastapi.templating import Jinja2Templates

leave = APIRouter()
templates = Jinja2Templates(directory="templates")


@leave.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@leave.get("/leave/all")
async def leave_all():
    try:
        result = list(db.find({}))
        formatted_result = leavesEntity(result)
        return formatted_result
    except Exception as e:
        print(e)


@leave.get("/leave/{id}")
async def leave_one(id: str):
    print("received id : ", id);
    try:
        result = db.find_one({"_id": ObjectId(id)})
        return leaveEntity(result)
    except Exception as e:
        print(e)


@leave.post("/leave/apply")
async def leave_apply(value: Leave):
    print("received content : ", str(value))
    try:
        result = db.insert_one(dict(value))
        if result.acknowledged:
            print("Operation successful")
        else:
            print("Operation failed")
    except Exception as e:
        print(e)


@leave.delete("/leave/{id}/delete")
async def leave_delete(id: str):
    print("received id : ", id)
    try:
        result = db.delete_one({"_id": ObjectId(id)})
        if result.acknowledged:
            print("Operation successful")
        else:
            print("Operation failed")
    except Exception as e:
        print(e)


@leave.put("/leave/{id}/update")
async def leave_update(id: str, value: Leave):
    print("received content : ", str(value))
    try:
        result = db.update_one({"_id": ObjectId(id)}, {"$set": dict(value)})
        if result.acknowledged:
            print("Operation successful")
        else:
            print("Operation failed")
    except Exception as e:
        print(e)

@leave.get("/admin")
async def leave_all():
    try:
        result = list(db.find({}))
        formatted_result = leavesEntity(result)
        return formatted_result
    except Exception as e:
        print(e)