import React from 'react';

const RestaurantFeedback = () => {
    return (
        <div className="feedback-form">
            <h2>Restaurant Feedback</h2>
            <form>
                {/* Form fields for restaurant feedback */}
                <label>Rating:</label>
                <input type="number" min="1" max="5" />
                <label>Comments:</label>
                <textarea></textarea>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default RestaurantFeedback;
