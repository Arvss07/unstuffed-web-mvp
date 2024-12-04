import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ImagePlus } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const LocationPicker = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation({ lat, lng });
    },
  });

  return null;
};

const DonateForm = ({ user }) => {
  const [formData, setFormData] = useState({
    location: { lat: 16.4023, lng: 120.596 },
    itemTypes: [],
    photos: [],
    selectedOrganization: null,
    termsAccepted: false,
  });

  const [items, setItems] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: ngo_data, error: ngo_error } = await supabase.from("ngo").select("*");
      if (ngo_error) {
        toast.error("Failed to fetch NGOs.");
        console.error(ngo_error);
      } else {
        setNgos(ngo_data);
        console.log("NGOs fetched successfully.");
        console.log(ngo_data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedNgo) {
      const fetchAllowedItems = async () => {
        const { data: allowed_items, error: itemsError } = await supabase.from("allowed_items").select("items_id").eq("ngo_id", selectedNgo.id);
        if (itemsError) {
          toast.error("Failed to fetch allowed items.");
          console.error(itemsError);
        } else {
          const itemIds = allowed_items.map((item) => item.items_id);
          const { data: items_data, error: itemsError } = await supabase.from("items").select("*").in("id", itemIds);
          if (itemsError) {
            toast.error("Failed to fetch items.");
            console.error(itemsError);
          } else {
            setItems(items_data);
            console.log("Items fetched successfully.");
            console.log(items_data);
          }
        }
      };

      fetchAllowedItems();
    }
  }, [selectedNgo]);

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await response.json();
      const address = data.display_name || "Address not found";
      setFormData((prev) => ({ ...prev, address }));
    } catch (error) {
      toast.error("Failed to fetch address. Please try again.");
      console.error(error);
    }
  };

  const handleLocationChange = (location) => {
    setFormData((prev) => ({ ...prev, location }));
    reverseGeocode(location.lat, location.lng);
  };

  const handleNgoSelect = (ngo) => {
    setSelectedNgo(ngo);
    setFormData((prev) => ({ ...prev, selectedOrganization: ngo.id }));
  };

  const handleItemSelect = (itemName) => {
    setFormData((prev) => {
      const itemTypes = prev.itemTypes.includes(itemName) ? prev.itemTypes.filter((name) => name !== itemName) : [...prev.itemTypes, itemName];
      return { ...prev, itemTypes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.selectedOrganization) {
      toast.error("Please select organization");
      return;
    }

    if (formData.itemTypes.length === 0) {
      toast.error("Please choose type of the item");
      return;
    }

    if (formData.photos.length === 0) {
      toast.error("Please upload atleast one image");
      return;
    }

    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    //upload photos
    const uploadPhotoURLs = await uploadPhotos(formData.photos);

    // donations details
    const donationDetails = {
      donated_by: user.id,
      donated_to: selectedNgo.id,
      donated_on: new Date().toISOString(),
      items_donated: formData.itemTypes.join(","),
      items_donated_link: uploadPhotoURLs.join(","),
      user_location: formData.address,
    };

    await saveDonationsDetails(donationDetails);

    setFormData({
      location: { lat: 16.4023, lng: 120.596 },
      itemTypes: [],
      photos: [],
      selectedOrganization: null,
      termsAccepted: false,
    });

    toast.success("Thank you for your donation!");
    console.log("Donation Details: ");
    console.log(donationDetails);
    console.log("Form Data: ");
    console.log(formData);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  // ===========================================
  const uploadPhotos = async (photos) => {
    const photosURLs = [];
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const bucketName = "unstuffed-mvp-bucket";

    for (let p of photos) {
      const uniqueName = `${Date.now()}-${p.name}`;
      const { data, error } = await supabase.storage.from(bucketName).upload(uniqueName, p, {
        cacheControl: "3600",
        upsert: true,
      });

      if (error) {
        console.error("Photo upload error", error);
        toast.error("Failed to upload photo. Please try again later.");
        continue;
      }

      const publicURL = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${uniqueName}`;
      console.log("Uploaded photo URL:", publicURL);
      photosURLs.push(publicURL);
    }
    console.log("All uploaded photo URLs:", photosURLs);
    return photosURLs;
  };

  const saveDonationsDetails = async (donationDetails) => {
    const { data, error } = await supabase.from("donations").insert(donationDetails);

    if (error) {
      toast.error("Error Saving donation details", error);
      return;
    }
    toast.success("Donations saved successfully.");
  };
  // ===========================================

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px] mx-auto p-4">
      {/* Left Column - Form Details */}
      <div className="space-y-8">
        {/* Select Location */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Current Location</h2>
          <p className="text-gray-600 mb-4">Click on the map to select your location or adjust it manually.</p>
          <Input value={formData.address || ""} readOnly placeholder="Your address will appear here" className="w-full" />
        </div>

        {/* Organizations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Available Organizations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ngos.map((ngo) => (
              <button
                key={ngo.id}
                type="button"
                onClick={() => handleNgoSelect(ngo)}
                className={`p-4 rounded-full border transition-all ${
                  formData.selectedOrganization === ngo.id ? "border-blue-500 shadow-lg bg-blue-100" : "border-gray-200"
                }`}
              >
                <img src={ngo.logo} alt={ngo.ngo_name} className="w-12 h-12 mx-auto" />
                <p className="text-xs text-center mt-2">{ngo.abbr}</p>
              </button>
            ))}
          </div>
          <Button className="mt-4">See More</Button>
        </div>

        {/* NGO Details */}
        {selectedNgo && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{selectedNgo.ngo_name}</h2>
            <p className="text-gray-600 mb-4">{selectedNgo.donation_details}</p>
            <p className="text-gray-600 mb-4">{selectedNgo.location}</p>
          </div>
        )}

        {/* Items to Donate */}
        {selectedNgo && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Allowed Stuff</h2>
            <div className="grid grid-cols-2 gap-4">
              {items.map((item) => (
                <label
                  key={item.id}
                  htmlFor={`item-${item.id}`}
                  className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md transition-all ${
                    formData.itemTypes.includes(item.name) ? "bg-blue-100 border-blue-500" : "border-gray-200"
                  }`}
                >
                  <Checkbox
                    id={`item-${item.id}`}
                    checked={formData.itemTypes.includes(item.name)}
                    onCheckedChange={() => handleItemSelect(item.name)}
                    className="hidden"
                  />
                  <span>{item.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Upload Photos */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Photos of Donation</h2>
          <div className="flex flex-wrap gap-4">
            <label className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              <ImagePlus className="w-8 h-8 text-gray-400" />
            </label>
            {formData.photos.map((photo, index) => (
              <div key={index} className="w-32 h-32 relative">
                <img src={URL.createObjectURL(photo)} alt={`Upload ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
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
            By checking this box, I acknowledge I have read and understand, and agree to Unstuffed's Donating Terms and Conditions.
          </label>
        </div>

        {/* Submit Button */}
        <Button onClick={handleSubmit} className="w-full">
          Donate
        </Button>
      </div>

      {/* Right Column - Map */}
      <div className="bg-white rounded-lg shadow p-6 h-[calc(100vh-2rem)] sticky top-4">
        <div className="h-full rounded-lg overflow-hidden">
          <MapContainer center={[16.4023, 120.596]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationPicker setLocation={(location) => handleLocationChange(location)} />
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
