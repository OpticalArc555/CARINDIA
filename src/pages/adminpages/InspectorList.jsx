import { useNavigate } from "react-router-dom";
// import { Tooltip } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import {
  //   useDeleteDealerMutation,
  useInspectorByIdQuery,
} from "../../services/inspectorapi";
import TableCompoment2 from "../../components/table/TableCompoment2";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { AddInspectorForm } from "../AddInspectorForm";

export default function InspectorList() {
  const [pageNo, setPageNo] = useState(0);
  console.log(pageNo);
  const { data, isLoading, error } = useInspectorByIdQuery();

  //   const [deleteDealer] = useDeleteDealerMutation();

  const navigate = useNavigate();
  if (error?.status === 401) {
    return navigate("/signin");
  }
  console.log(pageNo);
  //   const deleteDealerHandler = async (id) => {
  //     const res = await deleteDealer(id);
  //     console.log(res);
  //   };
  const nextHandler = () => {
    setPageNo((prevPageNo) => {
      // Check if the error status is 404
      if (error?.status === 404) {
        console.log("click");
        console.log(prevPageNo);
        // Display message or perform any action indicating that it's the last page
        console.log("You are on the last page.");
        return prevPageNo; // Keep pageNo unchanged
      } else {
        // Increment pageNo
        return prevPageNo + 1;
      }
    });
  };

 let dealerApiData;
  if (isLoading) {
    return <p>isLoading</p>;
  } else {
    dealerApiData = data.response;
  }
  console.log(dealerApiData);

  const TABLE_HEAD = ["First Name", "Last Name", "Email", "Mobile NO","City","Address"];

  const TABLE_ROWS = [
    {
      firstName: dealerApiData.firstName ,
      lastName: dealerApiData.lastName,
      email: dealerApiData.email,
      mobileno:dealerApiData.mobileNo,
      city:dealerApiData.city,
      address:dealerApiData.address
    },
  ];

  return (
    <>

    {error?.status === 404 ? (
        <div>
           <p className="text-3xl font-semibold ">No Data Available</p>
           <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <AddInspectorForm />
            </div>
            </div>
            ):
            ( 
            <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className=" flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Inspector List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <AddInspectorForm />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <TableCompoment2 TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={TABLE_ROWS} />
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography
            variant="medium"
            color="blue-gray"
            className="font-normal"
          >
            Page {pageNo + 1}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              disabled={pageNo <= 0}
              onClick={() => setPageNo((a) => a - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={nextHandler}
              disabled={data?.list?.length < 10}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>)}
     
    </>
  );
}
