"use client";
import { useContext, useEffect, useState } from "react";
import Action from "@/app/components/action";
import Requestitem from "@/app/components/requestitem";
import { requestApi } from "@/app/services/request-api";
import { BorrowRequestInterface } from "@/app/models/request";
import withUserAuth from "@/app/components/withUserAuth";
import { UserContext } from "@/app/contexts/UserContext";

function Request() {
  const [requests, setRequests] = useState<any>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    let res = await requestApi.getRequestByUser(user?.userId);
    setRequests(res?.data || []);
  };

  const updateRequestStatus = (
    requestId: number,
    newStatus: string,
    newBorrowDate: string,
    newRequestDueDate: string,
    newCode: string | null
  ) => {
    setRequests((prevRequests: any[]) =>
      prevRequests.map((request: BorrowRequestInterface) =>
        request.id === requestId
          ? {
              ...request,
              status: newStatus,
              borrowDate: newBorrowDate,
              requestDueDate: newRequestDueDate,
              code: newCode,
            }
          : request
      )
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-6 pb-4 mx-8">
        <div></div>
        <Action />
      </div>
      <div className="flex justify-between items-center pt-6 pb-4 mx-8">
        <p className=" text-gray-700 text-lg font-semibold">Request list</p>
      </div>
      <div className="flex w-10/12 px-8 pt-8 pb-4 font-medium text-base">
        <div className="w-4/12">Title</div>
        <div className="w-2/12 text-center">Book Number</div>
        <div className="w-2/12 text-center">Borrow Date</div>
        <div className="w-2/12 text-center">Request Due Date</div>
        <div className="w-2/12 text-center">Status</div>
      </div>

      <div>
        {requests?.map((item: BorrowRequestInterface) => (
          <Requestitem
            key={item.id}
            request={item}
            updateRequestStatus={updateRequestStatus}
          />
        ))}
      </div>
    </div>
  );
}
export default withUserAuth(Request);
