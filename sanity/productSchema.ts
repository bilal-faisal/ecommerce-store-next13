export const productSchema = {
    name: "product",
    type: "document",
    title: "Product",
    fields: [
        {
            name: "title",
            title: "Product Title",
            type: "string"
        },
        {
            name: "category",
            title: "Product Category",
            type: "string"
        },
        {
            name: "price",
            title: "Product Price",
            type: "string"
        },
        {
            name: "description",
            title: "Product Description",
            type: "string"
        },
        {
            name: "image",
            title: "Product Image",
            type: "image"
        },
        {
            name: "image_thumbnail",
            title: "Product Thumbnail Image",
            type: "image"
        }
    ]
}