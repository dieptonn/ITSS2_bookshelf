"use client";

import { BorrowRequestInterface } from "@/app/models/request";
import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { requestApi } from "@/app/services";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Requestitem: React.FC<{
  request: BorrowRequestInterface;
  updateRequestStatus: (
    requestId: number,
    newStatus: string,
    newBorrowDate: string,
    newRequestDueDate: string,
    newCode: string | null
  ) => void;
}> = ({ request, updateRequestStatus }) => {
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openQr, setOpenQr] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenQr = () => setOpenQr(true);
  const handleCloseQr = () => setOpenQr(false);
  const currentDate = dayjs();
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Thêm '0' trước nếu cần
    const day = date.getDate().toString().padStart(2, "0"); // Thêm '0' trước nếu cần

    return `${year}-${month}-${day}`;
  };

  const [borrowDueDate, setBorrowDueDate] = React.useState<any>();

  const handleDateChange = (date: any) => {
    setBorrowDueDate(date);
    console.log("date", formatDate(date));
  };

  const handleSentBorrowRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await requestApi.SentBorrowRequest(
      request.id,
      formatDate(currentDate),
      formatDate(borrowDueDate)
    );
    console.log("res", res);
    if (res.status === 400) {
      toast.error(res.data);
    } else if (res.status === 200) {
      toast.success(res.data);
      const match = res.data.match(/code is: (\w+)/);
      const code = match ? String(match[1]) : null;
      updateRequestStatus(
        request.id,
        "REQUESTED",
        formatDate(currentDate),
        formatDate(borrowDueDate),
        code
      );
    }
    handleClose();
  };

  const handleDeleteRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await requestApi.DeleteRequest(request.id);
    console.log(res);
    setIsDeleted(true);
    toast.success("Delete Successfully");
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex w-full justify-center items-center flex-col">
            <p className="font-bold text-base">Fill Up the Detail</p>
            <div className="flex w-full flex-col justify-start">
              <p className="font-semibold text-xs my-4">From</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "DatePicker", "DatePicker"]}
                >
                  <DatePicker
                    label={"Borrow Date"}
                    value={currentDate}
                    disabled
                  />
                </DemoContainer>
              </LocalizationProvider>
              <p className="font-semibold text-xs my-4">To</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "DatePicker", "DatePicker"]}
                >
                  <DatePicker
                    onChange={handleDateChange}
                    label={"Request Due Date"}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div
              onClick={(e) => handleSentBorrowRequest(e)}
              className="bg-orange-500 text-sm py-2 px-8 rounded-md text-white cursor-pointer mt-8"
            >
              BORROW
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openQr}
        onClose={handleCloseQr}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex w-full justify-center items-center flex-col my-6">
            <p className="font-semibold text-xl mb-4">Borrow Code</p>
            <Image
              src="/assets/images/qr.png"
              width={88}
              height={88}
              alt="Picture of the author"
              priority
            />
            <p className="font-medium text-xs py-4">Your rental code</p>
            <p className="my-2 text-xl font-bold">{request.code}</p>
            <p className="text-sm text-green-700 py-2">
              Hand this code to the librarian to borrow books
            </p>
            <div
              onClick={() => handleCloseQr()}
              className="bg-orange-500 text-sm py-2 px-10 mt-32 rounded-md text-white cursor-pointer mt-8"
            >
              Close
            </div>
          </div>
        </Box>
      </Modal>
      {!isDeleted && (
        <div className="flex px-8 mb-4 text-gray-700">
          <div className="flex w-10/12 p-4 text-base bg-white rounded-md">
            <div className="w-4/12">
              <div className="flex items-center">
                <Image
                  src="/assets/images/library.png"
                  width={56}
                  height={56}
                  alt="Image of the author"
                  priority
                />
                <div className="ml-4">
                  <Link href={`/request/${request.id}`}>
                    <div>{request.libraryName}</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-2/12 text-center flex justify-center flex-col">
              {request.bookNumber}
            </div>
            <div className="w-2/12 text-center flex justify-center flex-col">
              {request.borrowDate !== null && (
                <span>{formatDate(request.borrowDate)}</span>
              )}
            </div>
            <div className="w-2/12 text-center flex justify-center flex-col">
              {request.borrowDate !== null && (
                <span>{formatDate(request.requestDueDate)}</span>
              )}
            </div>
            <div className="w-2/12 text-center flex items-center justify-center flex-col">
              {request.status}
            </div>
          </div>
          <div className="flex w-2/12 flex justify-center items-center">
            {request.status === "UNSENT" ? (
              <div
                onClick={handleOpen}
                className="bg-teal-600 text-sm py-2 px-4 rounded-md text-white cursor-pointer"
              >
                Borrow
              </div>
            ) : (
              <div className="flex item-center justify-center">
                <div
                  onClick={handleOpenQr}
                  className="flex item-center mr-4 cursor-pointer"
                >
                  <QrCodeScannerIcon sx={{ fontSize: 40 }} />
                </div>
                {(request.status === "UNSENT" ||
                  request.status === "REQUESTED") && (
                  <div
                    onClick={(e) => handleDeleteRequest(e)}
                    className="bg-orange-500 text-sm px-2 flex justify-center items-center rounded-md text-white cursor-pointer"
                  >
                    Cancel
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Requestitem;
