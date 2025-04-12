from bson.objectid import ObjectId

class InventoryManager:
    def __init__(self, db):
        self.collection = db["products"]

    def get_all_products(self):
        products = []
        for p in self.collection.find():
            p["_id"] = str(p["_id"])
            products.append(p)
        return products

    def get_product_by_id(self, product_id):
        try:
            product = self.collection.find_one({"_id": ObjectId(product_id)})
            if not product:
                return {"error": "Product not found"}, 404
            product["_id"] = str(product["_id"])
            return product, 200
        except:
            return {"error": "Invalid ID format"}, 400

    def add_product(self, data):
        name = data.get("name")
        sku = data.get("sku")
        quantity = data.get("quantity", 0)
        price = data.get("price", 0.0)
        image = data.get("image")

        if not name or not sku:
            return {"error": "Product name and SKU are required"}, 400

        product = {
            "name": name,
            "sku": sku,
            "quantity": int(quantity),
            "price": float(price)
        }

        if image:
            product["image"] = image

        result = self.collection.insert_one(product)
        return {"message": "Product added successfully!", "id": str(result.inserted_id)}, 201

    def delete_product(self, product_id):
        try:
            result = self.collection.delete_one({"_id": ObjectId(product_id)})
            if result.deleted_count == 0:
                return {"error": "Product not found"}, 404
            return {"message": "Product deleted!"}, 200
        except:
            return {"error": "Invalid ID format"}, 400

    def update_product(self, product_id, update_data):
        try:
            update_fields = {}
            for key in ["name", "sku", "quantity", "price", "image"]:
                if key in update_data:
                    if key == "quantity":
                        update_fields[key] = int(update_data[key])
                    elif key == "price":
                        update_fields[key] = float(update_data[key])
                    else:
                        update_fields[key] = update_data[key]

            if not update_fields:
                return {"error": "No valid fields provided for update"}, 400

            result = self.collection.update_one(
                {"_id": ObjectId(product_id)},
                {"$set": update_fields}
            )

            if result.matched_count == 0:
                return {"error": "Product not found"}, 404

            return {"message": "Product updated successfully!"}, 200
        except:
            return {"error": "Invalid ID format or data"}, 400
