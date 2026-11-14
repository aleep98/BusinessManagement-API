

export type MovementType = "entry" | "loss"

export interface StockMovement {
    id: string;
    productId: string;
    quantity: number;
    createdAt: Date;
    type: MovementType;
}