"use client"

import { Button } from '@/components/ui/button';
import { useState } from 'react';

const HandleOnclickForUserStatusUpdate = ({ userId }: { userId: string }) => {
    const [data, setData] = useState({})

    const handleUpdate = async (userId: string) => {
        return (
            <dialog>
                <form>
                    <label htmlFor="status">Status</label>
                    <select name="status" id="status">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="rejected">Rejected</option>
                        <option value="suspended">Suspended</option>
                        <option value="deleted">Deleted</option>
                    </select>
                    <button type="submit">Update</button>
                </form>
            </dialog>
        )
    }

    return (
        <div className="flex">
            <Button onClick={() => handleUpdate(userId)} variant="outline" className="text-[10px] py-0 px-1.5 font-bold text-amber-600 border-amber-500/30">
                Update
            </Button>
        </div>
    )
}

export default HandleOnclickForUserStatusUpdate