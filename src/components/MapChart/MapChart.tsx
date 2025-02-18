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
import SearchInput from "./SearchInput";
import Tooltip from "./Tooltip";
import { CountryData } from "./types/MapChartTypes";
import "./MapChart.css";

const geoUrl = "/features.json";

const MapChart = () => {
    const [data, setData] = useState<CountryData[]>([]);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [maxRequest, setMaxRequest] = useState<number>(0);
    const [hoveredCountryRequests, setHoveredCountryRequests] = useState<string | null>(null);
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
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
        (_countryName: string, geo: any) => {
            const centroid = geoCentroid(geo);
            setPosition({ coordinates: centroid, zoom: 3 });
            setSearchQuery("");
        },
        []
    );

    return (
        <div className="map-chart-container">
            {/* Hakukenttä */}
            <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
                <ZoomableGroup
                    center={position.coordinates}
                    zoom={position.zoom}
                    onMoveEnd={handleMoveEnd}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) => (
                            <>
                                {geographies.map((geo) => {
                                    const d = data.find(
                                        (s: CountryData) => s.countryName === geo.properties.name
                                    );
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
                                                hover: { outline: "none", stroke: "red", strokeWidth: 2 },
                                                pressed: { outline: "none" }
                                            }}
                                            onMouseEnter={(evt) => handleMouseEnter(evt, geo)}
                                            onMouseLeave={handleMouseLeave}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>

            {/* Tooltip */}
            {hoveredCountry && (
                <Tooltip
                    x={tooltipPosition.x}
                    y={tooltipPosition.y}
                    country={hoveredCountry}
                    requests={hoveredCountryRequests}
                />
            )}

            {/* Reset Zoom -painike */}
            <button onClick={() => setPosition({ coordinates: [0, 0], zoom: 1 })} className="reset-button">
                Reset Zoom
            </button>
        </div>
    );
};

export default MapChart;
