import tkinter as tk
from tkinter import simpledialog
import firebase_admin
from firebase_admin import db, credentials, firestore


cred = credentials.Certificate(
    './react-auth-f1deb-firebase-adminsdk-b8nc8-edaa65cdb3.json')

firebase_admin.initialize_app(cred, {
    "databaseURL": "https://react-auth-f1deb-default-rtdb.asia-southeast1.firebasedatabase.app",
    "storageBucket": "react-auth-f1deb.appspot.com",
})
# ref = db.reference('/')
db = firestore.client()

ROOT = tk.Tk()
ROOT.withdraw()

# the input dialog
USER_INP = simpledialog.askstring(title="Test", prompt="What's your Name?:")

# check it out
doc_ref = db.collection(u'rooms').document(u'students_cam_loggedIn')
doc_ref.set({
    u'student_name': USER_INP
})

# print("Hello", USER_INP)
