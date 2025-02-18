import React from "react";

interface TooltipProps {
    x: number;
    y: number;
    country: string;
    requests: string | null;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, country, requests }) => {
    return (
        <div className="tooltip" style={{ left: `${x + 10}px`, top: `${y}px` }}>
            <div>{country}</div>
            {requests && <div>Requests: {requests}</div>}
        </div>
    );
};

export default Tooltip;
