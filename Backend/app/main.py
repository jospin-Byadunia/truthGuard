from fastapi import FastAPI
from api.routes import router

app = FastAPI(title="NewsGuardian API")


app.include_router(router)