// /* eslint-disable react/prop-types */
// import React, { useEffect } from "react";
// import ArgonButton from "../../../components/ArgonButton";
// import * as Yup from "yup";
// import get from "lodash/get";
// import { useFormik, Form, FormikProvider, Field, FieldArray } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { useSnackbar } from "../../../components/ArgonSnackbar";
// import { getUser } from "utils";
// import { getAllCities } from "../../../Redux/Cities/action";
// import { getAllCountry } from "../../../Redux/Country/action";
// import { getAllAmenities } from "../../../Redux/Amenities/action";
// import { getRoomCategoryByUserId } from "../../../Redux/RoomCategory/action";
// import { getRoomByHotelID, updateRoom } from "../../../Redux/Rooms/action";
// import { createBooking, getByHotelIdBooking, updateBooking } from "../../../Redux/Booking/action";
// import { getByIdSettings } from "../../../Redux/UserSetting/action";

// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Slide,
//   Grid,
//   FormControl,
//   Select,
//   MenuItem,
//   Autocomplete,
//   Chip,
//   TextField,
//   FormLabel,
//   Divider,
//   Switch,
// } from "@mui/material";
// import ArgonBox from "../../../components/ArgonBox";
// import ArgonTypography from "../../../components/ArgonTypography";
// import { Add, Delete } from "@mui/icons-material";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const bookingMethods = ["ONLINE", "OFFLINE"];
// const paymentStatusData = ["PENDING", "SUCCESS", "PARTIALLY-PAID"];
// const bookingStatusData = ["CHECK-IN", "CHECKED-OUT", "JUST-CHECKED-OUT", "PENDING", "RESERVED"];
// const relationListData = ["Sibling", "Colleague", "Family", "Friends", "Relatives"];

// export default function AlertDialogSlide({ title, data, color, variant, icon }) {
//   const username = get(getUser().result, "username", "");
//   const dispatch = useDispatch();
//   const { customSnackbar } = useSnackbar();
//   const { readAllCities, citiesState } = useSelector((state) => state.citiesReducer);
//   const { readAllCountries, countryState } = useSelector((state) => state.countriesReducer);
//   const { amenitiesList, amenitiesState } = useSelector((state) => state.amenitiesReducer);
//   const { categoryByUserId, roomCategoryState } = useSelector((state) => state.roomCategoryReducer);
//   const { roomByHotelID, roomState } = useSelector((state) => state.roomReducer);
//   const { getsSettingByLinkedId, settingState } = useSelector((state) => state.userSettingReducer);

//   const [state, setState] = React.useState(false);
//   const handleSwitch = (event) => {
//     setState(event.target.checked);
//   };
//   const [open, setOpen] = React.useState(false);
//   const handleClickOpen = () => {setOpen(true) };
//   const handleClose = () => {setOpen(false)};

//   useEffect(() => {
//     dispatch(getAllCities());
//     dispatch(getAllCountry());
//     dispatch(getAllAmenities());
//     dispatch(getRoomCategoryByUserId(username));
//     dispatch(getRoomByHotelID(username));
//     dispatch(getByIdSettings(username));
//   }, [dispatch]);

//   const settingDetails = get(getsSettingByLinkedId.result, "[0]", {});

//   console.log(settingDetails, "settingDetails");

//   const previl = amenitiesState === 2 ? amenitiesList.result.map((item) => item.title) : [];

//   const UserSchema = Yup.object().shape({
//     fullName: Yup.string().required("fullName is required"),
//     email: Yup.string().required("email is required"),
//     phoneNumber: Yup.number().required("phoneNumber is required"),
//     nationality: Yup.string().required("nationality name is required"),
//     hotelId: Yup.string().required("hotelId is required"),
//     roomCategory: Yup.string().required("roomCategory is required"),
//     checkIn: Yup.string().required("checkIn is required"),
//     checkOut: Yup.string().required("checkOut is required"),
//     numberOfRooms: Yup.number().required("numberOfRooms is required"),
//     dateOfBirth: Yup.string().required("dateOfBirth is required"),
//     purpoes: Yup.string("purpoes is required"),
//     relation: Yup.string().required("relation is required"),
//     status: Yup.string().required("status is required"),
//     paymentStatus: Yup.string().required("paymentStatus is required"),
//     bookingMethod: Yup.string().required("bookingMethod is required"),
//     address: Yup.object().shape({
//       country: Yup.string().required("Country is required"),
//       city: Yup.string().required("City is required"),
//       location: Yup.string().required("Location is required"),
//     }),
//     numberOfGuest: Yup.object().shape({
//       adult: Yup.number().required("adult is required"),
//       child: Yup.number().required("child is required"),
//       total: Yup.number().required("total is required"),
//     }),
//     aminities: Yup.array().min(1, "At least one aminities is required"),
//     rooms: Yup.array().min(1, "At least one room is required"),
//     guests: Yup.array()
//       .of(
//         Yup.object({
//           name: Yup.string(),
//           age: Yup.number(),
//           gender: Yup.string(),
//           dob: Yup.date(),
//         })
//       )
//       .required(),
//   });

//   const formik = useFormik({
//     initialValues: {
//       fullName: title === "Add" ? "" : get(data, "fullName", ""),
//       email: title === "Add" ? "" : get(data, "email", ""),
//       phoneNumber: title === "Add" ? "" : get(data, "phoneNumber", "").toString(),
//       nationality: title === "Add" ? "" : get(data, "nationality", ""),
//       hotelId: title === "Add" ? username : get(data, "hotelId", ""),
//       roomCategory: title === "Add" ? "" : get(data, "roomCategory"),
//       checkIn: title === "Add" ? "" : get(data, "checkIn", ""),
//       checkOut: title === "Add" ? "" : get(data, "checkOut", ""),
//       numberOfRooms: title === "Add" ? "" : get(data, "numberOfRooms", "").toString(),
//       dateOfBirth: title === "Add" ? "" : get(data, "dateOfBirth", ""),
//       purpoes: title === "Add" ? "" : get(data, "purpoes", ""),
//       relation: title === "Add" ? "" : get(data, "relation"),
//       status: title === "Add" ? "PENDING" : get(data, "status"),
//       bookingMethod: title === "Add" ? "OFFLINE" : get(data, "bookingMethod"),
//       paymentStatus: title === "Add" ? "PENDING" : get(data, "paymentStatus"),
//       aminities: title === "Add" ? [] : get(data, "aminities"),
//       rooms: title === "Add" ? [] : get(data, "rooms"),
//       // rooms: rooms,
//       address: {
//         country: title === "Add" ? "" : get(data, "address.country", ""),
//         city: title === "Add" ? "" : get(data, "address.city", ""),
//         location: title === "Add" ? "" : get(data, "address.location", ""),
//       },
//       numberOfGuest: {
//         adult: title === "Add" ? "" : get(data.numberOfGuest, "adult", "").toString(),
//         child: title === "Add" ? "" : get(data.numberOfGuest, "child", "").toString(),
//         total: title === "Add" ? "" : get(data.numberOfGuest, "total", "").toString(),
//       },
//       guests:
//         title === "Add"
//           ? [{ name: "", age: "", gender: "", dob: "" }]
//           : get(data, "guests", [{ name: "", age: "", gender: "", dob: "" }]),
//      rooms:
//         title === "Add"
//           ? [{ _id: "", roomNumber: "" }]
//           : get(data, "rooms", [{ _id: "", roomNumber: "" }]),

//     },

//     enableReinitialize: true,
//     validationSchema: UserSchema,
//     onSubmit: async (values) => {
//       if (title === "Add") {
//         await createHandler(values);
//       } else {
//         await updateHandler(values);
//       }
//     },
//   });

//   const { errors, touched, handleSubmit, getFieldProps, values } = formik;


//   const filteredRooms =
//     roomState === 2 &&
//     roomByHotelID.result !== undefined &&
//     roomByHotelID.result.filter(
//       (room) =>
//         room.allotmentStatus === false &&
//         room.roomStatus !== "RESERVED" &&
//         room.roomStatus !== "BOOKED"
//     );


//   const fRooms = filteredRooms && Array.isArray(filteredRooms) ? filteredRooms : [];

//   const filteredData = fRooms.filter((row) =>
//     Object.values(row).some(
//       (value) =>
//         typeof value === "string" &&
//         value.toLowerCase().includes(formik.values.roomCategory.toLowerCase())
//     )
//   );

//   const roomOptions = filteredData.map(room => ({
//     _id: room._id,
//     roomNumber: room.roomNumber
//   }));
  
//   const updateHandler = async (values) => {
//     const res = await dispatch(updateBooking(values, data._id));
//     const status = get(res, "value.status");
//     if (status === 200) {
//       dispatch(getByHotelIdBooking(username));
//       customSnackbar({
//         snackbarStatus: true,
//         color: "success",
//         message: get(res.value.data, "message", "Done"),
//       });
//       updateAllRooms(values.rooms);
//       window.location.reload();
//       setOpen(false);
//     } else {
//       customSnackbar({
//         snackbarStatus: true,
//         color: "error",
//         message: get(res, "message", "Done"),
//       });
//     }
//   };

//   const createHandler = async (values) => {
//     const res = await dispatch(createBooking(values));
//     const status = get(res, "value.status");
//     if (status === 200) {
//       dispatch(getByHotelIdBooking(username));
//       customSnackbar({
//         snackbarStatus: true,
//         color: "success",
//         message: get(res.value.data, "message", "Done"),
//       });
//       window.location.reload();
//       updateAllRooms(values.rooms);
//       setOpen(false);
//     } else {
//       customSnackbar({
//         snackbarStatus: true,
//         color: "error",
//         message: "Room not alloted !",
//       });
//     }
//   };

//   const formikdata = formik.values;

//   // status with payment
//   const defaultStatus = { allotmentStatus: false, roomStatus: "PENDING" };
//   const statusMappingincludingPayment = {
//     PENDING: {
//       PENDING: { allotmentStatus: false, roomStatus: "PENDING" },
//       RESERVED: { allotmentStatus: false, roomStatus: "PENDING" },
//     },
//     "PARTIALLY-PAID": {
//       RESERVED: { allotmentStatus: true, roomStatus: "RESERVED" },
//       "CHECK-IN": { allotmentStatus: true, roomStatus: "BOOKED" },
//     },
//     SUCCESS: {
//       "CHECK-IN": { allotmentStatus: true, roomStatus: "BOOKED" },
//       RESERVED: { allotmentStatus: true, roomStatus: "RESERVED" },
//       "JUST-CHECKED-OUT": { allotmentStatus: true, roomStatus: "INSPECTION" },
//       "CHECKED-OUT": { allotmentStatus: false, roomStatus: "VACANT" },
//     },
//   };

//   const updatedStatuses =
//     (statusMappingincludingPayment[formikdata.paymentStatus] &&
//       statusMappingincludingPayment[formikdata.paymentStatus][formikdata.status]) ||
//     defaultStatus;

//   const valuesIncludingPayment = {
//     allotmentStatus: updatedStatuses.allotmentStatus,
//     roomStatus: updatedStatuses.roomStatus,
//   };

//   // status without payment

//   const statusMappingWithoutPayment = {
//     "CHECK-IN": { allotmentStatus: true, roomStatus: "BOOKED" },
//     RESERVED: { allotmentStatus: true, roomStatus: "RESERVED" },
//     PENDING: { allotmentStatus: false, roomStatus: "PENDING" },
//     "CHECKED-OUT": { allotmentStatus: false, roomStatus: "VACANT" },
//     "JUST-CHECKED-OUT": { allotmentStatus: true, roomStatus: "INSPECTION" },
//   };

//   const valueWithoutPayment = statusMappingWithoutPayment[formikdata.status] || {
//     allotmentStatus: false,
//     roomStatus: "VACANT",
//   };

//   const finalValue =
//     settingDetails.paymentControlWhileBooking === true
//       ? valuesIncludingPayment
//       : valueWithoutPayment;

//   const updateAllRooms = async (roomss) => {
//     for (const room of roomss) {
//       await updateRoomHandler(room);
//     }
//   };

//   // change room status

//   const updateRoomHandler = async (room) => {
//     const res = await dispatch(updateRoom(finalValue, room._id));
//     const status = get(res, "value.status");
//     if (status === 200) {
//       dispatch(getRoomByHotelID(username));
//       customSnackbar({
//         snackbarStatus: true,
//         color: "success",
//         message: get(res.value.data, "message", "Done"),
//       });
//     } else {
//       customSnackbar({
//         snackbarStatus: true,
//         color: "error",
//         message: get(res, "message", "Done"),
//       });
//     }
//   };

//   return (
//     <React.Fragment>
//       <ArgonButton
//         size="small"
//         onClick={handleClickOpen}
//         color={color}
//         variant={variant}
//         startIcon={icon}
//       >
//         {title}
//       </ArgonButton>

//       <Dialog
//         open={open}
//         TransitionComponent={Transition}
//         maxWidth="lg"
//         onClose={handleClose}
//       >
//         <DialogTitle >{title} Booking</DialogTitle>
//         <DialogContent>
//           <FormikProvider value={formik}>
//             <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
//               <Grid container style={{ padding: "1rem" }} spacing={2}>
//                 {title === "Update" ? (
//                   <>
//                     <Grid item lg={12} xs={12}>
//                       <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                         Status
//                       </FormLabel>
//                     </Grid>
//                     <Grid item lg={4} xs={12}>
//                       <FormControl fullWidth size="large">
//                         <Field
//                           as={Select}
//                           placeholder="bookingMethod"
//                           {...getFieldProps("bookingMethod")}
//                           error={Boolean(touched.bookingMethod && errors.bookingMethod)}
//                           helperText={touched.bookingMethod && errors.bookingMethod}
//                         >
//                           <MenuItem disabled value="">
//                             <em>Booking Method</em>
//                           </MenuItem>
//                           {bookingMethods.map((data) => (
//                             <MenuItem key={data} value={data}>
//                               {data}
//                             </MenuItem>
//                           ))}
//                         </Field>
//                       </FormControl>
//                     </Grid>
//                     <Grid item lg={4} xs={12}>
//                       <FormControl fullWidth size="large">
//                         <Field
//                           as={Select}
//                           placeholder={"paymentStatus"}
//                           {...getFieldProps("paymentStatus")}
//                           error={Boolean(touched.paymentStatus && errors.paymentStatus)}
//                           helperText={touched.paymentStatus && errors.paymentStatus}
//                         >
//                           <MenuItem disabled value="">
//                             <em>Payment Status</em>
//                           </MenuItem>
//                           {paymentStatusData.map((data) => (
//                             <MenuItem key={data} value={data}>
//                               {data}
//                             </MenuItem>
//                           ))}
//                         </Field>
//                       </FormControl>
//                     </Grid>

//                     <Grid item lg={4} xs={12}>
//                       <FormControl fullWidth size="large">
//                         <Field
//                           as={Select}
//                           placeholder="status"
//                           {...getFieldProps("status")}
//                           error={Boolean(touched.status && errors.status)}
//                           helperText={touched.status && errors.status}
//                         >
//                           <MenuItem disabled value="">
//                             <em>Booking Status</em>
//                           </MenuItem>
//                           {bookingStatusData.map((data) => (
//                             <MenuItem key={data} value={data}>
//                               {data}
//                             </MenuItem>
//                           ))}
//                         </Field>
//                       </FormControl>
//                     </Grid>
//                   </>
//                 ) : (
//                   ""
//                 )}

//                 <Grid item lg={4} xs={12}>
//                   <Grid item lg={12} xs={12}>
//                     <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                       Room Category
//                     </FormLabel>
//                   </Grid>
//                   <FormControl fullWidth size="large">
//                     <Field
//                       as={Select}
//                       placeholder="roomCategory"
//                       {...getFieldProps("roomCategory")}
//                       error={Boolean(touched.roomCategory && errors.roomCategory)}
//                       helperText={touched.roomCategory && errors.roomCategory}
//                     >
//                       <MenuItem disabled value="">
//                         <em>Room Category</em>
//                       </MenuItem>
//                       {roomCategoryState === 2 &&
//                         categoryByUserId.result !== undefined &&
//                         categoryByUserId.count !== 0 &&
//                         categoryByUserId.result.map((data) => (
//                           <MenuItem key={data._id} value={data.title}>
//                             {data.title}
//                           </MenuItem>
//                         ))}
//                     </Field>
//                   </FormControl>
//                 </Grid>

//                 <Grid item lg={6} xs={12}>
//                   <Grid item xs={12} lg={12}>
//                     <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                       Allot room now?
//                     </FormLabel>
//                   </Grid>
//                   <Switch checked={state} onChange={handleSwitch} value={state} />
//                 </Grid>

//                 <Grid item container lg={12} xs={12}>
//                   <Grid item xs={12} lg={12}>
//                     <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                       Room Availability Status
//                     </FormLabel>
//                   </Grid>

//                   {filteredData.map((roomd) => (
//                     <Grid
//                       key={roomd._id}
//                       item
//                       container
//                       lg={5}
//                       xs={12}
//                       style={{
//                         padding: ".5rem",
//                         margin: ".25rem",
//                         backgroundColor: "#CED4DA",
//                         borderRadius: ".25rem",
//                       }}
//                     >
//                       <Grid item lg={5} xs={5}>
//                         <ArgonTypography
//                           style={{ fontSize: ".65rem", fontWeight: "600"}}
//                         >
//                           Room Number: {roomd.roomNumber}
//                         </ArgonTypography>
//                       </Grid>
//                       <Grid item lg={5} xs={5}>
//                         <ArgonTypography
//                           style={{ fontSize: ".65rem", fontWeight: "600"}}
//                         >
//                           Room Status: {roomd.roomStatus}
//                         </ArgonTypography>
//                       </Grid>
//                     </Grid>
//                   ))}
//                 </Grid>

//                 {/* it ends up here */}
//                 <Grid item lg={2} xs={6}>
//                   <Grid item lg={12} xs={12}>
//                     <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                       Number of Rooms
//                     </FormLabel>
//                   </Grid>
//                   <Field
//                     as={TextField}
//                     fullWidth
//                     placeholder={"numberOfRooms"}
//                     type="text"
//                     {...getFieldProps("numberOfRooms")}
//                     error={Boolean(touched.numberOfRooms && errors.numberOfRooms)}
//                     helperText={touched.numberOfRooms && errors.numberOfRooms}
//                   />
//                 </Grid>


//                 {state === true ? (
//                   <Grid item lg={5} xs={12}>
//                     <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                       Rooms
//                     </FormLabel>
//                     {roomState === 2 && roomByHotelID.count !== 0 && (
//                        <Field name="rooms">
//                             {({ field, form }) => (
//                               <Autocomplete
//                                 multiple
//                                 value={formik.values.rooms}
//                                 onChange={(event, newValue) => {
//                                   form.setFieldValue(field.name, newValue);
//                                 }}
//                                 options={roomOptions}
//                                 getOptionLabel={(option) => option.roomNumber}
//                                 renderTags={(tagValue, getTagProps) =>
//                                   tagValue.map((option, index) => (
//                                     <Chip key={option._id} label={option.roomNumber} {...getTagProps({ index })} />
//                                   ))
//                                 }
//                                 renderInput={(params) => <TextField {...params} placeholder="Rooms" />}
//                               />
//                             )}
//                      </Field>
//                     )}
//                   </Grid>
//                 ) : (
//                   ""
//                 )}

//                 <Grid item lg={5} xs={12}>
//                   <Grid item lg={12} xs={12}>
//                     <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                       Amenities
//                     </FormLabel>
//                   </Grid>
//                   {amenitiesState === 2 && amenitiesList.count !== 0 && (
//                       <Field name="aminities">
//                             {({ field, form }) => (
//                               <Autocomplete
//                                 multiple
//                                 value={formik.values.aminities}
//                                 onChange={(event, newValue) => {
//                                   form.setFieldValue(field.name, newValue);
//                                 }}
//                                 options={previl}
//                                 getOptionLabel={(option) => option}
//                                 renderTags={(tagValue, getTagProps) =>
//                                   tagValue.map((option, index) => (
//                                     <Chip key={option} label={option} {...getTagProps({ index })} />
//                                   ))
//                                 }
//                                 renderInput={(params) => <TextField {...params} placeholder="Amenities" />}
//                               />
//                             )}
//                           </Field>
//                   )}
//                 </Grid>

//                 <Grid item lg={12} xs={12}>
//                   <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                     Address Details
//                   </FormLabel>
//                 </Grid>
//                 <Grid item lg={4} xs={12}>
//                   <FormControl fullWidth size="large">
//                     <Field
//                       as={Select}
//                       placeholder={"country"}
//                       {...getFieldProps("address.country")}
//                     >
//                       <MenuItem disabled value="">
//                         <em>Country Name</em>
//                       </MenuItem>
//                       {countryState === 2 &&
//                         readAllCountries.count !== 0 &&
//                         readAllCountries.result.map((data) => (
//                           <MenuItem key={data._id} value={data.title}>
//                             {data.title}
//                           </MenuItem>
//                         ))}
//                     </Field>
//                   </FormControl>
//                 </Grid>
//                 <Grid item lg={4} xs={12}>
//                   <FormControl fullWidth size="large">
//                     <Field
//                       as={Select}
//                       placeholder="address.country"
//                       {...getFieldProps("address.city")}
//                     >
//                       <MenuItem disabled value="">
//                         <em>City Name</em>
//                       </MenuItem>
//                       {citiesState === 2 &&
//                         readAllCities.count !== 0 &&
//                         readAllCities.result
//                           .filter((cityData) => cityData.country === formik.values.address.country)
//                           .map((data) => (
//                             <MenuItem key={data._id} value={data.title}>
//                               {data.title}
//                             </MenuItem>
//                           ))}
//                     </Field>
//                   </FormControl>
//                 </Grid>
//                 <Grid item lg={4} xs={12}>
//                   <Field
//                     as={TextField}
//                     fullWidth
//                     placeholder={"location"}
//                     type="text"
//                     {...getFieldProps("address.location")}
//                   />
//                 </Grid>

//                 {["email", "fullName", "phoneNumber", "nationality", "purpoes"].map((field) => (
//                   <Grid item lg={4} xs={12} key={field}>
//                     <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                       {field}
//                     </FormLabel>
//                     <Field
//                       as={TextField}
//                       fullWidth
//                       placeholder={field}
//                       type="text"
//                       {...getFieldProps(field)}
//                       error={Boolean(touched[field] && errors[field])}
//                       helperText={touched[field] && errors[field]}
//                     />
//                   </Grid>
//                 ))}

//                 <Grid item lg={4} xs={12}>
//                   <Grid item lg={12} xs={12}>
//                     <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                       Date of Birth
//                     </FormLabel>
//                   </Grid>
//                   <Field
//                     as={TextField}
//                     placeholder={"dateOfBirth"}
//                     type="date"
//                     {...getFieldProps("dateOfBirth")}
//                     error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
//                     helperText={touched.dateOfBirth && errors.dateOfBirth}
//                   />
//                 </Grid>
//                 <Grid item lg={4} xs={12}>
//                   <Grid item lg={12} xs={12}>
//                     <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                       Relation With Remaining Guests
//                     </FormLabel>
//                   </Grid>
//                   <FormControl fullWidth size="large">
//                     <Field
//                       as={Select}
//                       placeholder="relation"
//                       {...getFieldProps("relation")}
//                       error={Boolean(touched.relation && errors.relation)}
//                       helperText={touched.relation && errors.relation}
//                     >
//                       <MenuItem disabled value="">
//                         <em>Relations</em>
//                       </MenuItem>
//                       {relationListData.map((data) => (
//                         <MenuItem key={data} value={data}>
//                           {data}
//                         </MenuItem>
//                       ))}
//                     </Field>
//                   </FormControl>
//                 </Grid>
//                 {["checkIn", "checkOut"].map((field) => (
//                   <Grid item lg={3} xs={6} md={4} key={field}>
//                     <Grid item lg={12} xs={12}>
//                       <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                         {field}
//                       </FormLabel>
//                     </Grid>
//                     <Field
//                       as={TextField}
//                       placeholder={field}
//                       size="medium"
//                       type="date"
//                       {...getFieldProps(field)}
//                       error={Boolean(touched[field] && errors[field])}
//                       helperText={touched[field] && errors[field]}
//                     />
//                   </Grid>
//                 ))}
//                 <Grid item lg={12} xs={12}>
//                   <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                     Guest Details Please
//                   </FormLabel>
//                 </Grid>
//                 <Grid item lg={3} xs={3}>
//                   <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                     Full Name
//                   </FormLabel>
//                 </Grid>
//                 <Grid item lg={2} xs={2}>
//                   <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                     Age
//                   </FormLabel>
//                 </Grid>
//                 <Grid item lg={2} xs={2}>
//                   <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                     Gender
//                   </FormLabel>
//                 </Grid>
//                 <Grid item lg={3} xs={3}>
//                   <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                     DOB
//                   </FormLabel>
//                 </Grid>
//                 <Grid item lg={2} xs={2}>
//                   <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                     Action
//                   </FormLabel>
//                 </Grid>
//                 <Divider />
//                 <Grid item lg={12} xs={12}>
//                   <FieldArray name="guests">
//                     {({ push, remove }) => (
//                       <ArgonBox>
//                         {values.guests.map((guest, index) => (
//                           <Grid container spacing={2} key={index} mb={1}>
//                             <Grid item xs={12} sm={3}>
//                               <Field
//                                 name={guests.${index}.name}
//                                 as={TextField}
//                                 placeholder="Name"
//                                 fullWidth
//                                 error={
//                                   touched.guests?.[index]?.name && !!errors.guests?.[index]?.name
//                                 }
//                                 helperText={
//                                   touched.guests?.[index]?.name && errors.guests?.[index]?.name
//                                 }
//                               />
//                             </Grid>
//                             <Grid item xs={12} sm={2}>
//                               <Field
//                                 name={guests.${index}.age}
//                                 as={TextField}
//                                 placeholder="Age"
//                                 fullWidth
//                                 error={
//                                   touched.guests?.[index]?.age && !!errors.guests?.[index]?.age
//                                 }
//                                 helperText={
//                                   touched.guests?.[index]?.age && errors.guests?.[index]?.age
//                                 }
//                               />
//                             </Grid>
//                             <Grid item xs={12} sm={2}>
//                               <Field
//                                 name={guests.${index}.gender}
//                                 as={TextField}
//                                 placeholder="Gender"
//                                 select
//                                 fullWidth
//                                 error={
//                                   touched.guests?.[index]?.gender &&
//                                   !!errors.guests?.[index]?.gender
//                                 }
//                                 helperText={
//                                   touched.guests?.[index]?.gender && errors.guests?.[index]?.gender
//                                 }
//                               >
//                                 <MenuItem value="Male">Male</MenuItem>
//                                 <MenuItem value="Female">Female</MenuItem>
//                                 <MenuItem value="Other">Other</MenuItem>
//                               </Field>
//                             </Grid>
//                             <Grid item xs={12} sm={3}>
//                               <Field
//                                 name={guests.${index}.dob}
//                                 as={TextField}
//                                 placeholder="Date of Birth"
//                                 type="date"
//                                 InputLabelProps={{ shrink: true }}
//                                 fullWidth
//                                 error={
//                                   touched.guests?.[index]?.dob && !!errors.guests?.[index]?.dob
//                                 }
//                                 helperText={
//                                   touched.guests?.[index]?.dob && errors.guests?.[index]?.dob
//                                 }
//                               />
//                             </Grid>
//                             <Grid item xs={12} sm={1}>
//                               <ArgonButton
//                                 size="small"
//                                 color="warning"
//                                 onClick={() => remove(index)}
//                               >
//                                 <Delete />
//                               </ArgonButton>
//                             </Grid>
//                           </Grid>
//                         ))}
//                         <ArgonButton
//                           size="small"
//                           color="info"
//                           onClick={() => push({ name: "", age: "", gender: "", dob: "" })}
//                         >
//                           <Add />
//                         </ArgonButton>
//                       </ArgonBox>
//                     )}
//                   </FieldArray>
//                 </Grid>
//                 {["numberOfGuest.adult", "numberOfGuest.child", "numberOfGuest.total"].map(
//                   (field) => (
//                     <Grid item lg={4} xs={12} md={4} key={field}>
//                       <FormLabel style={{ fontSize: ".65rem", fontWeight: "600"}}>
//                         {field.split(".").pop()}
//                       </FormLabel>
//                       <Field
//                         fullWidth
//                         as={TextField}
//                         placeholder={field.split(".").pop()}
//                         type="text"
//                         {...getFieldProps(field)}
//                         error={Boolean(touched[field] && errors[field])}
//                         helperText={touched[field] && errors[field]}
//                       />
//                     </Grid>
//                   )
//                 )}
//               </Grid>
//             </Form>
//           </FormikProvider>
//         </DialogContent>
//         <DialogActions>
//           <ArgonButton onClick={handleClose}>Cancel</ArgonButton>
//           <ArgonButton onClick={handleSubmit}>{title === "Add" ? "Create" : "Update"}</ArgonButton>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }