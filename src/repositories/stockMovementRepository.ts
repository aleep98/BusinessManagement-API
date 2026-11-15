import type { StockMovement } from "../types/stockMovement.js";

const movements: StockMovement[] = [];

export function saveMovement(movement: StockMovement): void {
    movements.push(movement)
}

export function findMovementsByProductId(productId: string): StockMovement[] {
    return movements.filter(
        (movement)=> movement.productId === productId
    )
}