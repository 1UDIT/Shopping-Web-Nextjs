"use client";

import { createSlice } from "@reduxjs/toolkit";

let Session, totalAmount, totalQuantity;
if (typeof window !== 'undefined') {
    // Perform localStorage action
    Session = JSON.parse(sessionStorage.getItem("cartItems"));
    totalAmount = JSON.parse(sessionStorage.getItem("totalAmount"));
    totalQuantity = JSON.parse(sessionStorage.getItem("totalQuantity"))
}



const Quantity = totalQuantity !== null ? totalQuantity : []
const items = Session !== null ? Session : [];
const Amount = totalAmount !== null ? totalAmount : []


const setItemFunc = (item, totalAmount, totalQuantity) => {
    sessionStorage.setItem("cartItems", JSON.stringify(item));
    sessionStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    sessionStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};



const initialState = {
    active: items,
    totalQuantity: Quantity ,
    totalAmount: Amount ,
}

const cartSlice = createSlice(
    {
        name: "cart",
        initialState,
        reducers: {
            addToCart: (state, action) => {
                // item.id === action.payload.id
                const itemExists = state.active.find((item) => item.id === action.payload.id);
                if (itemExists) {
                    itemExists.quantity++;
                } else if (!itemExists) {
                    state.active.push({ ...action.payload, quantity: 1 });
                } else {
                    const value = JSON.parse(localStorage.getItem("cartItems"));
                    let index = value.findIndex(s => s.id === itemExists.id);
                    const newValue = {
                        id: itemExists.id,
                        title: itemExists.title,
                        image01: itemExists.image01,
                        price: itemExists.price,
                        quantity: 1,
                        totalPrice: itemExists.price,
                        extraIngredients: extraIngredients
                    }
                    state.active.splice(index, 1, newValue);
                }
                state.quantity = state.active.reduce(
                    (total, item) => total + Number(item.quantity),
                    0
                );

                state.totalAmount = state.active.reduce(
                    (total, item) => total + Number(item.price) * Number(item.quantity),
                    0
                );

                // state.push(action.payload)
                setItemFunc(
                    state.active.map((item) => item),
                    state.totalAmount,
                    state.quantity
                );
                console.log("action Cart", state.active);
            },
            Increment: (state, action) => {
                // item.id === action.payload.id
                const itemExists = state.active.find((item) => item.id === action.payload.id);
                if (itemExists) {
                    itemExists.quantity++;
                } else if (!itemExists) {
                    state.active.push({ ...action.payload, quantity: 1 });
                } else {
                    const value = JSON.parse(localStorage.getItem("cartItems"));
                    let index = value.findIndex(s => s.id === itemExists.id);
                    const newValue = {
                        id: itemExists.id,
                        title: itemExists.title,
                        image01: itemExists.image01,
                        price: itemExists.price,
                        quantity: 1,
                        totalPrice: itemExists.price,
                        extraIngredients: extraIngredients
                    }
                    state.active.splice(index, 1, newValue);
                }
                state.quantity = state.active.reduce(
                    (total, item) => total + Number(item.quantity),
                    0
                );

                state.totalAmount = state.active.reduce(
                    (total, item) => total + Number(item.price) * Number(item.quantity),
                    0
                );
                // state.push(action.payload)
                setItemFunc(
                    state.active.map((item) => item),
                    state.totalAmount,
                    state.quantity
                );
                console.log("Increment Cart", state.active);
            },
            Decrement: (state, action) => {
                // item.id === action.payload.id
                const itemExists = state.active.find((item) => item.id === action.payload.id);
                if (itemExists) {
                    itemExists.quantity--;
                } else if (!itemExists) {
                    state.active.push({ ...action.payload, quantity: 1 });
                } else {
                    const value = JSON.parse(localStorage.getItem("cartItems"));
                    let index = value.findIndex(s => s.id === itemExists.id);
                    const newValue = {
                        id: itemExists.id,
                        title: itemExists.title,
                        image01: itemExists.image01,
                        price: itemExists.price,
                        quantity: 1,
                        totalPrice: itemExists.price,
                        extraIngredients: extraIngredients
                    }
                    state.active.splice(index, 1, newValue);
                }
                state.quantity = state.active.reduce(
                    (total, item) => total + Number(item.quantity),
                    0
                );

                state.totalAmount = state.active.reduce(
                    (total, item) => total + Number(item.price) * Number(item.quantity),
                    0
                );
                // state.push(action.payload)
                setItemFunc(
                    state.active.map((item) => item),
                    state.totalAmount,
                    state.quantity
                );
                console.log("Increment Cart", state.active);
            },
            deleteItem(state, action) {

                const itemExists = state.active.find((item) => item.id === action.payload.id);
                if (itemExists) {
                    state.active = state.active.filter((item) => item.id !== action.payload.id);
                    // state.active = state.active.filter((item) => console.log(item.id , action.payload.id));
                    state.totalQuantity = state.totalQuantity - itemExists.quantity;
                }
                state.totalAmount = state.active.reduce(
                    (total, item) => total + Number(item.price) * Number(item.quantity),
                    0
                );
                state.quantity = state.active.reduce(
                    (total, item) => total + Number(item.quantity),
                    0
                );

                // state.push(action.payload)
                setItemFunc(
                    state.active.map((item) => item),
                    state.totalAmount,
                    state.quantity
                );
                console.log("deleteItem Cart", state.active);

            },


        }
    })



export const { addToCart, Increment, Decrement, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;