from fastapi import Request
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import requests
app = FastAPI()

origins = ["*"]

app_key = "txCR5732xYYWDGdd49M3R19o1OVwdRFc"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/login")
async def login(body: Request):

    r = ""
    try:
        use = await body.json()

        response = requests.post(
            'https://myapi.ku.th/auth/login',
            data=use,
            headers={
                "app-key": app_key,
            },
        )

        r = response.json()
        # print(r)

        return r
    except Exception as e:
        print("error of login: ", e)
        return e


@app.get("/getSchedule")
async def get_schedule(request: Request, stdId: str):
		try:
				accesstoken = request.headers["accesstoken"]
				response = requests.get(
						f"https://myapi.ku.th/std-profile/getGroupCourse?academicYear=2564&semester=1&stdId={stdId}",
						headers={
								"x-access-token": accesstoken,
								"app-key": app_key
						}
				)
				r = response.json()
				# print(r['results'][0]['course'])
				return {"data": r['results'][0]['course']}
		except Exception as e:
				print("eror of getSchedule: ", e)
				return e
