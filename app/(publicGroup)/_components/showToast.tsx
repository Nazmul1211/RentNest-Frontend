"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export const ShowToast = (message: string, isError: boolean) => {
    return (
        <div className="flex flex-wrap gap-2">
            {
                isError && (
                    <Button
                        variant="outline"
                        onClick={() => toast.error(`${message}`)}
                    >
                        Error
                    </Button>
                )
            }

            {
                !isError && (
                    <Button
                        variant="outline"
                        onClick={() => toast.success(`${message}`)}
                    >
                        Success
                    </Button>
                )
            }
        </div>
    )
}

export default ShowToast