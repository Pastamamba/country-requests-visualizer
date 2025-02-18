import React, { useState, useEffect, useMemo, useCallback } from "react";
import { scaleLinear } from "d3-scale";
import { geoCentroid } from "d3-geo";
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule,
    ZoomableGroup
} from "react-simple-maps";
import { CountryData } from "./types/MapChartTypes.ts";

const geoUrl = "/features.json";

const MapChart = () => {
    const [data, setData] = useState<CountryData[]>([]);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0
    });
    const [maxRequest, setMaxRequest] = useState<number>(0);
    const [hoveredCountryRequests, setHoveredCountryRequests] = useState<string | null>(
        null
    );

    const [position, setPosition] = useState({
        coordinates: [0, 0],
        zoom: 1
    });

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch("/country_requests_data.json")
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData.countries.country);
                const maxReq = Math.max(
                    ...jsonData.countries.country.map((d: CountryData) =>
                        parseInt(d.requests, 10)
                    )
                );
                setMaxRequest(maxReq);
            });
    }, []);

    const colorScale = useMemo(
        () =>
            scaleLinear<string>()
                .domain([0, maxRequest])
                .range(["#c9f0f3", "#169dd3"]),
        [maxRequest]
    );

    const handleMouseEnter = useCallback(
        (evt: React.MouseEvent, geo: any) => {
            const countryData = data.find(
                (s: CountryData) => s.countryName === geo.properties.name
            );
            if (countryData) {
                setHoveredCountryRequests(countryData.requests);
            }
            setHoveredCountry(geo.properties.name);
            setTooltipPosition({ x: evt.clientX, y: evt.clientY });
        },
        [data]
    );

    const handleMouseLeave = useCallback(() => {
        setHoveredCountry(null);
        setHoveredCountryRequests(null);
    }, []);

    const handleMoveEnd = useCallback((newPosition: any) => {
        setPosition(newPosition);
    }, []);

    const searchResults = useMemo(() => {
        if (!searchQuery) return [];
        return data.filter((country) =>
            country.countryName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    const handleSearchSelect = useCallback(
        (countryName: string, geo: any) => {
            const centroid = geoCentroid(geo);
            setPosition({ coordinates: centroid, zoom: 3 });
            setSearchQuery("");
        },
        []
    );

    return (
        <div style={{ width: "90%", position: "relative" }}>
            {/* Hakukenttä */}
            <div style={{ marginBottom: "8px", position: "relative" }}>
                <input
                    type="text"
                    placeholder="Hae maa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: "6px", width: "200px" }}
                />
            </div>

            <ComposableMap
                projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}
                width={800}
                height={450}
            >
                <Sphere
                    stroke="#E4E5E6"
                    strokeWidth={0.5}
                    fill="transparent"
                    id="worldmap-1"
                />
                <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                <ZoomableGroup center={position.coordinates} zoom={position.zoom} onMoveEnd={handleMoveEnd}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) => {
                            const resultsWithGeo = searchQuery
                                ? searchResults.map((result) => {
                                    const geo = geographies.find(
                                        (g: any) => g.properties.name === result.countryName
                                    );
                                    return { ...result, geo };
                                })
                                : [];

                            return (
                                <>
                                    {geographies.map((geo) => {
                                        const d = data.find(
                                            (s: CountryData) => s.countryName === geo.properties.name
                                        );
                                        const isSearched =
                                            searchQuery &&
                                            geo.properties.name
                                                .toLowerCase()
                                                .includes(searchQuery.toLowerCase());

                                        const isHighlighted =
                                            searchQuery &&
                                            geo.properties.name.toLowerCase().includes(searchQuery.toLowerCase());
                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                stroke="white"
                                                strokeWidth={0.5}
                                                fill={d ? String(colorScale(parseInt(d.requests, 10))) : "#EEE"}
                                                style={{
                                                    default: {
                                                        outline: "none",
                                                        stroke: isHighlighted ? "red" : "white",
                                                        strokeWidth: isHighlighted ? 2 : 0.5
                                                    },
                                                    hover: {
                                                        outline: "none",
                                                        stroke: "red",
                                                        strokeWidth: 2
                                                    },
                                                    pressed: { outline: "none" }
                                                }}
                                                onMouseEnter={(evt) => handleMouseEnter(evt, geo)}
                                                onMouseLeave={handleMouseLeave}
                                            />
                                        );
                                    })}
                                    {/* Näytetään hakutulokset kartan päälle */}
                                    {searchQuery && resultsWithGeo.length > 0 && (
                                        <div
                                            className="search-results"
                                            style={{
                                                position: "absolute",
                                                top: 40,
                                                left: 10,
                                                background: "white",
                                                border: "1px solid #ccc",
                                                padding: "4px",
                                                zIndex: 1000,
                                                maxHeight: "200px",
                                                overflowY: "auto",
                                                width: "200px"
                                            }}
                                        >
                                            {resultsWithGeo.map((result) =>
                                                result.geo ? (
                                                    <div
                                                        key={result.countryCode}
                                                        onClick={() =>
                                                            handleSearchSelect(result.countryName, result.geo)
                                                        }
                                                        style={{
                                                            padding: "4px",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        {result.countryName}
                                                    </div>
                                                ) : null
                                            )}
                                        </div>
                                    )}
                                </>
                            );
                        }}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>

            {/* Tooltip */}
            {hoveredCountry && (
                <div
                    className="tooltip"
                    style={{
                        left: `${tooltipPosition.x + 10}px`,
                        top: `${tooltipPosition.y}px`
                    }}
                >
                    <div>{hoveredCountry}</div>
                    {hoveredCountryRequests && <div>Requests: {hoveredCountryRequests}</div>}
                </div>
            )}

            {/* Reset Zoom-painike */}
            <button
                onClick={() => setPosition({ coordinates: [0, 0], zoom: 1 })}
                style={{ marginTop: "8px" }}
            >
                Reset Zoom
            </button>

            <style>
                {`
          .tooltip {
            position: fixed;
            background: rgba(255, 255, 255, 0.95);
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            pointer-events: none;
            z-index: 1000;
          }
        `}
            </style>
        </div>
    );
};

export default MapChart;
