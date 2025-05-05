// Initialize Leaflet map
document.addEventListener('DOMContentLoaded', function() {
const map = L.map('map').setView([48.0196, 66.9237], 5);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Helper function for creating custom popups
function createPopupContent(title, text) {
    return `
        <div class="popup-content">
            <h3 class="popup-title">${title}</h3>
            <p class="popup-text">${text}</p>
        </div>
    `;
}

// Define custom markers
const cityIcon = L.divIcon({
    html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
            </svg>`,
    className: 'city-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

const adminIcon = L.divIcon({
    html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff3300" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="12" cy="12" r="3" />
            </svg>`,
    className: 'admin-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

const historicalIcon = L.divIcon({
    html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffcc00" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>`,
    className: 'historical-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

L.geoJSON(geojson, {
    style: function(feature) {
        const territoryType = feature.properties.country;
        const defaultStyle = {
            color: '#ffffff',
            fillColor: '#cccccc',
            fillOpacity: 0.3,
            weight: 1
        };

        const territoryStyles = {
            "Alash Orda": {
                color: '#ff3300',
                fillColor: '#ff3300',
                fillOpacity: 0.3,
                weight: 2
            },
            "Turkestan": {
                color: '#ff9900',
                fillColor: '#ff9900',
                fillOpacity: 0.3,
                weight: 2
            },
            "Zakaspyi": {
                color: '#ff9900',
                fillColor: '#ff9900',
                fillOpacity: 0.3,
                weight: 2
            },
            "Hiva": {
                color: '#ff9900',
                fillColor: '#ff9900',
                fillOpacity: 0.3,
                weight: 2
            },
            "Buhara": {
                color: '#ff9900',
                fillColor: '#ff9900',
                fillOpacity: 0.3,
                weight: 2
            },
            "Russia": {
                color: '#ffcc00',
                fillColor: '#ffcc00',
                fillOpacity: 0.3,
                weight: 2
            },
            "China": {
                color: '#9F2B68',
                fillColor: '#9F2B68',
                fillOpacity: 0.3,
                weight: 2
            },
            "Afghanistan": {
                color: '#9F2B68',
                fillColor: '#9F2B68',
                fillOpacity: 0.3,
                weight: 2
            }
        };

        return territoryStyles[territoryType] || defaultStyle;
    },
    onEachFeature: function(feature, layer) {
        const title = feature.properties.popupTitle;
        const content = feature.properties.popupContent;

        if (title && content) {
            layer.bindPopup(createPopupContent(title, content));
            // layer.bindPopup(`<strong>${title}</strong><br>${content}`);
        } else if (feature.properties.name || feature.properties.country) {
            layer.bindPopup(`<strong>${feature.properties.name || feature.properties.country}</strong>`);
        }
    }
}).addTo(map);


// Administrative centers
L.marker([51.2278, 51.3865], {icon: adminIcon}).addTo(map)
    .bindPopup(createPopupContent(
        "Orenburg",
        "Site of the Second All-Kazakh Congress in December 1917, where the Alash Autonomy was declared. Served briefly as the capital of the Alash government before falling to the Bolsheviks."
    ));
    
L.marker([51.2295, 51.3865], {icon: adminIcon}).addTo(map)
    .bindPopup(createPopupContent(
        "Oral (Uralsk)",
        "Administrative center of Western Alash, governed by a council led by Halel Dosmuhamedov. It served as a key connection point between Alash leaders and anti-Bolshevik forces."
    ));
    
L.marker([50.4111, 80.2359], {icon: adminIcon}).addTo(map)
    .bindPopup(createPopupContent(
        "Semey (Semipalatinsk)",
        "Administrative center of Eastern Alash and a major cultural hub for Kazakh intellectuals. Many leaders of the movement, including Alikhan Bukeikhanov, had strong connections to this city."
    ));

// Major cities
L.marker([43.2380, 76.8829], {icon: cityIcon}).addTo(map)
    .bindPopup(createPopupContent(
        "Almaty (Verny)",
        "An important southern center where Alash ideas found support among the local Kazakh intelligentsia. The city would later become the capital of the Kazakh SSR."
    ));
    
L.marker([51.1605, 71.4704], {icon: cityIcon}).addTo(map)
    .bindPopup(createPopupContent(
        "Akmola (Akmolinsk)",
        "A significant northern settlement that became an important hub for Alash organizers working among the Kazakh populations of the northern steppe."
    ));
    
L.marker([43.6588, 51.1975], {icon: cityIcon}).addTo(map)
    .bindPopup(createPopupContent(
        "Aktau Region",
        "Western coastal area near the Caspian Sea that represented a strategic region for the Alash movement's connections with other Muslim autonomy movements."
    ));
    
L.marker([42.3417, 69.5901], {icon: cityIcon}).addTo(map)
    .bindPopup(createPopupContent(
        "Shymkent",
        "Southern city with cultural significance where Alash ideas of national revival resonated strongly with the local population."
    ));

// Historical sites
L.marker([47.0945, 70.7957], {icon: historicalIcon}).addTo(map)
    .bindPopup(createPopupContent(
        "Korgalzhyn",
        "Site where the first draft of the Alash constitution was reportedly developed, outlining the vision for a democratic Kazakh state."
    ));
    
L.marker([49.8046, 73.1094], {icon: historicalIcon}).addTo(map)
    .bindPopup(createPopupContent(
        "Karagandy Region",
        "Location of significant meetings between Alash leaders and representatives of the Siberian governments during negotiations for potential alliances."
    ));
    
L.marker([45.0167, 78.3646], {icon: historicalIcon}).addTo(map)
    .bindPopup(createPopupContent(
        "Zharkent",
        "Eastern city near the Chinese border that played a role in the Alash movement's diplomatic efforts to gain international recognition."
    ));
});