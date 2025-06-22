import React from "react";
import Layouts from "./layouts/Layouts.tsx";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
    return (
        <Layouts>
            <HomePage />
        </Layouts>
    );
};

export default App;
