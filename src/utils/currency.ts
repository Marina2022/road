import {MyBig} from "@/lib/big";

export const fromCentsToDollars = (amount: number)=>{
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(MyBig(amount).div(100).round(2).toNumber());
}


export const fromCentsToDollarsNoMoneyFormat = (amount: number)=>{
  return MyBig(amount).div(100).round(2).toNumber()
}



export const fromDollarsToCents = (amount: number)=>{
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(MyBig(amount).mul(100).round(2).toNumber());
}

export const fromDollarsToCentsNoMoneyFormat = (amount: number)=>{
  return MyBig(amount).mul(100).round(2).toNumber()
}