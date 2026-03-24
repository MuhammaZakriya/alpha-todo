import os
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()  # read .env file

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

client = MongoClient(MONGO_URI)
db = client["todo_db"]

collection = db["tasks"]