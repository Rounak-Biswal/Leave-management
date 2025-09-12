from fastapi import FastAPI, Request
from Routes.leave_route import leave
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import os  # we’ll use this in the debug route

app = FastAPI()

# Allow your frontend origin here
origins = [
    "http://localhost:4200",  # Angular dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.mount("/Static", StaticFiles(directory="Static"), name="Static")
templates = Jinja2Templates(directory="templates")

# ✅ Debug route to see what’s actually deployed
@app.get("/debug-list")
async def debug_list(request: Request):
    return {
        "cwd": os.getcwd(),
        "templates_dir": os.path.join(os.getcwd(), "templates"),
        "files_in_templates": os.listdir("templates") if os.path.exists("templates") else "no templates folder"
    }

# include your other routers after
app.include_router(leave)
