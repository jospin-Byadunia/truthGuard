from fastapi import FastAPI
from app.api.routes import router
from app.api.photo import router as photo_router
from app.api.urls import router as url_router

app = FastAPI(title="NewsGuardian API")


app.include_router(router)
app.include_router(photo_router)
app.include_router(url_router)