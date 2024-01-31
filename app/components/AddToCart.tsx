'use client';
import React from 'react'

const AddToCart = () => {
    return (
        <div>
            <button className="btn btn-primary" onClick={async () => {
                const _ = (await import('lodash')).default; // lazy load library (lodash). loaded just on click

                const products = [
                    {name: 'c'},
                    {name: 'b'},
                    {name: 'a'}
                ];
                const sorted = _.orderBy(products, ['name']);
                console.log(sorted);
            }}>Add to cart</button>
        </div>
    )
}
export default AddToCart
