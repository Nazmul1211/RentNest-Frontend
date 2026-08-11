import React from "react";
import { GetAllTenantRentalRequests } from "../_action/AdminAction";
import RentalRequestListWithFilter from "./RentalRequestListWithFilter";

const GetAllTenantRentalRequest = async ({ page = 1 }: { page?: number }) => {
    const rentalRequests = await GetAllTenantRentalRequests();

    return <RentalRequestListWithFilter rentalRequests={rentalRequests || []} page={page} />;
};

export default GetAllTenantRentalRequest;
