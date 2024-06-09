import UserCardPendingRequest from "../components/userRequest/UserCardPendingRequest";
import { useUserAllCarRequestQuery } from "../services/carAPI";
import { useParams } from "react-router-dom";
const PendingRequest = () => {
  const {userid} = useParams()
  const page = 0;
  console.log(userid)
  const { data, isLoading, error } = useUserAllCarRequestQuery({page,userid});
  console.log(data?.list);
  const renderData = data?.list.map((item, index) => {
    console.log(item)
    return (
      <div key={index} className="mt-5">
        <UserCardPendingRequest item = {item} />
      </div>
    );
  });
  if (isLoading) {
    return <p>isLoading</p>;
  }
  if (error) {
    console.log(error);
  }
  return (
    <>

      {renderData}
    </>
  );
};

export default PendingRequest;
