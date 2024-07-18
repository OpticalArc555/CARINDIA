import { apiSlice } from "./apiSlice";

export const inspectorAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    inspectorById: builder.query({
      query: ({userId}) => ({
        url: `ispProfile/getByUserId?userId=${userId}`,
        transferResponse: console.log(userId),
        method: "GET",
      }),
      providesTags:["Inspector"]
  
       // You probably want providesTags here instead of invalidatesTags for queries
    }),

    getallInspector: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/ispProfile/GetAllInspProfiles?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),

      providesTags:["Inspector"]
       // Same here
    }),

    inspectionReport : builder.mutation ({
      query : ({inspectionData,formDataToSend}) => ({
        url : `/uploadFileBidCar/add?documentType=${inspectionData.documentType}&beadingCarId=${inspectionData.beadingCarId}&doc=${inspectionData.doc}&doctype=${inspectionData.doctype}&subtype=${inspectionData.subtype}&comment=${inspectionData.comment}`,
        transerResponse:console.log(inspectionData,formDataToSend),
        method : "POST",
        body :formDataToSend
      }),
      providesTags:["Inspector"]
    }),

    getInspectionReport : builder.query ({
      query :({beadingCarId ,docType}) => ({
        url : `/uploadFileBidCar/getBidCarIdType?beadingCarId=${beadingCarId}&docType=${docType}`,
        transerResponse:console.log("APi response",beadingCarId, docType),
        method : "GET"
      }),
      invalidatesTags:["Inspector"],
    }),

    inspectorupdate: builder.mutation({
      query: ({id,inspectordata}) => ({
        url: `/ispProfile/update?inspectorProfileId=${id}`,
        transerResponse:console.log("APi response" , inspectordata,id),
        method: 'PATCH',
        body:inspectordata
      }),
      invalidatesTags:["Inspector"],
    }),

    finalInspectionReport : builder.mutation({
      query : ({inspectionData}) => ({
        url:`/inspectionReport/add`,
        method : "POST",
        transerResponse:console.log("APi response",inspectionData),
       body : inspectionData 
      }),
      
    }),

    addBiddingCarWithoutImage : builder.mutation ({
      query : ({formDataToSend1}) => ({
        url : `/uploadFileBidCar/addWithoutPhoto?doc=&doctype=&subtype=&comment=`,
        method : "POST",
        transerResponse:console.log(formDataToSend1),
        body : formDataToSend1
      })
    }),

    finalInspection : builder.query ({
      query : (beadingCarId) => ({
        url : `/inspectionReport/getByBeadingCar?beadingCarId=${beadingCarId}`,
        method : "GET",
        transerResponse:console.log(beadingCarId),
      })
    }),

    // inspectorStatus: builder.mutation({
    //   query: ({ inspectorProfileId, status }) => ({
    //     url: 
    //     `ispProfile/update?inspectorProfileId=${inspectorProfileId}&status=${status}`,
    //    transerResponse:console.log("APi response",inspectorProfileId,status),
    //     method: 'PATCH',
    //   }),
    //   invalidatesTags: ['Inspctor'],
    // }),

  }),
});

export const { useInspectorByIdQuery ,
  useGetallInspectorQuery,
  useGetInspectionReportQuery,
  useInspectionReportMutation,
  useInspectorupdateMutation ,
  useFinalInspectionReportMutation,
useAddBiddingCarWithoutImageMutation,
useFinalInspectionQuery,

 } = inspectorAPI;
