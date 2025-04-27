from fastapi import HTTPException
from google_play_scraper import search
from google_play_scraper.features.reviews import Sort, reviews_all
from typing import List, Dict, Any
from models.schemas import AppInfo

async def search_apps(query: str) -> List[AppInfo]:
    try:
        results = search(query)
        return [AppInfo(appId=app["appId"], title=app["title"]) for app in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def get_app_id(app_name: str) -> str:
    apps = await search_apps(app_name)
    if not apps:
        raise HTTPException(status_code=404, detail=f"No apps found with name: {app_name}")
    return apps[0].appId

async def get_app_reviews(app_id: str, count: int) -> List[Dict[str, Any]]:
    try:
        all_reviews = reviews_all(
            app_id,
            lang="en",
            country="us",
            sort=Sort.NEWEST,
            count=count
        )
        return all_reviews[:count]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
