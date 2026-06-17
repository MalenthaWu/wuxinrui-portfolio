/** Simplified China mainland border for education journey map (lng, lat). */
export const CHINA_BORDER: [number, number][] = [
  [73.4, 39.4],
  [73.5, 35.0],
  [76.0, 31.5],
  [78.5, 28.0],
  [80.0, 26.0],
  [82.5, 23.5],
  [85.0, 21.5],
  [88.0, 21.0],
  [92.0, 21.5],
  [96.0, 22.0],
  [99.0, 21.5],
  [102.0, 22.0],
  [105.5, 22.5],
  [108.0, 18.2],
  [110.5, 18.5],
  [112.0, 20.0],
  [114.5, 22.0],
  [117.0, 22.5],
  [118.5, 24.0],
  [119.5, 26.0],
  [121.0, 28.5],
  [122.0, 31.0],
  [121.5, 34.0],
  [122.5, 37.0],
  [121.0, 39.5],
  [119.0, 41.0],
  [117.0, 42.0],
  [114.0, 42.5],
  [111.0, 43.5],
  [108.0, 44.5],
  [105.0, 45.5],
  [102.0, 46.5],
  [98.0, 47.5],
  [94.0, 48.0],
  [90.0, 48.5],
  [87.0, 49.0],
  [84.0, 50.0],
  [82.0, 51.5],
  [84.0, 52.5],
  [88.0, 53.0],
  [92.0, 53.5],
  [98.0, 53.5],
  [105.0, 53.5],
  [112.0, 53.5],
  [118.0, 53.0],
  [122.0, 52.0],
  [125.0, 50.5],
  [128.0, 49.0],
  [130.0, 48.0],
  [133.5, 48.0],
  [134.8, 45.5],
  [132.0, 43.0],
  [128.0, 41.5],
  [124.0, 40.0],
  [120.0, 39.5],
  [116.0, 39.0],
  [112.0, 38.5],
  [108.0, 38.0],
  [104.0, 37.5],
  [100.0, 38.0],
  [96.0, 38.5],
  [92.0, 39.0],
  [88.0, 39.5],
  [84.0, 40.0],
  [80.0, 40.5],
  [76.0, 40.0],
  [73.4, 39.4],
];

export const HAINAN_CENTER: [number, number] = [110.3, 19.2];

export const MAP_BOUNDS = {
  minLng: 72,
  maxLng: 136,
  minLat: 17,
  maxLat: 54,
  width: 800,
  height: 620,
};

export function projectLngLat(lng: number, lat: number) {
  const { minLng, maxLng, minLat, maxLat, width, height } = MAP_BOUNDS;
  return {
    x: ((lng - minLng) / (maxLng - minLng)) * width,
    y: ((maxLat - lat) / (maxLat - minLat)) * height,
  };
}

export function borderToPath(points: [number, number][]) {
  return points
    .map(([lng, lat], index) => {
      const { x, y } = projectLngLat(lng, lat);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ")
    .concat(" Z");
}
