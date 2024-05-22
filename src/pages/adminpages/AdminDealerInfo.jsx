
import { useParams } from "react-router-dom"
import { useGetDealerQuery } from "../../services/dealerAPI"
import {
  Card,
  CardHeader,
  CardBody
} from "@material-tailwind/react";

const AdminDealerInfo = () => {
    const {id} = useParams()
    
    const {data,isLoading,isError,error} = useGetDealerQuery(id)
    console.log(isLoading)
    console.log(isError)
    console.log(error)
    console.log(data)

    const {dealerDto:{firstName,lastName,mobileNo,shopName,area,email,city,address}={}} = data || {}
  return (
    <div className=" flex justify-center " >
      <div className="mt-5 ">

        <div>
          <p className="text-4xl font-semibold text-green-800">Dealer Details</p>
        </div>

        <Card className="w-full max-w-[48rem] flex-row mt-10  shadow-md shadow-blue-gray-700">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src="https://www.shutterstock.com/image-photo/smiling-friendly-car-seller-suit-600nw-2105619599.jpg"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
      <table className="table w-full border-collapse border border-gray-200">
        <tbody>
          <tr>
            <th className="px-4 py-2 border border-gray-200 ">First Name</th>
            <td className="px-4 py-2 border border-gray-200">{firstName}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Last Name</th>
            <td className="px-4 py-2 border border-gray-200">{lastName}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Mobile Number</th>
            <td className="px-4 py-2 border border-gray-200">{mobileNo}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Shop Name</th>
            <td className="px-4 py-2 border border-gray-200">{shopName}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Area</th>
            <td className="px-4 py-2 border border-gray-200">{area}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Email</th>
            <td className="px-4 py-2 border border-gray-200">{email}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">City</th>
            <td className="px-4 py-2 border border-gray-200">{city}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border border-gray-200">Address</th>
            <td className="px-4 py-2 border border-gray-200">{address}</td>
          </tr>
        </tbody>
      </table>
      </CardBody>
    </Card>
      </div>
    </div>
  )
}

export default AdminDealerInfo
