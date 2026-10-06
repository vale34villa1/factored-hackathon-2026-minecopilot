class RecommendationService:
    def get_recommendations(self, summary: dict):
        items = []
        if summary.get("waiting_time", 0) > 25:
            items.append("Reduce queue pressure at the loading zone and rebalance truck dispatch.")
        if summary.get("route_deviation", 0) > 8:
            items.append("Review haul routes and optimize dispatch sequencing to reduce traversal deviation.")
        items.append("Prioritize maintenance intervention on T-24 and critical equipment before the next shift.")
        return items
