// REQUIRING ROUTES AND LIBRARIES
var port = 8000 || process.env.port;

var express         =  require("express"),
    mongoose        =  require("mongoose"),
    passport        =  require("passport"),
    localStrategy   =  require("passport-local"),
    methodOverride  =  require("method-override"),
    bodyParser      =  require("body-parser");

var patientIndexRoutes            =  require("./routes/patient/index"),
    patientAppointmentRoutes      =  require("./routes/patient/appointments"),
    doctorAppointmentRoutes       =  require("./routes/doctor/appointments"),
    doctorIndexRoutes             =  require("./routes/doctor/index"),
    doctorReportRoutes            =  require("./routes/doctor/prescription"),
    nurseIndexRoutes              =  require("./routes/nurse/index"),
    nurseReportRoutes            =  require("./routes/nurse/report"),
    receptionistIndexRoutes       =  require("./routes/receptionist/index"),
    receptionistAppoinmentRoutes  =  require("./routes/receptionist/appointments");


var Patient = require("./models/patient"),
    Doctor  = require("./models/doctor"),
    Receptionist = require("./models/receptionist");
    Nurse = require("./models/nurse");

var app = express();


// DATABASE CONNECTION
mongoose.connect("mongodb://localhost/hms_s");


// SETTING UP OUR APP
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// AUTH
app.use(require("express-session") ({
    secret: "Ï love reading books!",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


passport.use("doctorLocal", new localStrategy(Doctor.authenticate()));
passport.use("patientLocal", new localStrategy(Patient.authenticate()));
passport.use("nurseLocal", new localStrategy(Nurse.authenticate()));
passport.use("receptionistLocal", new localStrategy(Receptionist.authenticate()));

passport.serializeUser(function(user, done) { 
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    if(user!=null)
      done(null,user);
});

// SETTING UP ROUTES

app.use("/patient", patientIndexRoutes);
app.use("/patient/appointments", patientAppointmentRoutes);
app.use("/doctor/appointments", doctorAppointmentRoutes);
app.use("/doctor", doctorIndexRoutes);
appp.use("/doctor/report", doctorReportRoutes);
app.use("/nurse", nurseIndexRoutes);
app.use("/nurse/report", nurseReportRoutes);
app.use("/receptionist", receptionistIndexRoutes);
app.use("/receptionist/appointments", receptionistAppoinmentRoutes);

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/about", function(req, res) {
    res.render("aboutus");
});

app.get("/contact", function(req, res) {
    res.render("contactus");
});


app.listen(port, process.env.IP, function() {
    console.log("Hospital Management System server is ready ...");
});