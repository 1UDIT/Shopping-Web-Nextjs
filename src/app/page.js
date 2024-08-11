'use client' 
import React, { useEffect, useState } from 'react';
// Import Swiper React components  

import "@/Css/style.css";
import Image from 'next/image'
import { Rating } from '@/components/Rating';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/Redux/Slice/cartSlice';



export default function Home() {

  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://fakestoreapi.com/products?limit=9')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }
    fetchData();
  }, []);

  

  const handleadd = (product) => { 
    dispatch(addToCart(product));
  }

  return (
    <main>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 sm:grid-cols-2 ">
        {
          Loading !== false ? Loading :
            Data?.map((Item) => {
              return (
                <div className="relative mt-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md" key={Item.id}>
                  <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                    <Image
                      className="object-cover"
                      src={Item.image}
                      alt="product image"
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={true} />
                  </a>
                  <div className="mt-4 px-5 pb-5">
                    <a href="#">
                      <h5 className="text-xl tracking-tight text-slate-900">{Item.title}</h5>
                    </a>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <p>
                        <span className="text-3xl font-bold text-slate-900">{Item.price}</span>
                        <span className="text-sm text-slate-900 line-through">$699</span>
                      </p>
                      <div className="flex items-center">
                        <Rating rating={Item.rating.rate} />
                        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{Item.rating.rate}</span>
                      </div>
                    </div>
                    <div onClick={() => handleadd(Item)} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to cart</div>
                  </div>
                </div>
              )
            })
        }
      </div>
    </main>
  );
}