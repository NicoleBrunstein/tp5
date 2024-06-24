import express from"express";
import cors from"cors";
import ProvinceController from "./src/controllers/province-controller.js";
//import ProvinceRouter from "./src/repositories/province-repository.js";
//import event_categoriesRouter from "./src/repositories/event_categories-repository.js";
//import locationRouter from "./src/repositories/location-repository.js";
import userController  from "./src/controllers/users-controller.js";
import eventsController from "./src/controllers/events-controller.js";
import enrollmentsControler from "./src/controllers/event_enrollments-controller.js"
const app =express();
const port=3000;

app.use(cors());
app.use(express.json());


app.use('/api/provinces', ProvinceController);
//app.use('/api/event_categories', event_categoriesRouter);
//app.use('/api/locations', locationRouter);
app.use('/api/user', userController);
app.use('/api/event', eventsController);
app.use('/api/event_enrollments', enrollmentsControler);


app.listen(port, () => {
  console.log(`"server" Listening on port ${port}`);
})
