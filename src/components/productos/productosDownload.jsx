import React, { useEffect, useState } from 'react';
import { descargar } from '../../api/api';

export default function ProductosDownload({ productId }) {
    const [versions, setVersions] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!productId || !window.instancesProductos) {
            setVersions([]);
            setSelectedVersion('');
            return;
        }

        const productInfo = window.instancesProductos.find(
            (obj) => String(obj.id) === String(productId),
        );

        const jsonVersions = productInfo?.versionsJson ?? {};
        const nextVersions = Object.keys(jsonVersions);

        setVersions(nextVersions);
        setSelectedVersion(nextVersions[0] || '');
    }, [productId]);

    function parseNameVersions(versionName) {
        return String(versionName || '')
            .toUpperCase()
            .split('-')
            .join(' ');
    }

    const handleDownload = async () => {
        if (!selectedVersion) return;
        const data = await descargar(productId, selectedVersion.toLowerCase());
        console.log(data); //window.location.href = r.data.url;
    };

    const versionListStyle = {
        display: 'flex',
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? 'visible' : 'hidden',
        maxHeight: menuOpen ? '500px' : '0px',
        overflow: 'hidden',
        transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.35s ease, max-height 0.2s ease',
    };

    return (
        <div className="installer-container">
            <div className="left-column">
                <div
                    className="dropdown-button"
                    role="button"
                    tabIndex="0"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setMenuOpen((prev) => !prev);
                        }
                    }}
                >
                    <span className="dropdown-text">
                        INSTALAR {selectedVersion ? parseNameVersions(selectedVersion) : 'CARGANDO...'}
                    </span>
                    <div className="dropdown-icon" data-rotate={menuOpen ? '180deg' : '0deg'}>
                        <img
                            src="/btn-menu.svg"
                            alt="Toggle versions"
                            style={{ transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                    </div>
                </div>

                {versions.length > 0 && (
                    <div className="version-list" style={versionListStyle}>
                        {versions.map((version) => (
                            <div
                                key={version}
                                className="version-item"
                                role="button"
                                tabIndex="0"
                                onClick={() => {
                                    setSelectedVersion(version);
                                    setMenuOpen(false);
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        setSelectedVersion(version);
                                        setMenuOpen(false);
                                    }
                                }}
                            >
                                {parseNameVersions(version)}
                            </div>
                        ))}
                    </div>
                )}
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
                    <div className="progress-bar-fill" />
                </div>

                {selectedVersion && (
                    <button
                        type="button"
                        className="btn-download"
                        onClick={handleDownload}
                        style={{ marginTop: '16px' }}
                    >
                        Descargar {parseNameVersions(selectedVersion)}
                    </button>
                )}
            </div>
        </div>
    );
}
