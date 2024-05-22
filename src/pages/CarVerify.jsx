import { useState } from "react";
import CardUi from "../ui/CardUi";
import { Input, Button } from "@material-tailwind/react";

function CarVerify() {
  const [partName, setPartName] = useState("");
  const [partCondition, setPartCondition] = useState("");

  const handleSubmit = () => {
    const partObject = {
      name: partName,
      condition: partCondition
    };
    console.log("Submitted object:", partObject); 
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <CardUi>
        <div className="min-w-[30rem]">
          <div className="w-full flex justify-center">
            <div className="mt-5 flex flex-col justify-center">
              <div>
                <p className="font-semibold text-[2rem] text-green-800">Car Verify</p>
              </div>
              <div className="mt-5 w-72">
               
                <Input
                  label="Part Name"
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
                />
              </div>
              <div className="mt-5">
               
                <Input
                  label="Part Condition"
                  value={partCondition}
                  onChange={(e) => setPartCondition(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <Button color="green" onClick={handleSubmit} className="items-center text-center">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardUi>
    </div>
  );
}

export default CarVerify;
