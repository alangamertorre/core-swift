import React from 'react'

export default function ProductosHeader() {
    return (
        <div className="productos-page">
            <div className="container-max-width header-wrapper">
                <div className="header-content">
                    <div className="title-container">
                        <h1 className="main-headline">Productos</h1>
                    </div>
                    <p className="subtitle">Aqui podrás descargar todas nuestras creaciones</p>

                    <div className="logo-group">
                        <img src="/logo.png" className="logo-letter" alt="Logo Top" />
                    </div>
                </div>
            </div>
        </div>
    )
}
