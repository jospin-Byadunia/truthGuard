from fastapi import FastAPI
from app.api.routes import router
from app.api.photo import router as photo_router
from app.api.urls import router as url_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="NewsGuardian API")

origins = [
    "http://localhost:3000",
    "https://your-frontend-domain.com",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # Add more allowed origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # or ["*"] during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(photo_router)
app.include_router(url_router)