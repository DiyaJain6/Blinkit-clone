import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Address {
    _id?: string;
    title: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
}

interface LocationState {
    selectedLocation: Address | null;
    setSelectedLocation: (location: Address | null) => void;
}

export const useLocationStore = create<LocationState>()(
    persist(
        (set) => ({
            selectedLocation: null,
            setSelectedLocation: (location) => set({ selectedLocation: location }),
        }),
        {
            name: 'location-storage',
        }
    )
);
