require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require('./common/db');
const cors = require("cors");

const AdvertisementRoutes = require('./Routes/Advertisement.routes');
const AdvertisementCategoryRoutes = require('./Routes/AdvertisementCategory.routes');
const CityRoutes = require('./Routes/City.routes');
const CityAreaRoutes = require('./Routes/CityArea.routes');
const CountryRoutes = require('./Routes/Country.routes');
const ProvinceRoutes = require('./Routes/Province.routes');
const UserRoutes = require('./Routes/User.routes');
const Contact = require('./Routes/Contact.routes');

const app = express();
const host = process.env.HOST;
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: "https://pakclassified-frontend.vercel.app",
  credentials: true
}));

const publicFolder = path.resolve(__dirname, "public");
app.use(express.static(publicFolder));


app.use('/uploads', express.static('uploads'));

app.use('/api/v1/Advertisement', AdvertisementRoutes);
app.use('/api/v1/AdvertisementCategory', AdvertisementCategoryRoutes);
app.use('/api/v1/City', CityRoutes);
app.use('/api/v1/CityArea', CityAreaRoutes);
app.use('/api/v1/Country', CountryRoutes);
app.use('/api/v1/Province', ProvinceRoutes);
app.use('/api/v1/user', UserRoutes);
app.use("/api/v1/contact", Contact);

app.get("/", (req, res) => {
  res.send("Pakclassifed Backend Running!");
});

app.listen(port, host, async () => {
  await connectDB();
  console.log(`Server running at http://${host}:${port}`);
});
