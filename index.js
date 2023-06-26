const express = require("express");
const app = express();
const Cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
require("dotenv").config()
require("./database");

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static("files"));
app.use(Cors());
app.use('/upload',express.static('upload'));

// Define All Routes file Here
const userRoutes = require("./routes/user.routes")
const categoryRoutes = require("./routes/category.routes")
const subCategoryRoutes = require("./routes/subcategory.routes")
const superAdminRoutes = require("./routes/superAdmin.routes")
const colorRoutes = require("./routes/color.routes")
const productRoutes = require("./routes/product.routes")
const blogRoutes = require("./routes/blog.routes")
const contactRoutes = require("./routes/contactus.routes")
const serviceRoutes = require("./routes/service.routes")
const imageRoutes = require("./routes/upload-image")

// Define All Routes Here
app.get('/',()=>{console.log("welcome to Animal")})
app.use("/users", userRoutes)
app.use("/category", categoryRoutes)
app.use("/subcategory", subCategoryRoutes)
app.use("/superAdmin", superAdminRoutes)
app.use("/color", colorRoutes)
app.use("/product", productRoutes)
app.use("/blog", blogRoutes)
app.use("/contact", contactRoutes)
app.use("/service", serviceRoutes)
app.use("/image", imageRoutes)

app.listen(8000, () => {
	console.log("server started");
});
