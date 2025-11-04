import React, { useEffect, useState } from 'react';
import "./styles.css"

/**
 * 
 * @returns the container which supports infinite scroll
 */
const InfiniteScrollContainer =()=> {
    const [page, setPage] = useState<number>(0);
    const [products, setProducts] = useState<any>(null);

    /**
     * fetches the products
     */
    useEffect(()=>{
        const url=`https://dummyjson.com/products`;

        const fetchProducts= async()=> {
            fetch(`${url}?limit=10&skip=${page}`)
            .then(res => res.json())
            .then(data => {
                data.products && setProducts((prev: any) => 
                    prev ? [...prev, ...data.products.slice(0, 10*page)] : data.products);
            }).catch(err => console.error("Error:", err));
        }
        fetchProducts();
    },[page])

    /**
     * scroll handler
     * @param e 
     */
    const handleScroll = (e: any) =>{
        const clientHeight = e.target.clientHeight;
        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight;

        if(clientHeight + scrollTop >= scrollHeight-50) {
            setPage((prev)=>prev+10);
        }
    }

  return (
   <div className='container'>
    <div className='subContainer' onScroll={handleScroll}>
        {
            products && products.map((product: any)=>{
                return<p key={product.id} className='entity'>{product.title}</p>
            })
        }
    </div>
   </div>
  );
}

export default InfiniteScrollContainer;