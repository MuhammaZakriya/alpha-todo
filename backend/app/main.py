from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.db import collection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Task(BaseModel):
    title: str
    done: bool = False


@app.get("/")
def root():
    return {"message": "Backend is running"}


@app.post("/add")
def add_task(task: Task):
    try:
        collection.insert_one(task.model_dump())
        return {"message": "Task added"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/tasks")
def get_tasks():
    try:
        tasks = list(collection.find({}, {"_id": 0}))
        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))