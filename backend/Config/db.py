from pymongo import MongoClient
# con = MongoClient("mongodb://127.0.0.1:27017")
con = MongoClient("mongodb+srv://RounakBiswal:RounakClusterPassword2003@rounak-project-cluster.cbl2tbz.mongodb.net/LMS?retryWrites=true&w=majority&appName=Rounak-project-cluster")
database = con["LMS"]
collection = database["leaves"]