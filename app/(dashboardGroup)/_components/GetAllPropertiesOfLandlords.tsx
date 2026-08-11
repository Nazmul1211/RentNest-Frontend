import React from "react";
import { GetAllLandlordProperties } from "../_action/AdminAction";
import PropertyListWithFilter from "./PropertyListWithFilter";

const GetAllPropertiesOfLandlords = async ({ page = 1 }: { page?: number }) => {
    const properties = await GetAllLandlordProperties();

    return <PropertyListWithFilter properties={properties || []} page={page} />;
};

export default GetAllPropertiesOfLandlords;
