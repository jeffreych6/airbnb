import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as listingsActions from "../../../store/listings";
import * as listingsUtils from "../../../utils/listings_utils"
import ListingImages from "./ListingImages"
import ListingAmenities from "./ListingAmenities"
import ReservationForm from "../../ReservationForm"
import ListingMap from "./ListingMap"
import Reviews from "../../Reviews"
import "./index.css";
import aircover from "../../../assets/aircover.png"

function ListingShowPage() {
    const dispatch = useDispatch();
    const { listingId } = useParams();
    const listing = useSelector(listingsActions.getListing(listingId))

    useEffect(() => {
        dispatch(listingsActions.fetchListing(listingId))
    },[dispatch, listingId])

    if (!listing) {
        return null;
    }

    return (
        <>
            <div className="listing-show-page-container">
                <div className="listing-show-header-container">
                    <h1 className="listing-show-header-title">{listing.title}</h1>
                    <div className="listing-show-header-description">
                        <i className="fa-sharp fa-solid fa-star"></i>
                        <span className="listing-show-rating">{listing.rating} ·</span>
                        <a href="#reviews" className="listing-show-reviews">{listing.numRatings} reviews</a> ·
                        <a href="#map" className="listing-show-location">{listing.city}, {listing.state}, {listing.country}</a>
                    </div>
                </div>

                <ListingImages listingImages = {listing.photosUrl} />

                <div className="listing-show-container">
                    <div className="listing-show-details">
                        <div className="listing-show-details-title-container">
                            <div className="listing-show-details-title">
                                <h1>{listingsUtils.titleize(listing.propertyType)} hosted by {listing.firstName} {listing.lastName}</h1>
                                <h2>{listing.guests} {listing.guests > 1 ? "guests" : "guest"} · {listing.bedrooms} {listing.bedrooms > 1 ? "bedrooms" : "bedroom"} · {listing.beds} {listing.beds > 1 ? "beds" : "bed"} · {listing.baths} {listing.baths > 1 ? "baths" : "bath"}</h2>
                            </div>
                            <img className="listing-show-details-title-profile" src={listing.photoUrl} alt="profile" />
                        </div>

                        <div className="listing-show-aircover">
                            <img src={aircover} alt="aircover" />
                            <h1>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</h1>
                        </div>

                        <div className="listing-show-details-description">{listing.description}</div>

                        <ListingAmenities listing = {listing} />
                    </div>

                    <div className="listing-show-reservations-container">
                        <ReservationForm listing = {listing} />
                    </div>
                </div>

                <div id="reviews" className="listing-show-reviews-container">
                    <Reviews listing = {listing} listingId = {listingId} />
                </div>
                
                <div id="map" className="listing-show-map-container">
                    <h1>Where you'll be</h1>
                    <ListingMap listing = {listing} />
                    <h2>{listing.city}, {listing.state}, {listing.country}</h2>
                </div>
            </div>
        </>
    )
}

export default ListingShowPage;