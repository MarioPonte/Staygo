'use client';

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface Error404StateProps {
    error: Error;
}

const Error404State: React.FC<Error404StateProps> = ({
    error
}) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <EmptyState
            title="Uh Oh"
            subtitle="Page not found!"
        />
    )
}

export default Error404State;