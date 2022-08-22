import cv2
import mediapipe as mp
import numpy as np
import time
import tkinter as tk
import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import db
from firebase_admin import credentials, initialize_app, storage
 
 
cred = credentials.Certificate("./react-auth-f1deb-firebase-adminsdk-b8nc8-881d96ad9f.json")
# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'https://react-auth-f1deb-default-rtdb.asia-southeast1.firebasedatabase.app/',
#     'storageBucket': 'react-auth-f1deb.appspot.com'
# })

db = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://react-auth-f1deb-default-rtdb.asia-southeast1.firebasedatabase.app/',
    'storageBucket': 'react-auth-f1deb.appspot.com'
})
db = firestore.client()
# ref = db.reference('TimeActions')


img_counter = 0

seconds = 0
def countTime(sec) :
    print(sec)
    sec += 1
    time.sleep(1)
    return sec



mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

mp_drawing = mp.solutions.drawing_utils

drawing_spec = mp_drawing.DrawingSpec(thickness=1, circle_radius=1)


cap = cv2.VideoCapture(0)

while (cap.isOpened()) :
    success, image = cap.read()

    start = time.time()

    
    image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)

    
    image.flags.writeable = False
    
    
    results = face_mesh.process(image)
    
    
    image.flags.writeable = True
    
    
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    img_h, img_w, img_c = image.shape
    face_3d = []
    face_2d = []

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            for idx, lm in enumerate(face_landmarks.landmark):
                if idx == 33 or idx == 263 or idx == 1 or idx == 61 or idx == 291 or idx == 199:
                    if idx == 1:
                        nose_2d = (lm.x * img_w, lm.y * img_h)
                        nose_3d = (lm.x * img_w, lm.y * img_h, lm.z * 3000)

                    x, y = int(lm.x * img_w), int(lm.y * img_h)

                    
                    face_2d.append([x, y])

                    
                    face_3d.append([x, y, lm.z])       
            
            
            face_2d = np.array(face_2d, dtype=np.float64)

            
            face_3d = np.array(face_3d, dtype=np.float64)

            
            focal_length = 1 * img_w

            cam_matrix = np.array([[focal_length, 0, img_h / 2], [0, focal_length, img_w / 2], [0, 0, 1]])

            
            dist_matrix = np.zeros((4, 1), dtype=np.float64)

            
            success, rot_vec, trans_vec = cv2.solvePnP(face_3d, face_2d, cam_matrix, dist_matrix)

            
            rmat, jac = cv2.Rodrigues(rot_vec)

            
            angles, mtxR, mtxQ, Qx, Qy, Qz = cv2.RQDecomp3x3(rmat)

            
            x = angles[0] * 360
            y = angles[1] * 360
            z = angles[2] * 360
          
            
            if y < -10:
                # Add doc to realtime DB
                seconds =  countTime(seconds)
                text = "Left" 
                text2= "Time to turn : " + str(seconds) 
                P = time.ctime()
                
                doc_ref = db.collection(u'users').document()
                doc_ref.set({
                    u'action': text,
                    u'timestamp': time.ctime()
                })
                
                
                # Add images to Storages
                ret, frame = cap.read()
                img_name = "Left_{}.png".format(img_counter)
                cv2.imwrite(img_name, frame)
                print("{} Capture!!!".format(img_name))
                img_counter += 1
                fileName = img_name
                bucket = storage.bucket()
                blob = bucket.blob(fileName)
                blob.upload_from_filename(fileName)

                # Opt : if you want to make public access from the URL
                # blob.make_public()
                
            elif y > 10:
                seconds =  countTime(seconds)
                text = "Right"
                text2= "Time to turn : " + str(seconds)
                P = time.ctime()
                doc_ref = db.collection(u'users').document()
                doc_ref.set({
                    u'action': text,
                    u'timestamp': time.ctime()
                })
                
                # Add images to Storages
                ret, frame = cap.read()
                img_name = "Right_{}.png".format(img_counter) 
                cv2.imwrite(img_name, frame)
                print("{} Capture!!!".format(img_name))
                img_counter += 1
                fileName = img_name
                bucket = storage.bucket()
                blob = bucket.blob(fileName)
                blob.upload_from_filename(fileName)

                # Opt : if you want to make public access from the URL
                # blob.make_public()
            else :
                
                seconds = 0
                break

                
          
                

            
            nose_3d_projection, jacobian = cv2.projectPoints(nose_3d, rot_vec, trans_vec, cam_matrix, dist_matrix)

            p1 = (int(nose_2d[0]), int(nose_2d[1]))
            p2 = (int(nose_2d[0] + y * 10) , int(nose_2d[1] - x * 10))
            
            cv2.line(image, p1, p2, (255, 0, 0), 3)

            
            # cv2.putText(image, text, (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 2)
            # cv2.putText(image, text2, (20, 120), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 100, 255), 2)
            # cv2.putText(image, "x: " + str(np.round(x,2)), (800, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            # cv2.putText(image, "y: " + str(np.round(y,2)), (800, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            # cv2.putText(image, "z: " + str(np.round(z,2)), (800, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            
            

        end = time.time()
        totalTime = end - start
                   
       

        mp_drawing.draw_landmarks(
                    image=image,
                    landmark_list=face_landmarks,
                    connections=mp_face_mesh.FACEMESH_CONTOURS,
                    landmark_drawing_spec=drawing_spec, 
                    connection_drawing_spec=drawing_spec)

    
    cv2.imshow('Detect', image)

    if cv2.waitKey(1) & 0xFF == 27:
        break
       
    # print (seconds)

cap.release()