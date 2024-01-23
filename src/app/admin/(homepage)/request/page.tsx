"use client";

import Borroweritem from "@/app/components/borroweritem";
import withAdminAuth from "@/app/components/withAdminAuth";
import { UserContext } from "@/app/contexts/UserContext";
import { BorrowerInterface } from "@/app/models/admin";
import { adminApi } from "@/app/services";
import { useContext, useEffect, useState } from "react";

function Request() {
  const [requests, setRequests] = useState<any>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    let res = await adminApi.getAllRequests(user?.libraryId);
    console.log("ress", res);
    setRequests(res?.data || []);
  };
  return (
    <div>
      <p className="px-8 text-lg font-bold">Borrow List</p>

      <div className="flex w-full px-8 pt-8 pb-4 font-medium text-base">
        <div className="w-4/12">Borrower</div>
        <div className="w-2/12 text-center">Book Number</div>
        <div className="w-2/12 text-center">Borrow Date</div>
        <div className="w-2/12 text-center">Request Due Date</div>
        <div className="w-2/12 text-center">Status</div>
      </div>

      {requests?.map((item: BorrowerInterface) => (
        <Borroweritem key={item.id} borrower={item} />
      ))}
    </div>
  );
}
export default withAdminAuth(Request);
