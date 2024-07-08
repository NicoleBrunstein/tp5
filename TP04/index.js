import express from"express";
import cors from"cors";
import ProvinceController from "./src/controllers/province-controller.js";
import ProvinceRouter from "./src/controllers/province-controller.js";
import event_categoriesRouter from "./src/controllers/event_categories-controller.js";
import locationRouter from "./src/controllers/location-contoller.js";
import userController  from "./src/controllers/users-controller.js";
import eventsController from "./src/controllers/events-controller.js";
import enrollmentsControler from "./src/controllers/event_enrollments-controller.js";
import eventLocationControler from "./src/controllers/event_location-controller.js"

const app =express();
const port=3000;

app.use(cors());
app.use(express.json());


app.use('/api/province', ProvinceController);
app.use('/api/event_categories', event_categoriesRouter);
app.use('/api/location', locationRouter);
app.use('/api/user', userController);
app.use('/api/event', eventsController);
app.use('/api/event', enrollmentsControler);
app.use('/api/event-location', eventLocationControler);



app.listen(port, () => {
  console.log(`"server" Listening on port ${port}`);
})
