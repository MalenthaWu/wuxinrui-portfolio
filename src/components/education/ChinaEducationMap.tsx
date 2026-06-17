"use client";

import {
  MAP_BOUNDS,
  CHINA_BORDER,
  HAINAN_CENTER,
  borderToPath,
  projectLngLat,
} from "./china-map";

interface MapMarker {
  id: string;
  city: string;
  lng: number;
  lat: number;
  active: boolean;
  onSelect: () => void;
}

export function ChinaEducationMap({
  markers,
  activeId,
}: {
  markers: MapMarker[];
  activeId: string;
}) {
  const chinaPath = borderToPath(CHINA_BORDER);
  const hainan = projectLngLat(...HAINAN_CENTER);

  const sortedMarkers = [...markers].sort((a, b) => a.lat - b.lat);

  return (
    <svg
      viewBox={`0 0 ${MAP_BOUNDS.width} ${MAP_BOUNDS.height}`}
      className="h-full w-full"
      aria-label="中国教育成长轨迹地图"
      role="img"
    >
      <defs>
        <linearGradient id="chinaFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8f0fe" />
          <stop offset="100%" stopColor="#f0f4ff" />
        </linearGradient>
        <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Province grid hint */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={(MAP_BOUNDS.width / 6) * i}
          y1={0}
          x2={(MAP_BOUNDS.width / 6) * i}
          y2={MAP_BOUNDS.height}
          stroke="#0071e3"
          strokeWidth="0.5"
          opacity="0.06"
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={0}
          y1={(MAP_BOUNDS.height / 4) * i}
          x2={MAP_BOUNDS.width}
          y2={(MAP_BOUNDS.height / 4) * i}
          stroke="#0071e3"
          strokeWidth="0.5"
          opacity="0.06"
        />
      ))}

      {/* Mainland */}
      <path
        d={chinaPath}
        fill="url(#chinaFill)"
        stroke="#b8c9e8"
        strokeWidth="1.5"
        strokeLinejoin="round"
        filter="url(#mapShadow)"
      />

      {/* Hainan */}
      <ellipse
        cx={hainan.x}
        cy={hainan.y}
        rx="14"
        ry="10"
        fill="url(#chinaFill)"
        stroke="#b8c9e8"
        strokeWidth="1"
      />

      {/* Journey route */}
      {sortedMarkers.length > 1 &&
        sortedMarkers.slice(1).map((marker, index) => {
          const prev = sortedMarkers[index];
          const from = projectLngLat(prev.lng, prev.lat);
          const to = projectLngLat(marker.lng, marker.lat);
          const midX = (from.x + to.x) / 2;
          const midY = Math.min(from.y, to.y) - 40;

          return (
            <path
              key={`route-${prev.id}-${marker.id}`}
              d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
              fill="none"
              stroke="#0071e3"
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity="0.45"
              strokeLinecap="round"
            />
          );
        })}

      {/* Markers */}
      {markers.map((marker) => {
        const { x, y } = projectLngLat(marker.lng, marker.lat);
        const isActive = marker.id === activeId;

        return (
          <g key={marker.id} className="cursor-pointer" onClick={marker.onSelect}>
            {isActive && (
              <circle
                cx={x}
                cy={y}
                r="22"
                fill="none"
                stroke="#0071e3"
                strokeWidth="1.5"
                opacity="0.35"
                className="animate-ping"
              />
            )}
            <circle
              cx={x}
              cy={y}
              r={isActive ? 9 : 7}
              fill={isActive ? "#0071e3" : "#86868b"}
              stroke="#fff"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            <text
              x={x}
              y={y - 16}
              textAnchor="middle"
              className="select-none fill-foreground text-[13px] font-medium"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {marker.city}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
