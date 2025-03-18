export interface MovingCost {
    movingFee: number;
    stairsElevatorFee: number;
    protectionPackagingFee: number;
    disassemblyFee: number;
    disposalFee: number;
    cardboardBoxFee: number;
    packingUnpackingFee: number;
    holidayWeekendFee: number;
    distanceFee: number;
    additionalLocationFee: number;
    parkingTunnelFee: number;
}

export interface CustomerInfo {
    items: MovingItem[];
}

export interface MovingItem {
    name: string;
    quantity: number;
    unitPrice: number;
} 