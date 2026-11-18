
export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    quantityInStock: number,
    category: string,
    createdAt: Date,
    updatedAt: Date
}

export interface CreateProductInput {
     name: string,
    description: string,
    price: number,
    quantityInStock: number,
    category: string,
}

export type UpdateProductInput = Partial<CreateProductInput>;