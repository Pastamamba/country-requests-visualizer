import {useEffect, useState} from "react";
import {scaleLinear} from "d3-scale";
import {ComposableMap, Geographies, Geography, Sphere, Graticule} from "react-simple-maps";
import {CountryData} from "./types/MapChartTypes.ts";

// Define the URL for the geoJSON data
const geoUrl = "/features.json";

const MapChart = () => {
    // State variables for data, hovered country, tooltip position, and max requests
    const [data, setData] = useState<CountryData[]>([]);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({x: 0, y: 0});
    const [maxRequest, setMaxRequest] = useState<number>(0);
    const [hoveredCountryRequests, setHoveredCountryRequests] = useState<string | null>(null);

    // Fetch and load the data from the JSON file
    useEffect(() => {
        fetch("/country_requests_data.json")
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData.countries.country);
                // Calculate the maximum requests for scaling
                const maxReq = Math.max(...jsonData.countries.country.map((d: CountryData) => parseInt(d.requests, 10)));
                setMaxRequest(maxReq);
            });
    }, []);

    // Create a linear color scale based on the maximum requests
    const colorScale = scaleLinear()
        .domain([0, maxRequest])
        .range(["#c9f0f3", "#169dd3"]);

    return (
        <div style={{width: "90%"}}>
            {/* Create the ComposableMap component */}
            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147
                }}
            >
                {/* Add a sphere for the map */}
                <Sphere stroke="#E4E5E6" strokeWidth={0.5} fill={"transparent"} id={"worldmap-1"}/>
                {/* Add graticule for map lines */}
                <Graticule stroke="#E4E5E6" strokeWidth={0.5}/>
                {/* Render geographies based on loaded data */}
                {data.length > 0 && (
                    <Geographies geography={geoUrl}>
                        {({geographies}) =>
                            geographies.map((geo) => {
                                const d = data.find((s: {
                                    countryName: string
                                }) => s.countryName === geo.properties.name);
                                return (
                                    <Geography
                                        key={geo["rsmKey"]}
                                        geography={geo}
                                        stroke={"white"}
                                        strokeWidth={0.5}
                                        fill={d ? String(colorScale(parseInt(d.requests, 10))) : "#c9f0f3"}
                                        onMouseEnter={(evt) => {
                                            const countryData = data.find((s: {
                                                countryName: string
                                            }) => s.countryName === geo.properties.name);
                                            if (countryData) {
                                                setHoveredCountryRequests(countryData.requests);
                                            }
                                            setHoveredCountry(geo.properties.name);
                                            setTooltipPosition({
                                                x: evt.clientX,
                                                y: evt.clientY
                                            });
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredCountry(null);
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                )}
            </ComposableMap>
            {/* Display a tooltip for the hovered country */}
            {hoveredCountry && (
                <div
                    className="tooltip"
                    style={{
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y}px`
                    }}
                >
                    <div>{hoveredCountry}</div>
                    {hoveredCountryRequests && <div>Requests: {hoveredCountryRequests}</div>}
                </div>
            )}
            {/* Add CSS styles */}
            <style>
                {`
          .tooltip {
            position: fixed;
            background: rgba(255, 255, 255, 0.8);
            padding: 8px;
            background: white;
            border-radius: 4px;
            pointer-events: none;
            z-index: 999;
            transform: translate(10%, -50%);
          }
          .rsm-geography:focus {
            outline: none;
          }
        `}
            </style>
        </div>
    );
};

export default MapChart;
