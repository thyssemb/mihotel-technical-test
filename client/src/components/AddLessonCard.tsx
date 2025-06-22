import React from 'react';

const AddLessonCard: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className="
        cursor-pointer
        bg-white
        border
        mt-10
        border-gray-300
        rounded-lg
        shadow-md
        flex
        items-center
        justify-center
        text-xl
        font-semibold
        text-gray-700
        p-6
        transition
        transform
        hover:shadow-xl
        hover:-translate-y-1
        duration-300
        select-none
        "
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' && onClick) onClick();
            }}
        >
            Ajouter une annonce
        </div>
    );
};

export default AddLessonCard;
