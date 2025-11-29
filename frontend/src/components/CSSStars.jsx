import React, { useEffect, useState } from 'react';
import './CSSStars.css';

export default function CSSStars() {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        // Generate random stars
        const generatedStars = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDelay: Math.random() * 5,
            animationDuration: Math.random() * 3 + 2,
            size: Math.random() * 3 + 1
        }));
        setStars(generatedStars);
    }, []);

    return (
        <div className="css-stars-container">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="css-star"
                    style={{
                        left: `${star.left}%`,
                        animationDelay: `${star.animationDelay}s`,
                        animationDuration: `${star.animationDuration}s`,
                        width: `${star.size}px`,
                        height: `${star.size}px`
                    }}
                />
            ))}
        </div>
    );
}
