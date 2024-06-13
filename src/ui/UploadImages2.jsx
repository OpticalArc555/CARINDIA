import Exterior from "./Exterior";
import Interior from "./Interior";
import Tyre from "./Tyre";
import Features from "./Features";
import Engine from "./Engine";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function UploadImages() {
  const navigate = useNavigate()
   
  const previousPage = () => {
    navigate(-2)
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center align-middle min-h-screen">
        <div>
          <Exterior />
        </div>
        <div className="mt-5">
          <Interior />
        </div>

        <div className="mt-5">
          <Tyre />
        </div>

        <div className="mt-5">
          <Features />
        </div>

        <div className="mt-5">
          <Engine />
        </div>
        <div className="mt-5">
          <Button onClick={previousPage}>Previous page</Button>
        </div>
      </div>
    </>
    // </div>
  );
}
