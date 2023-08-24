"use client";

import { createSlice } from "@reduxjs/toolkit";

// window?.sessionStorage?.getItem("cartItems") !== null ? JSON.parse(sessionStorage.getItem("cartItems")) : [];

// const Session = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("cartItems")) : null;
let Session;
if (typeof window !== 'undefined') {
    // Perform localStorage action
    Session = JSON.parse(sessionStorage.getItem("cartItems"))
}


// if (typeof window !== "undefined" && sessionStorage?.getItem("cartItems") !== null) {
//     // Client-side-only code
//     // JSON.parse(sessionStorage.getItem("cartItems"))
//     Session = JSON.parse(sessionStorage.getItem("cartItems"))
// } else {
//     null
// }
const items = Session !== null ? Session : [];


const setItemFunc = (item) => {
    sessionStorage.setItem("cartItems", JSON.stringify(item));
};



const initialState = {
    active: items
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
                    itemExists.quantity = state.active.reduce(
                        (total, item) => total + Number(item.quantity),
                        0
                    );
                }


                // state.push(action.payload)
                setItemFunc(
                    state.active.map((item) => item),
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
                    itemExists.quantity = state.active.reduce(
                        (total, item) => total + Number(item.quantity),
                        0
                    );
                }


                // state.push(action.payload)
                setItemFunc(
                    state.active.map((item) => item),
                );
                console.log("action Cart", state.active);
            },


        }
    })



export const { addToCart, Increment } = cartSlice.actions;
export default cartSlice.reducer;