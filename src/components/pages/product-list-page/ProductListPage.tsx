
import { Link } from '@tanstack/react-router';
import { productsRoute } from '../../../routes/products/productsRoute';
import { useState } from 'react';

// Example product data
const allProducts = [
    { id: 'p1', name: 'Fjellski' },
    { id: 'p2', name: 'Langrennski' },
    { id: 'p3', name: 'Skisko' },
    { id: 'p4', name: 'Staver' },
];

export default function ProductListPage() {
    // Get the validated search parameters for this route
    // The hook knows 'query' is string|undefined and 'page' is number
    const { query, page } = productsRoute.useSearch();


    // Filter products based on the validated query
    const filteredProducts = query
        ? allProducts.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase()),
        )
        : allProducts;

    // (Pagination logic would use the 'page' parameter here)

    return (
        <div>
            <h1>Produktliste</h1>
            <p>(Side: {page})</p>
            <p>Søkefilter: {query ? `"${query}"` : 'Ingen'}</p>

            <section title="search section">


            </section>

            {/* Display filtered products */}
            <ul>
                {filteredProducts.map((product) => (
                    <div key={product.id} >
                        <Link to={productsRoute.to} search={{
                            query: product.name
                        }}>{product.name}</Link>
                    </div>
                ))}
            </ul>

            {/* Input/Links to change search params would go here (see next section) */}
        </div>
    );
}


async function fetchProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Failed to fetch products:", error.message);
            throw error;
        } else {
            console.error("An unexpected error occurred while fetching products.", error);
            throw new Error("An unknown error occurred while fetching products.");
        }
    }
}