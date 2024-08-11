"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Increment, Decrement, deleteItem } from '@/Redux/Slice/cartSlice';
import { useEffect, useState } from 'react';

const Cart = () => {
    const [Data, setData] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    useEffect(() => {
        setData(cart);
        // console.log(cart, "cart", cart?.active?.length); 
    }, [cart]);

    console.log(Data.totalAmount, "Data", Data?.active?.length);

    return (
        <main>
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {Data.active === undefined || Data.active.length === 0 ?
                        <p>Cart Empty</p> :
                        Data?.active.map((Item) => {
                            return (
                                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" key={Item.id}>
                                    <Link className="relative mx-3 mt-3 flex w-full rounded-lg sm:w-40 overflow-hidden" href="/">
                                        <Image
                                            className="object-cover"
                                            src={Item.image}
                                            alt="product image"
                                            fill={true}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority={true} />
                                    </Link>
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <span className="text-lg font-bold text-gray-900">{Item.title}</span>
                                            <p className="mt-1 text-xs text-gray-700">{Item.price}</p>
                                        </div>
                                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <div className="flex items-center border-gray-100">
                                                <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => dispatch(Decrement(Item))}> - </span>
                                                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={Item.quantity} readOnly />
                                                <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => dispatch(Increment(Item))}> + </span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <p className="text-sm">{Item.price * Item.quantity}₭</p>
                                                <span onClick={() => dispatch(deleteItem(Item))}>remove</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>


                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">{Data.totalAmount}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">$4.99</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">${Data.totalAmount === 0 ? 0 : Math.round(Data.totalAmount + 4.99).toFixed(2)}</p>
                            <p className="text-sm text-gray-700">including VAT</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                </div>
            </div>
        </main>
    )
}

export default Cart;


