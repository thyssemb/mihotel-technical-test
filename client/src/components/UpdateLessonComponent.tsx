import React, { useState } from 'react';

const UpdateLessonComponent: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        subject: '',
        level: '',
        price: '',
        location: '',
        description: '',
    });


    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer bg-white border mt-10 border-gray-300 rounded-lg shadow-md flex items-center justify-center text-lg md:text-xl font-semibold text-gray-700 p-6 transition transform hover:shadow-xl hover:-translate-y-1 duration-300 select-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') setIsModalOpen(true);
                }}
            >
                Update a Lesson
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                        >
                            ✕
                        </button>
                        <h2 className="mb-6 font-extrabold italic uppercase text-black text-3xl md:text-4xl text-center">New Lesson</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                name="subject"
                                placeholder="Subject"
                                value={form.subject}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-base"
                                required
                            />
                            <input
                                name="level"
                                placeholder="Level"
                                value={form.level}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-base"
                                required
                            />
                            <input
                                name="price"
                                type="number"
                                placeholder="Price"
                                value={form.price}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-base"
                                required
                            />
                            <input
                                name="location"
                                placeholder="Location"
                                value={form.location}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-base"
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded text-base"
                                rows={4}
                            />
                            <button
                                type="submit"
                                className="bg-black text-white w-full py-2.5 rounded hover:bg-gray-800 transition text-base font-semibold"
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateLessonComponent;
