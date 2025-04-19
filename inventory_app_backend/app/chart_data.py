from bson.objectid import ObjectId

class ChartDataManager:
    def __init__(self, db):
        self.collection = db["products"]

    def get_inventory_data(self):

        products = self.collection.find()
        chart_data = []
        for p in products:
            chart_data.append({
                "id": str(p["_id"]),
                "name": p.get("name", "Unknown"),
                "quantity": p.get("quantity", 0)
            })
        return chart_data
