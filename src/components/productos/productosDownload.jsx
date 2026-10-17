import React from 'react'

export default function ProductosDownload() {
    return (
        <div className="installer-container">

            <div className="left-column">
                <div className="dropdown-button" role="button" tabIndex="0">
                    <span className="dropdown-text">INSTALAR BETA 2.0.0</span>
                    <div className="dropdown-icon" data-rotate="0deg">
                        <img src="/btn-menu.svg" alt="Toggle versions" />
                    </div>
                </div>

                <div className="version-list">
                    <div className="version-item" role="button" tabIndex="0">BETA 1.9.5</div>
                    <div className="version-item" role="button" tabIndex="0">BETA 1.9.0</div>
                    <div className="version-item" role="button" tabIndex="0">BETA 1.8.0</div>
                    <div className="version-item" role="button" tabIndex="0">BETA 1.7.5</div>
                    <div className="version-item" role="button" tabIndex="0">BETA 1.7.2</div>
                    <div className="version-item" role="button" tabIndex="0">BETA 1.7.0</div>
                </div>
            </div>

            <div className="right-column">
                <div className="info-box">
                    <p>
                        Selecciona la versión que quieras, después el sistema detectará tu
                        sistema operativo y te descargará el instalador correcto acorde a tu
                        versión.
                    </p>
                </div>

                <div
                    className="progress-bar-container"
                    role="progressbar"
                    aria-valuenow="43"
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    <div className="progress-bar-fill"></div>
                </div>
            </div>
        </div>
    )
}
