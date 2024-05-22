import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export function AccordionCustom() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="container mx-auto mt-[5rem]">
      <div className="text-2xl md:text-4xl md:text-center ">
        {" "}
        Frequently Asked Question{" "}
      </div>
      <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
        <AccordionHeader
          className="text-lg md:text-xl "
          onClick={() => handleOpen(1)}
        >
          When and Where can I take a test drive?
        </AccordionHeader>
        <AccordionBody className="text-sm md:text-xl">
          You can schedule a home test drive for this Autocar assured car at any
          date and time you find convenient using our test drive booking
          form.Your assigned Autocar Relationship Manager will then reach out to
          you and make sure all the details of your preferred car are made
          available to you before arriving at your home on the selected date &
          time for the test drive.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} animate={CUSTOM_ANIMATION}>
        <AccordionHeader
          className="text-lg md:text-xl "
          onClick={() => handleOpen(2)}
        >
          What benefits CarsForum give us?
        </AccordionHeader>
        <AccordionBody className="text-sm md:text-xl">
          Accessing helpful tips and advice on maintaining a second hand car.
          hassle-free-trade-in program for your current vehicle.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} animate={CUSTOM_ANIMATION}>
        <AccordionHeader
          className="text-lg md:text-xl "
          onClick={() => handleOpen(3)}
        >
          How do I book a car of my choice?
        </AccordionHeader>
        <AccordionBody className="text-sm md:text-xl">
          You can book a car. If you complete the purchase of the vehicle within
          the holding period, the deposit will be applied towards the purchase
          otherwise the booking amount will be refunded back to you and the
          booking cancelled.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4} animate={CUSTOM_ANIMATION}>
        <AccordionHeader
          className="text-lg md:text-xl "
          onClick={() => handleOpen(4)}
        >
          Is replacement option is available?
        </AccordionHeader>
        <AccordionBody className="text-sm md:text-xl">
          Absolutely yes, replacement option is available and
          hassle-free-trade-in program for your current vehicle.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 5} animate={CUSTOM_ANIMATION}>
        <AccordionHeader
          className="text-lg md:text-xl "
          onClick={() => handleOpen(5)}
        >
          Will CarsForum give us history of vehicle?
        </AccordionHeader>
        <AccordionBody className="text-sm md:text-xl">
          Yes, We Verify important details such as ownership history, accident
          records, and maintenance records.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 6} animate={CUSTOM_ANIMATION}>
        <AccordionHeader
          className="text-lg md:text-xl "
          onClick={() => handleOpen(6)}
        >
          Will CarsForum help me with car finance?
        </AccordionHeader>
        <AccordionBody className="text-sm md:text-xl">
          Absolutely, buyers can choose to avail financing through Autocar
          wherein we would get the loan processed through our finance partners.
          Our established partnerships help us process loans faster and get our
          customers better interest rates. Depending on your credit worthiness,
          you can avail used car loans through Autocar at interest rates as low
          as 12.99% compared to the market rates of 14-16%.{" "}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 7} animate={CUSTOM_ANIMATION}>
        <AccordionHeader
          className="text-lg md:text-xl "
          onClick={() => handleOpen(7)}
        >
          Will CarsForum Give us extended warrenty?
        </AccordionHeader>
        <AccordionBody className="text-sm md:text-xl">
          Protect your investment with our extended warranty options. Get peace
          of mind knowing that your second-hand car is covered against
          unexpected repairs.
        </AccordionBody>
      </Accordion>
    </div>
  );
}
