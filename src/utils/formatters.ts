export function formatCost(num: number): string{
    return new Intl.NumberFormat('en-US',{
        notation: "compact",
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2
    }).format(num)
}
export function formatQuants(num:number): string{
    return new Intl.NumberFormat('en-US',{
        notation: "compact",
        maximumFractionDigits:0
    }).format(num)
}

