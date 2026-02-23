// store/filterStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFilterStore = create(
  persist(
    (set, get) => ({
      // Filter state
      searchValue: "",
       searchLat: null,
      searchLng: null,
     selectedRent: "Select Type",
      selectedCategory: "",
      selectedPropertyType: "",
      selectedPropertyTypeLabel: "",
      selectedBedroom: [], // bedrooms array
      selectedBathroom: [], // bathrooms array
      minArea: "",
      maxArea: "",
      selectedPeriod: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      selectedAmenities: [],
      selectedFurnishing: "",
      selectedVirtualTour:"",
      selectedSuggestions: [],

      selectedBeds: "Beds & Baths",
state: "",
      // Pagination state
      currentPage: 1,

      // Filter Options state
      filterOptions: {
        offering_types: [],
        categories: [],
        property_types: [],
        furnishing_types: [],
        amenities: [],
        rooms_options: { options: [] },
        bathrooms_options: { options: [] },
        sort_options: [],
        price_ranges: { min_options: [], max_options: [] },
        area_ranges: { min_options: [], max_options: [] },
      },

      // Actions
      setSearchValue: (value) => set({ searchValue: value }),
      setSearchLat: (lat) => set({ searchLat: lat }),
      setSearchLng: (lng) => set({ searchLng: lng }),
      // setSelectedRent: (value) => set({ selectedRent: value }),

 setSelectedRent: (value) =>
        set({
          selectedRent: value,
          currentPage: 1,
        }),

      // setSelectedCategory: (value) => set({ selectedCategory: value }),

       setSelectedCategory: (value) =>
        set({
          selectedCategory: value,
          currentPage: 1,
        }),

      setSelectedPropertyType: (value) => set({ selectedPropertyType: value }),
      setSelectedPropertyTypeLabel: (value) =>
        set({ selectedPropertyTypeLabel: value }),
      // setSelectedBedroom: (value) => set({ selectedBedroom: value }),
      // setSelectedBathroom: (value) => set({ selectedBathroom: value }),
      setSelectedBedroom: (arr) => set({ selectedBedroom: arr }),
      setSelectedBathroom: (arr) => set({ selectedBathroom: arr }),

      setSelectedPeriod: (value) => set({ selectedPeriod: value }),
      setMinPrice: (value) => set({ minPrice: value }),
      setMaxPrice: (value) => set({ maxPrice: value }),
      setSortBy: (value) => set({ sortBy: value }),
      setSelectedAmenities: (value) => set({ selectedAmenities: value }),
      setSelectedFurnishing: (value) => set({ selectedFurnishing: value }),
      setMinArea: (value) => set({ minArea: value }),
      setMaxArea: (value) => set({ maxArea: value }),
      setSelectedBeds: (value) => set({ selectedBeds: value }),
      setState: (value) => set({ state: value }),
      setSelectedVirtualTour: (value) => set({ selectedVirtualTour: value }),
      setSelectedSuggestions: (value) => set({ selectedSuggestions: value }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setFilterOptions: (options) => set({ filterOptions: options }),

      // Setter specifically for property types from master filter API
      setPropertyTypes: (propertyTypes) =>
        set((state) => ({
          filterOptions: {
            ...state.filterOptions,
            property_types: propertyTypes,
          },
        })),

      // Toggle amenity
      toggleAmenity: (amenityId) => {
        const current = get().selectedAmenities;
        if (current.includes(amenityId)) {
          set({
            selectedAmenities: current.filter((a) => a !== amenityId),
          });
        } else {
          set({
            selectedAmenities: [...current, amenityId],
          });
        }
      },

      // Toggle selection
      toggleBedroom: (val) => {
        const current = get().selectedBedroom;
        set({
          selectedBedroom: current.includes(val)
            ? current.filter((v) => v !== val)
            : [...current, val]
        });
      },
      toggleBathroom: (val) => {
        const current = get().selectedBathroom;
        set({
          selectedBathroom: current.includes(val)
            ? current.filter((v) => v !== val)
            : [...current, val]
        });
      },


      // Build query params
      buildQueryParams: (page = 1) => {
        const state = get();
        const params = new URLSearchParams();

        if (state.searchValue) params.append("search", state.searchValue);
        if (state.searchLat) params.append("lat", state.searchLat);
        if (state.searchLng) params.append("lng", state.searchLng);
        if (state.selectedRent && state.selectedRent !== "Select Type") {
          params.append("offering_types", state.selectedRent);
        }
        if (state.selectedCategory)
          params.append("category_id", state.selectedCategory);
        if (state.selectedPropertyType)
          params.append("property_type_id", state.selectedPropertyType);
        // if (state.selectedBedroom)
        //   params.append("rooms", state.selectedBedroom);
        // if (state.selectedBathroom)
        //   params.append("bathrooms", state.selectedBathroom);

        // ... other params ...
        if (state.selectedBedroom.length > 0)
          params.append("rooms", state.selectedBedroom.join(","));
        if (state.selectedBathroom.length > 0)
          params.append("bathrooms", state.selectedBathroom.join(","));

        if (state.minPrice) params.append("min_price", state.minPrice);
        if (state.maxPrice) params.append("max_price", state.maxPrice);
        if (state.selectedPeriod)
          params.append("rental_period", state.selectedPeriod);
        if (state.selectedAmenities.length > 0) {
          params.append("amenities", state.selectedAmenities.join(","));
        }

        // ✅ After (Only append if has value)
        if (state.selectedVirtualTour && state.selectedVirtualTour !== "") {
          params.append("virtual_tour", state.selectedVirtualTour);
        }

        if (
          state.selectedFurnishing
          //  &&
          // state.selectedFurnishing !== "All furnishings"
        ) {
          params.append("furnishing", state.selectedFurnishing);
        }
        if (state.minArea) params.append("min_area", state.minArea);
        if (state.maxArea) params.append("max_area", state.maxArea);
        if (state.sortBy) params.append("sort_by", state.sortBy);

        // params.append("featured", "0");
        params.append("state", state.state);
        params.append("per_page", "10");
        params.append("page", page);

        return params.toString();
      },

      // Clear all filters
      clearAllFilters: () =>
        set({
          searchValue: "",
            searchLat: null,
          searchLng: null,
          selectedRent: "Select Type",
          selectedCategory: "",
          selectedPropertyType: "",
          selectedPropertyTypeLabel: "",
          // selectedBedroom: "",
          // selectedBathroom: "",
           selectedBedroom: [],
          selectedBathroom: [],
          selectedPeriod: "",
          minPrice: "",
          maxPrice: "",
          sortBy: "",
          selectedAmenities: [],
          selectedFurnishing: "",
          selectedVirtualTour:"",
          selectedSuggestions: [],
          minArea: "",
          maxArea: "",
          state: "",
          selectedBeds: "Beds & Baths",
          currentPage: 1,
        }),

      // Update beds text
     // Update beds text for display
    updateBedsText: (filterOpts) => {
  const state = get();
  
  const bedLabels = state.selectedBedroom
    .map((v) => {
      const opt = filterOpts.rooms_options?.options?.find((o) => String(o.value) === String(v));
      return opt ? opt.value : null;
    })
    .filter(Boolean);
    
  const bathLabels = state.selectedBathroom
    .map((v) => {
      const opt = filterOpts.bathrooms_options?.options?.find((o) => String(o.value) === String(v));
      return opt ? opt.value : null;
    })
    .filter(Boolean);
  
  let bedsText = "Beds & Baths";
  
  if (bedLabels.length > 0 && bathLabels.length > 0) {
    bedsText = `${bedLabels.join(", ")} Bed & ${bathLabels.join(", ")} Bath`;
  } else if (bedLabels.length > 0) {
    bedsText = `${bedLabels.join(", ")} Bed`;
  } else if (bathLabels.length > 0) {
    bedsText = `${bathLabels.join(", ")} Bath`;
  }
  
  set({ selectedBeds: bedsText });
},


    }),
    {
      name: "filter-store", // name of the item in localStorage
      partialize: (state) => ({
        searchValue: state.searchValue,
         searchLat: state.searchLat,
        searchLng: state.searchLng,
        selectedRent: state.selectedRent,
        selectedCategory: state.selectedCategory,
        selectedPropertyType: state.selectedPropertyType,
        selectedPropertyTypeLabel: state.selectedPropertyTypeLabel,
        selectedBedroom: state.selectedBedroom,
        selectedBathroom: state.selectedBathroom,
        selectedPeriod: state.selectedPeriod,
        minPrice: state.minPrice,
        maxPrice: state.maxPrice,
        sortBy: state.sortBy,
        selectedAmenities: state.selectedAmenities,
        selectedFurnishing: state.selectedFurnishing,
        selectedVirtualTour:state.selectedVirtualTour,
        minArea: state.minArea,
        maxArea: state.maxArea,
        selectedSuggestions: state.selectedSuggestions,

      }),
    }
  )
);
