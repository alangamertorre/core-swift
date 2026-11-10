import React, { useEffect, useState } from 'react';
import ProductCard from './productcard';
import { getProductos } from '../../api/api.productos';

export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const loadProductos = async () => {
            try {
                window.instancesProductos = await getProductos();
                if (mounted) {
                    setProductos(window.instancesProductos);
                }
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadProductos();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="productos-page">
            <div className="container-max-width products-wrapper">
                <div className="products-grid">
                    {loading ? (
                        <p className="card-subtitle">Cargando productos...</p>
                    ) : (
                        productos.map((producto) => (
                            <ProductCard
                                key={producto?.id ?? producto?.raw_name ?? producto?.name}
                                product={producto}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
