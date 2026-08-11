import React from "react";
import { GetAllTenantRentalRequest, RentalRequest } from "../_action/TenantAction";
import { GetReview } from "../_action/ManageReview";
import TenantRequestListWithFilter from "./TenantRequestListWithFilter";

const GetTenantRentalRequest = async ({ page = 1 }: { page?: number }) => {
    const [rentalRequests, reviewsData] = await Promise.all([
        GetAllTenantRentalRequest(),
        GetReview(""),
    ]);

    const requestsList: RentalRequest[] = rentalRequests || [];
    const reviewsList = Array.isArray(reviewsData) ? reviewsData : [];

    return (
        <TenantRequestListWithFilter
            rentalRequests={requestsList}
            reviewsList={reviewsList}
            page={page}
        />
    );
};

export default GetTenantRentalRequest;
