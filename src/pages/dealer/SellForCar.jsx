import { useDealerIdByCarQuery } from "../../services/carAPI";
import { Tooltip } from "@material-tailwind/react";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import TableComponent from "../../components/table/TableComponent";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { useCarRemoveMutation } from "../../services/carAPI";
import { MdPendingActions } from "react-icons/md";
import StatusDialogeBox from "../../ui/StatusDialogeBox";
//import AddDealerCar from "../../components/dealer/AddDealerCar";

const SellForCar = () => {
  const [pageNo, setPageNo] = useState(0);
  const { id } = useParams();

  const [carRemove] = useCarRemoveMutation()


  
  
  const { data, isLoading, error } = useDealerIdByCarQuery({ id, pageNo });

  

const deleteDealerHandler=async(carId)=>{
console.log(carId)
const res = await carRemove({id,carId})
console.log(res)
}
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

  
  // eslint-disable-next-line no-unused-vars
  const columns = [
    {
      Header: "ID",
      accessor: "carId",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },

    {
      Header: "Model ",
      accessor: "model",
    },
    {
      Header: "Fuel Type",
      accessor: "fuelType",
    },
    {
      Header: "Year",
      accessor: "year",
    },

    {
      Header: "Price",
      accessor: "price",
      disableSortBy: true,
    },
    {
      Header: "Status",
      accessor: "carStatus",
      Cell: (cell) => {
        console.log(cell.row.values.carStatus);
        return (
          <div>
            <div className="flex gap-2 justify-center items-center  ">
             <StatusDialogeBox status={cell.row.values.carStatus}/>
             </div>
          </div>
        );
      },
    },

    {
      Header: "Edit",
      accessor: "Edit",
      Cell: (cell) => {
        console.log(cell.row.values.carId);
        return (
          <div>
            <div className="flex gap-2 justify-center items-center  ">

            <Link to={`/car/${cell.row.values.carId}/pendinguser`}>
               <div className="w- h-">
                  <MdPendingActions color="#b09b12" className="h-6 w-6" />
               </div>
               
               </Link>
              <Link to={`/carlist/cardetails/${cell.row.values.carId}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  color="blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </Link>

              <Link to={`/dealer/${id}/car/edit/${cell.row.values.carId}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  color="green"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Link>
              <div onClick={() => deleteDealerHandler(cell.row.values.carId)}>
                <Tooltip content="Delete">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    color="red"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </Tooltip>
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  

  let dealerApiData;
  if (isLoading) {
    return <p>isLoading</p>;
  } else {
    dealerApiData = data?.list;
  }
  console.log(dealerApiData);
  const data1 = [
    {
      label: "All Cars",
      value: "html",
      desc: <TableComponent columns={columns} data={dealerApiData} /> ,
    },
    {
      label: "Sold Cars",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },]
  return (
    <>
    {error?.status === 404 ? (
      <div>
        <p>No Data Available</p>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Link to={`/dealer/${id}/addcar`}>
                <Button>Add Car</Button>
              </Link>
            </div>
      </div>
    ):( 
    <div>
      <p>Sell for car</p>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className=" flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Cars list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all cars
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Link to={`/dealer/${id}/addcar`}>
                <Button>Add Car</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        {error ? (
          <p className="text-center">car is not found</p>
        ) : (
          <CardBody className=" px-0">
           
            <Tabs value="html" className="w-full">
      <TabsHeader
        className="bg-transperant "
        indicatorProps={{
          className: "bg-indigo-200 shadow-none !text-black font-bold ",
        }}
      >
        {data1.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data1.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
          </CardBody>
        )}

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
      </Card>
    </div>)}
   
    </>
  );
};

export default SellForCar;
