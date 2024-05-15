const twPalette = {
  // change with our color palette
  "mbp-gray": {
    "50": "#f8f8f8",
    "100": "#efefef", // our gray
    "200": "#dcdcdc",
    "300": "#bdbdbd",
    "400": "#989898",
    "500": "#7c7c7c",
    "600": "#656565",
    "700": "#525252",
    "800": "#464646",
    "900": "#3d3d3d",
    "950": "#292929",
  },

  "mbp-green": {
    "50": "#eefffb",
    "100": "#c6fff6",
    "200": "#8cffee",
    "300": "#4bfde5",
    "400": "#16ebd4",
    "500": "#00cebb",
    "600": "#00a69a",
    "700": "#017a73", // our green
    "800": "#076864",
    "900": "#0b5652",
    "950": "#003535",
  },
  "mbp-red": {
    "50": "#fef3f2",
    "100": "#fee4e2",
    "200": "#fdcecb",
    "300": "#fbaca6",
    "400": "#f67c73",
    "500": "#ed5146",
    "600": "#da3428",
    "700": "#b7281e",
    "800": "#98241c",
    "900": "#75221c", // our red
    "950": "#440f0b",
  },
  yellow: {
    "50": "#fcfbea",
    "100": "#faf4c7",
    "200": "#f5e793",
    "300": "#f0d354",
    "400": "#eac02f",
    "500": "#d9a519",
    "600": "#bb8113",
    "700": "#965d12",
    "800": "#7c4a17",
    "900": "#6a3d19",
    "950": "#3e200a",
  },
  blue: "#b3e5fc",
};

const style = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: twPalette["mbp-gray"][50],
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: twPalette["mbp-gray"][500],
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: twPalette["mbp-gray"][100], // todo: change with our color
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: twPalette["mbp-gray"][500],
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: twPalette["mbp-gray"][400],
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: twPalette["mbp-gray"][300],
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: twPalette["mbp-gray"][200],
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: twPalette["mbp-gray"][50],
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: twPalette["mbp-green"][500],
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: twPalette.yellow[200],
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: twPalette["mbp-gray"][500],
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: twPalette.yellow[50],
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: twPalette.yellow[200],
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: twPalette.yellow[300],
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: twPalette["mbp-gray"][700],
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: twPalette.yellow[100],
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: twPalette.blue, // Success 100
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: twPalette["mbp-gray"][600], // Primary 100
      },
    ],
  },
];

export default style;
