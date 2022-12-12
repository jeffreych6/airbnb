import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as reservationsActions from "../../store/reservations";
import "./Reservations.css";

function Reservations() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const reservations = useSelector(state => Object.values(state.reservations))
    
    useEffect(() => {
        dispatch(reservationsActions.fetchReservations())
    },[])

    if (!sessionUser) return <Redirect to="/" />;

    const titleize = (word) => {
        return word[0].toUpperCase() + word.slice(1)
    }

    const reservation = reservations.map((reservation) => {
        return (
            <div className="reservation-container" key={reservation.id}>
                <div className="reservation-detail-container">
                    <div className="reservation-detail-title">
                        <h1>{reservation.title}</h1>
                        <h2>{titleize(reservation.propertyType)} hosted by {reservation.firstName} {reservation.lastName}</h2>
                    </div>
                    <div className="reservation-detail-description">
                        <div className="reservation-detail-description-dates">
                            {reservation.startDate} - {reservation.endDate}
                        </div>
                        <div className="reservation-detail-description-location">
                            <h1>{reservation.state}</h1>
                            <h2>{reservation.country}</h2>
                        </div>
                    </div>
                </div>
                <img src={reservation.photosUrl[0]}></img>
            </div>
        )
    })


    return (
        <div className="reservations-index-container">
            <h1 className="reservations-index-trip-title">
                Trips
            </h1>
            <div className="reservation-index-upcoming-reservations">
                Upcoming reservations
            </div>
            {reservation}
        </div>
    )
}

export default Reservations;