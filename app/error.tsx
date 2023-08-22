"use client"
import Error from "@/components/ui/error/Error";

const RootErrorPage = ({
    error,
    reset,
} : {
    error: Error,
    reset: () => void
}) => {
    return <Error reset={reset} />
}

export default RootErrorPage;