import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ImagePlus } from "lucide-react";
import { supabase } from "./lib/supabaseClient";

// const ALLOWED_ITEMS = [
//   "Clothing",
//   "Furniture",
//   "Electronics",
//   "Books",
//   "Toys",
//   "Kitchen Items",
//   "Sports Equipment",
// ];

const ORGANIZATIONS = [
  { id: 1, name: "GHGH", logo: "/public/placeholder.svg" },
  { id: 2, name: "DSWD", logo: "/public/placeholder.svg" },
  { id: 3, name: "Baguio Health", logo: "/public/placeholder.svg" },
  { id: 4, name: "City Hall", logo: "/public/placeholder.svg" },
  { id: 5, name: "NGO", logo: "/public/placeholder.svg" },
  { id: 6, name: "PNPSP", logo: "/public/placeholder.svg" },
];

const LocationPicker = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation({ lat, lng });
    },
  });

  return null;
};

const DonateForm = () => {
  const [formData, setFormData] = useState({
    location: { lat: 16.4023, lng: 120.596 },
    itemType: "",
    photos: [],
    selectedOrganization: null,
    termsAccepted: false,
  });

  const [allowedItems, setAllowedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: items, error: itemsError } = await supabase
        .from("allowed_items")
        .select("*");
      if (itemsError) {
        toast.error("Failed to fetch allowed items.");
      } else {
        setAllowedItems(items);
      }
    };

    fetchData();
  }, []);

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      const address = data.display_name || "Address not found";
      setFormData((prev) => ({ ...prev, address }));
    } catch (error) {
      toast.error("Failed to fetch address. Please try again.");
    }
  };

  const handleLocationChange = (location) => {
    setFormData((prev) => ({ ...prev, location }));
    reverseGeocode(location.lat, location.lng);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }
    toast.success("Thank you for your donation!");
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px] mx-auto p-4">
      {/* Left Column - Form Details */}
      <div className="space-y-8">
        {/* Select Location */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Current Location</h2>
          <p className="text-gray-600 mb-4">
            Click on the map to select your location or adjust it manually.
          </p>
          <Input
            value={formData.address || ""}
            readOnly
            placeholder="Your address will appear here"
            className="w-full"
          />
        </div>

        {/* Items to Donate */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Allowed Stuff</h2>
          <select
            value={formData.itemType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, itemType: e.target.value }))
            }
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Item to Donate</option>
            {allowedItems.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Organizations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Available Organizations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ORGANIZATIONS.map((org) => (
              <button
                key={org.id}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    selectedOrganization: org.id,
                  }))
                }
                className={`p-4 rounded-full border transition-all ${
                  formData.selectedOrganization === org.id
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={org.logo}
                  alt={org.name}
                  className="w-12 h-12 mx-auto"
                />
                <p className="text-xs text-center mt-2">{org.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Upload Photos */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Upload Photos of Donation
          </h2>
          <div className="flex flex-wrap gap-4">
            <label className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <ImagePlus className="w-8 h-8 text-gray-400" />
            </label>
            {formData.photos.map((photo, index) => (
              <div key={index} className="w-32 h-32 relative">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Terms Accepted */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={formData.termsAccepted}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                termsAccepted: e.target.checked,
              }))
            }
            className="w-4 h-4"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            By checking this box, I acknowledge I have read and understand, and
            agree to Unstuffed's Donating Terms and Conditions.
          </label>
        </div>

        {/* Submit Button */}
        <Button onClick={handleSubmit} className="w-full">
          DONATE
        </Button>
      </div>

      {/* Right Column - Map */}
      <div className="bg-white rounded-lg shadow p-6 h-[calc(100vh-2rem)] sticky top-4">
        <div className="h-full rounded-lg overflow-hidden">
          <MapContainer
            center={[16.4023, 120.596]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationPicker
              setLocation={(location) => handleLocationChange(location)}
            />
            <Marker position={[formData.location.lat, formData.location.lng]}>
              <Popup>Your location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default DonateForm;
