import React from 'react';

export default function ProductCard({ product }) {
    const productName = product?.name || 'Producto';
    const imageSrc = product?.imgPath || null;

    if (!imageSrc) throw new Error("error 500: img not found");

    return (
        <div className="product-card" data-producto={product?.id ?? 1}>
            <div className="card-icon">
                <img src={imageSrc} alt={productName} />
            </div>
            <h2 className="card-title">{productName}</h2>
            <p className="card-subtitle"><code>Instalar ⬇</code></p>
        </div>
    );
}
