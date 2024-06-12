import {
    Card
  } from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
const CardUi = ({children}) => {
  return (
    <Card className="p-0 md:p-5 w-fit ">
      {children}
    </Card>
  )
}

export default CardUi
