from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import requests
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pydantic import BaseModel
import json

from fastapi import Request

@app.post("/login")
async def login(body: Request):
    
    r = ""
    
    try:
        use = await body.json()
        
        response = requests.post(
            'https://myapi.ku.th/auth/login',
            data=use,
            headers={
                "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
            },
        )
        
        r = response.json()
        
        print(r["code"])
        params = {
            # "stdStatusCode": r["user"]["student"]["studentStatusCode"],
            # "campusCode": r["user"]["student"]["campusCode"],
            # "facultyCode": r["user"]["student"]["facultyCode"],
            # "majorCode": r["user"]["student"]["majorCode"],
            # "userType": r["user"]["userType"],
            "stdId": r["user"]["student"]["stdId"],
        }
        headers = {
            "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
            "x-access-token": r["accesstoken"],
        }
        
        # print(params)
        # print(headers)
        
        response = requests.get(
            'https://myapi.ku.th/std-profile/getGroupCourse',
            params=params,
            headers=headers
        )
        
        get_courses = response.json()
        
        print(get_courses)
        
        if get_courses["code"] == "success":
            return get_courses["results"]
        else:
            return get_courses
        
    except Exception as e:
        print(e)
        return e