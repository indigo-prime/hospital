"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import {Button} from "@/components/ui/button";
import {Car, MapPin} from "lucide-react";

interface RestaurantMapCardProps {
    mapSrc: string;
    location: string;
    lat?: number;
    lng?: number;
}

export default function RestaurantMapCard({ mapSrc, location, lat, lng }: RestaurantMapCardProps) {
    const handleGetDirections = () => {
        if (!lat || !lng) {
            alert("Location coordinates not available.");
            return;
        }

        const openDirections = (origin: string = '') => {
            const url = `https://www.google.com/maps/dir/?api=1${origin ? `&origin=${origin}` : ''}&destination=${lat},${lng}&travelmode=driving`;
            window.open(url, '_blank');
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => openDirections(`${pos.coords.latitude},${pos.coords.longitude}`),
                () => openDirections()
            );
        } else {
            openDirections();
        }
    };

    const handleRideWithBolt = () => {
        if (!lat || !lng) {
            alert("Location coordinates not available.");
            return;
        }

        const getUserLocation = (callback: (pos: {lat: number, lng: number} | null) => void) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => callback({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                    () => callback(null)
                );
            } else {
                callback(null);
            }
        };

        getUserLocation((pos) => {
            let deepLink = `bolt://ride?dropoff_lat=${lat}&dropoff_lng=${lng}`;
            if (pos) {
                deepLink += `&pickup_lat=${pos.lat}&pickup_lng=${pos.lng}`;
            }

            // Attempt to open the deep link
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = deepLink;
            document.body.appendChild(iframe);

            setTimeout(() => {
                document.body.removeChild(iframe);
                // If app not opened, fallback to web or app store
                window.location.href = 'https://bolt.eu/en/rides/';
            }, 2000);
        });
    };

    return (
        <div className="bg-white border border-transparent rounded-lg mb-6 w-full">
            {/* Map Iframe */}
            <div className="w-full">
                <iframe
                    src={mapSrc}
                    className="w-full h-[300px] border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-2 mx-3 mb-4 mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGetDirections}
                    className="flex-1 flex items-center space-x-1"
                >
                    <MapPin className="w-4 h-4" />
                    <span>GET DIRECTIONS</span>
                </Button>

                <Button
                    size="sm"
                    onClick={handleRideWithBolt}
                    className="btn-bolt flex-1 flex items-center space-x-1"
                >
                    <Car className="w-4 h-4" />
                    <span>RIDE WITH BOLT</span>
                </Button>
            </div>
        </div>
    );
}