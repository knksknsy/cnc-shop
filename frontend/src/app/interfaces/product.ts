/**
*  Copyright (C) 2017
*
*  Kaan K.
*
*  MIT License
*/

export interface IProduct {
    id: number,
    name: string,
    image: string,
    description: string,
    information: Array<string>,
    quantity: number,
    price: number,
    category: string
}