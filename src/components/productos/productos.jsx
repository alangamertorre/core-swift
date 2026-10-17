import React from 'react'

export default function Productos() {
    return (
        <div className="productos-page">
            <div className="container-max-width products-wrapper">
                <div className="products-grid">
                    <div className="product-card" data-producto="1">
                        <div className="card-icon">
                            <img src="/noticias/icon-1.png" alt="Alias Studio Code" />
                        </div>
                        <h2 className="card-title">Alias Studio Code</h2>

                        <p className="card-subtitle"><code> Instalar⬇ </code></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
