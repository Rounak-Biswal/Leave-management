from pymongo import MongoClient
con = MongoClient("mongodb://127.0.0.1:27017")
database = con["LMS"]
collection = database["leaves"]