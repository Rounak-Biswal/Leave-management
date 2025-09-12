from fastapi import FastAPI
from Routes.leave_route import leave
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

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
templates = Jinja2Templates(directory="Templates")
app.include_router(leave)
