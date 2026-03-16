from fastapi import FastAPI, Request, Response
from typing import Callable
from fastapi.middleware.cors import CORSMiddleware
import os

from app.config import CORS_ORIGINS

class Middleware:

    @staticmethod
    def register_security(app: FastAPI) -> None:

        @app.middleware("http")
        async def security_middleware(request: Request, call_next: Callable):

            auth_response = await MiddlewareService.authenticate_api_key(request)

            if auth_response:
                return auth_response
            
            user_response = await MiddlewareService.check_user_agent(request)

            if user_response:
                return user_response
                
            response = await call_next(request)
            
            return response

    @staticmethod
    def register_cors(app: FastAPI) -> None:

        app.add_middleware(
            CORSMiddleware,
            allow_origins=CORS_ORIGINS,
            allow_methods=["GET", "OPTIONS"],
            allow_headers=["Content-Type"],
        )

class MiddlewareService:
    
    @staticmethod
    async def authenticate_api_key(request: Request):

        api_key = request.headers.get("x-api-key")
        expected_key = os.getenv("SERVER_API_KEY")

        if not api_key or not expected_key or api_key != expected_key:
            return Response(status_code=403, content='{"detail": "Cannot access this resource"}', media_type="application/json")
        
    @staticmethod
    async def check_user_agent(request: Request):

        origin = request.headers.get("origin")
        user_agent = request.headers.get("user-agent", "")
        environment = os.getenv("ENVIRONMENT", "local")

        if request.method != "OPTIONS":

            blocked_agents = ["PostmanRuntime", "Insomnia", "curl", "HTTPie", "Thunder Client"]
            
            if environment == "production":

                for agent in blocked_agents:

                    if agent.lower() in user_agent.lower():
                        return Response(status_code=403, content='{"detail": "Invalid authentication request"}', media_type="application/json")

            is_next_server_request = user_agent == "Dividends4Income Frontend"
            
            if not (is_next_server_request and not origin) and not origin:
                return Response(status_code=403, content='{"detail": "Invalid authentication request"}', media_type="application/json")