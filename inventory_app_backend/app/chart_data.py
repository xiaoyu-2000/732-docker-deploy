from bson.objectid import ObjectId

class ChartDataManager:
    def __init__(self, db):
        self.collection = db["products"]

    def get_inventory_data(self):
        """返回每个产品的名称和数量，用于前端画图"""
        products = self.collection.find()
        chart_data = []
        for p in products:
            chart_data.append({
                "id": str(p["_id"]),
                "name": p.get("name", "Unknown"),
                "quantity": p.get("quantity", 0)
            })
        return chart_data
