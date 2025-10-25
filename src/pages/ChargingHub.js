import { useEffect, useRef, useState } from "react";

export default function ChargingHub() {
  const mapRef = useRef(null);
  const [status, setStatus] = useState("Locating nearby charging stations...");
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    async function initMap() {
      if (!navigator.geolocation) {
        setStatus("Geolocation not supported.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const userPos = { lat: latitude, lng: longitude };
          setUserLocation(userPos);

          const map = new window.google.maps.Map(mapRef.current, {
            zoom: 13,
            center: userPos,
          });

          const userMarker = new window.google.maps.Marker({
            position: userPos,
            map,
            title: "You are here",
            icon: {
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
                  <defs>
                    <radialGradient id="pulseGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#3b82f6" stop-opacity="1"/>
                      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.6"/>
                    </radialGradient>
                  </defs>
                  <!-- Pulsing ring -->
                  <circle cx="26" cy="26" r="18" fill="url(#pulseGrad)" opacity="0.4">
                    <animate attributeName="r" values="18;22;18" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <!-- Inner solid circle -->
                  <circle cx="26" cy="26" r="12" fill="#2563eb" stroke="white" stroke-width="3"/>
                  <!-- Center dot -->
                  <circle cx="26" cy="26" r="5" fill="white"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(52, 52),
              anchor: new window.google.maps.Point(26, 26),
              zIndex: 2000,
            },
          });

          // Add info window for user location
          const userInfoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">📍 Your Current Location</h3>
                <div style="font-size: 13px; color: #6b7280; line-height: 1.4;">
                  Lat: ${latitude.toFixed(6)}<br/>
                  Lng: ${longitude.toFixed(6)}
                </div>
              </div>
            `,
          });

          userMarker.addListener("click", () => {
            userInfoWindow.open(map, userMarker);
          });

          // Get higher accuracy location
          navigator.geolocation.getCurrentPosition(
            (highAccuracyPos) => {
              const newPos = {
                lat: highAccuracyPos.coords.latitude,
                lng: highAccuracyPos.coords.longitude,
              };
              userMarker.setPosition(newPos);
              map.setCenter(newPos);
            },
            () => {}, // Ignore high accuracy errors, keep original position
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
          );

          try {
            const res = await fetch(
              `https://api.openchargemap.io/v3/poi/?output=json&latitude=${latitude}&longitude=${longitude}&maxresults=200&distance=100&distanceunit=Miles&key=1b9544b3-e9e2-47fd-ad52-1ca079a7c250`
            );
            if (!res.ok) throw new Error("Failed to fetch stations");
            const stations = await res.json();

            // Group stations by location with distance-based clustering
            const locationGroups = [];
            const clusterRadius = 0.001; // Approximately 100 meters - tighter clustering

            stations.forEach((station) => {
              const stationPos = {
                lat: station.AddressInfo.Latitude,
                lng: station.AddressInfo.Longitude,
              };

              // Find existing group within cluster radius
              let foundGroup = locationGroups.find((group) => {
                const distance = Math.sqrt(
                  Math.pow(group.position.lat - stationPos.lat, 2) +
                    Math.pow(group.position.lng - stationPos.lng, 2)
                );
                return distance <= clusterRadius;
              });

              if (foundGroup) {
                // Add to existing group
                foundGroup.stations.push(station);
              } else {
                // Create new group
                locationGroups.push({
                  position: stationPos,
                  stations: [station],
                  title: station.AddressInfo.Title,
                });
              }
            });

            // Create one marker per location group
            locationGroups.forEach((group) => {
              const marker = new window.google.maps.Marker({
                position: group.position,
                map,
                title: group.title,
                zIndex: 100, // Lower than user marker
                icon: {
                  url:
                    "data:image/svg+xml;charset=UTF-8," +
                    encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                        </linearGradient>
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.3"/>
                        </filter>
                      </defs>
                      <circle cx="16" cy="16" r="14" fill="url(#grad)" stroke="#ffffff" stroke-width="2" filter="url(#shadow)"/>
                      <path d="M12 8h4l-2 6h3l-6 10 2-8h-3z" fill="#ffffff" stroke="#059669" stroke-width="0.5"/>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(32, 32),
                  anchor: new window.google.maps.Point(16, 16),
                },
              });

              // Create info window with all stations at this location
              let infoContent = `
                <div style="padding: 12px; min-width: 280px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                  <div style="margin-bottom: 12px;">
              `;

              if (group.stations.length > 1) {
                infoContent += `
                    <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${group.title}</h3>
                    <p style="margin: 0 0 12px 0; font-size: 13px; color: #6b7280; font-style: italic;">${group.stations.length} charging networks available</p>
                    <div style="margin-bottom: 12px;">
                `;
                group.stations.forEach((station, index) => {
                  if (index < 3) {
                    infoContent += `<div style="margin: 4px 0; padding: 4px 8px; background: #f3f4f6; border-radius: 4px; font-size: 13px;">• ${station.AddressInfo.Title}</div>`;
                  }
                });
                if (group.stations.length > 3) {
                  infoContent += `<div style="margin: 4px 0; padding: 4px 8px; background: #e5e7eb; border-radius: 4px; font-size: 13px; color: #6b7280;">• and ${
                    group.stations.length - 3
                  } more...</div>`;
                }
                infoContent += `</div>`;
              } else {
                infoContent += `<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${group.stations[0].AddressInfo.Title}</h3>`;
              }

              infoContent += `
                    <div style="margin-bottom: 12px; padding: 8px; background: #f9fafb; border-radius: 6px; border-left: 3px solid #22c55e;">
                      <div style="font-size: 13px; color: #374151; line-height: 1.4;">
                        📍 ${
                          group.stations[0].AddressInfo.AddressLine1 || ""
                        }, ${group.stations[0].AddressInfo.Town || ""}<br/>
                        📏 ${group.stations[0].AddressInfo.Distance.toFixed(
                          1
                        )} miles away
                      </div>
                    </div>
                  </div>
                  <button id="directions-btn-${group.position.lat}-${
                group.position.lng
              }" 
                    style="width: 100%; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; border: none; padding: 12px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(34, 197, 94, 0.2);"
                    onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(34, 197, 94, 0.3)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(34, 197, 94, 0.2)'">
                    🗺️ Get Directions
                  </button>
                </div>
              `;

              const infowindow = new window.google.maps.InfoWindow({
                content: infoContent,
                maxWidth: 350,
                pixelOffset: new window.google.maps.Size(0, -10),
              });

              marker.addListener("click", () => {
                infowindow.open(map, marker);

                // Add event listener after the info window opens
                setTimeout(() => {
                  const btn = document.getElementById(
                    `directions-btn-${group.position.lat}-${group.position.lng}`
                  );
                  if (btn) {
                    btn.onclick = (e) => {
                      e.stopPropagation();
                      // Open Google Maps with directions using coordinates
                      const googleMapsUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${group.position.lat},${group.position.lng}`;
                      window.open(googleMapsUrl, "_blank");
                    };
                  }
                }, 100);
              });
            });

            setStatus("Charging stations loaded successfully.");

            setStatus("Charging stations loaded successfully.");
          } catch (err) {
            console.error(err);
            setStatus("Failed to load charging stations.");
          }
        },
        (error) => {
          let errorMsg = "Location access denied.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMsg =
                "Location access denied. Please allow location access and refresh.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMsg = "Location information unavailable.";
              break;
            case error.TIMEOUT:
              errorMsg = "Location request timed out.";
              break;
          }
          setStatus(errorMsg);
        }
      );
    }

    if (window.google && window.google.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB0FjV6bp_yBzGoW9fGTNTBwzQJhEijDrs`;
      script.onload = initMap;
      script.onerror = () => {
        setStatus("Failed to load Google Maps.");
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2"> Nearby Charging Stations</h2>
      <p className="text-gray-600 mb-2">{status}</p>
      <div
        ref={mapRef}
        style={{ height: "80vh", width: "100%", borderRadius: "0.75rem" }}
      />
    </div>
  );
}
