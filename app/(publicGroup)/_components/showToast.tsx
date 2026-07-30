"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export default function showToast({ message }: { message: string }) {
    return (
        <div className="flex flex-wrap gap-2">
            <Button
                variant="outline"
                onClick={() => toast.success(`${message}`)}
            >
                Success
            </Button>

            <Button
                variant="outline"
                onClick={() => toast.error(`${message}`)}
            >
                Error
            </Button>
        </div>
    )
}
