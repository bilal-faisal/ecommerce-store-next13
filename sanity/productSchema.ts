import { defineType, defineField } from "sanity";
export const productSchema = defineType({
    name: "product",
    type: "document",
    title: "Product",
    fields: [
        defineField({
            name: "title",
            title: "Product Title",
            type: "string"
        }),
        defineField({
            name: "type",
            title: "Product Type",
            type: "string"
        }),
        defineField({
            name: "price",
            title: "Product Price",
            type: "string"
        }),
        defineField({
            name: "description",
            title: "Product Description",
            type: "string"
        }),
        defineField({
            name: "image",
            title: "Product Image",
            type: "image"
        }),
        defineField({
            name: "image_thumbnail",
            title: "Product Thumbnail Image",
            type: "image"
        }),
        defineField({
            name: "product_care",
            title: "Product Care",
            type: "array",
            of: [{ type: "string" }]
        }),
        defineField({
            name: "category",
            title: "Product Category",
            type: "reference",
            to: [{ type: "category" }]
        })
    ]
})