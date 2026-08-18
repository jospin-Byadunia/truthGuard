from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database.models import create_tables
from app.api.routes import router
from app.api.photo import router as photo_router
from app.api.urls import router as url_router
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Automatically creates SQLite tables on app startup
    create_tables()
    yield

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:3000",
    "https://truth-guard-rho.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # Add more allowed origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # or ["*"] during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"status": "ok", "message": "TruthGuard API is running"}
app.include_router(router)
app.include_router(photo_router)
app.include_router(url_router)