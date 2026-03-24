from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import collection

app = FastAPI()

# CORS middleware after app definition
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running"}

@app.post("/add")
def add_task(task: dict):
    print("Received task:", task)
    collection.insert_one(task)
    return {"message": "Task added"}

@app.get("/tasks")
def get_tasks():
    tasks = list(collection.find({}, {"_id": 0}))
    return tasks