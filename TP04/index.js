import express from"express";
import cors from"cors";
import ProvinceRouter from "./src/repositories/province-repository.js";
import event_categoriesRouter from "./src/repositories/event_categories-repository.js";
import locationRouter from "./src/repositories/location-repository.js";
import userController  from "./src/controllers/users-controller.js";
import eventsRouter from "./src/repositories/events-repository.js";
const app =express();
const port=3000;
//Elpuerto3000(http://localhost:3000) //AgregolosMiddlewares 
app.use(cors());
app.use(express.json());


app.use('/api/provinces', ProvinceRouter);
app.use('/api/event_categories', event_categoriesRouter);
app.use('/api/locations', locationRouter);
app.use('/api/user', userController);
app.use('/api/event', eventsRouter);

app.listen(port, () => {
  console.log(`"server" Listening on port ${port}`);
})
