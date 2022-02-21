$(document).ready(function () {
  $(".map-wrap").mapael({
    map: {
      name: "world_countries",
      zoom: {
        enabled: false,
        mousewheel: false,
        touch: false,
      },
      defaultArea: {
        attrs: {
          fill: "#172A7A",
          stroke: "#1E338C",
        },
        attrsHover: {
          fill: "#4076A1",
        },
        cssClass: "toto",
      },
    },
    plots: {
      fr: {
        latitude: 48.5734,
        longitude: 7.7521,
        tooltip: { content: "Strasbourg, France" },
        attrs: {
          fill: "#3bafff",
        },
      },
      sg: {
        latitude: 1.3521,
        longitude: 103.8198,
        tooltip: { content: "Singapore, SEA" },
        attrs: {
          fill: "#3bafff",
        },
      },
      lo: {
        latitude: 51.50741,
        longitude: 0.1278,
        tooltip: { content: "London, United Kingdom" },
        attrs: {
          fill: "#3bafff",
        },
      },
      us: {
        latitude: 45.5272,
        longitude: -122.9361,
        tooltip: { content: "Hillsboro, Oregon, USA" },
        attrs: {
          fill: "#3bafff",
        },
      },
      au: {
        latitude: -33.8688,
        longitude: 151.2093,
        tooltip: { content: "Sydney, Australia" },
        attrs: {
          fill: "#3bafff",
        },
      },
      vi: {
        latitude: 38.7465,
        longitude: -77.6738,
        tooltip: { content: "Vint Hill, Virginia, USA" },
        attrs: {
          fill: "#3bafff",
        },
      },
      ca: {
        latitude: 45.3151,
        longitude: -73.8779,
        tooltip: { content: "Beauharnois, Canada" },
        attrs: {
          fill: "#aa7bda",
        },
      },
      gr: {
        latitude: 50.9871,
        longitude: 2.1255,
        tooltip: { content: "Gravelines, France" },
        attrs: {
          fill: "#aa7bda",
        },
      },
    },
  });
});
