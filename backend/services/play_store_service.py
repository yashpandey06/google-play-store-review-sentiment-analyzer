import asyncio
import logging
from typing import List, Dict, Any
from fastapi import HTTPException
from google_play_scraper import search
from google_play_scraper.features.reviews import Sort, reviews_all

from models.schemas import AppInfo

logger = logging.getLogger(__name__)


def _parse_installs(installs_str: str) -> int:
    """
    Convert an installs string like '1,000,000+' to an integer.
    """
    try:
        return int(installs_str.rstrip('+').replace(',', ''))
    except Exception:
        return 0


async def search_apps(query: str) -> List[AppInfo]:
    """
    Search Play Store for apps matching `query` and return basic info.
    """
    try:
        # Perform blocking search in thread
        results = await asyncio.to_thread(search, query)
        # Debug log full search results with installs and scores
        logger.debug(
            f"Search results for '{query}': " + 
            ", ".join(
                f"{app['title']}({app['appId']}, installs={app.get('installs')}, score={app.get('score')})"
                for app in results
            )
        )
        return [AppInfo(appId=app["appId"], title=app["title"]) for app in results]
    except Exception as e:
        logger.exception("Error during Play Store search")
        raise HTTPException(status_code=500, detail=str(e))


async def get_app_id(app_name: str) -> str:
    """
    Resolve the Play Store package name for a given app name using heuristics:
      1) Exact title match (case-insensitive), preferring highest installs.
      2) Title contains query substring, preferring highest installs.
      3) Fallback to the app with highest installs overall.
    """
    # Fetch raw search results
    raw_results = await asyncio.to_thread(search, app_name)
    if not raw_results:
        logger.warning(f"No apps found when searching for '{app_name}'")
        raise HTTPException(status_code=404, detail=f"No apps found with name: {app_name}")

    # Enrich with installs count and scores
    enriched = []
    for app in raw_results:
        enriched.append({
            "appId": app.get("appId", ""),
            "title": app.get("title", ""),
            "installs": _parse_installs(app.get("installs", "")),
            "score": app.get("score", 0.0),
        })

    # 1) Exact title match
    exact = [a for a in enriched if a["title"].strip().lower() == app_name.strip().lower()]
    if exact:
        chosen = max(exact, key=lambda a: a["installs"])
        logger.info(
            f"Exact title match for '{app_name}' -> {chosen['appId']} (installs={chosen['installs']})"
        )
        return chosen["appId"]

    # 2) Substring title match
    substr = [a for a in enriched if app_name.strip().lower() in a["title"].strip().lower()]
    if substr:
        chosen = max(substr, key=lambda a: a["installs"])
        logger.info(
            f"Substring title match for '{app_name}' -> {chosen['appId']} (installs={chosen['installs']})"
        )
        return chosen["appId"]

    # 3) Fallback: choose highest installs overall
    chosen = max(enriched, key=lambda a: a["installs"])
    logger.info(
        f"Fallback highest installs for '{app_name}' -> {chosen['appId']} (installs={chosen['installs']})"
    )
    return chosen["appId"]


async def get_app_reviews(app_id: str, count: int) -> List[Dict[str, Any]]:
    """
    Fetch up to `count` reviews for the given package ID, sorted by newest.
    Returns a list of review dicts.
    """
    try:
        # Perform blocking call in thread
        all_reviews = await asyncio.to_thread(
            reviews_all,
            app_id,
            lang="en",
            country="us",
            sort=Sort.NEWEST,
            count=count
        )
        logger.info(f"Retrieved {len(all_reviews)} reviews for {app_id}, returning first {count}")
        return all_reviews[:count]
    except Exception as e:
        logger.exception(f"Error fetching reviews for {app_id}")
        raise HTTPException(status_code=500, detail=str(e))
