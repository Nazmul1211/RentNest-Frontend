import React from "react";
import { GetAllUsersData } from "../_action/AdminAction";
import UserListWithFilter from "./UserListWithFilter";

const GetAllUsers = async ({ page = 1 }: { page?: number }) => {
    const users = await GetAllUsersData();

    return <UserListWithFilter users={users || []} page={page} />;
};

export default GetAllUsers;
