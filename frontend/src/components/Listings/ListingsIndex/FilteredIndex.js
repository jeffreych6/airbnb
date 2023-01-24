import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as listingsActions from "../../../store/listings";
import FilterBar from "./FilterBar"
import FilteredMap from "./FilteredMap"
import "./FilteredIndex.css";

function FilteredIndex() {
    const dispatch = useDispatch();
    const { filter } = useParams();
    // const listings = useSelector(state => Object.values(state.listings).filter((listing) => listing.propertyType === filter))
    const listings = useSelector(state => Object.values(state.listings).filter((listing) => filter.includes(listing.propertyType)))

    useEffect(() => {
        dispatch(listingsActions.fetchListings())
    },[filter])

    if (!listings) {
        return null;
    }

    const locations = []

    if (listings.length > 0) {
        for (let i = 0; i < listings.length; i++) {
            locations.push({
                id: listings[i].id,
                title: listings[i].title,
                propertyType: listings[i].propertyType,
                city: listings[i].city,
                state: listings[i].state,
                country: listings[i].country,
                rating: listings[i].rating,
                location: {
                    lat: listings[i].lat,
                    lng: listings[i].lng
                },
                photo: listings[i].photosUrl[0]
            })
        }
    }
    
    const listing = listings.map((listing) => {
        return (
            <NavLink className="listings-index-container" to={`listings/${listing.id}`} key={listing.id}>
                <img className="listings-index-image" src={listing.photosUrl[0]} />
                <div className="listings-index-description-container">
                    <div className="listings-index-description">
                        <div className="listings-index-location">
                            {listing.city}, {listing.state}
                        </div>
                        <div className="listings-index-rating">
                            <i className="fa-sharp fa-solid fa-star"></i> 
                            <span>{parseFloat(listing.rating).toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="listings-index-title">
                        {listing.title} 
                    </div>
                    <div className="listings-index-price">
                        <span>${listing.price.toLocaleString("en-US")}</span> night
                    </div>
                </div>
            </NavLink>
        )
    })

    return (
        <>
            <div className="filtered-listings-index-filter-container">
                <FilterBar />
            </div>
            <div className="filtered-listings-index-container">
                <div className="filtered-listings-index">
                    {listing}
                </div>
                <div className="filtered-listings-map-container">
                    <div className="filtered-listings-map">

                    <FilteredMap listings={locations} />
                    </div>
                </div>
            </div>
        </>

    )
}

export default FilteredIndex;