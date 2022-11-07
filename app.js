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
    nurseIndexRoutes              =  require("./routes/nurse/index"),
    receptionistIndexRoutes       =  require("./routes/receptionist/index"),
    receptionistAppoinmentRoutes  =  require("./routes/receptionist/appointments");


var Patient = require("./models/patient"),
    Doctor  = require("./models/doctor"),
    Receptionist = require("./models/receptionist");

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
passport.use("receptionistLocal", new localStrategy(Receptionist.authenticate()));

passport.serializeUser(function(user, done) { 
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    if(user!=null)
      done(null,user);
});

// passport.serializeUser(Doctor.serializeUser());
// passport.deserializeUser(Doctor.deserializeUser());

// passport.serializeUser(Patient.serializeUser());
// passport.deserializeUser(Patient.deserializeUser());


// SETTING UP ROUTES

app.use("/patient", patientIndexRoutes);
app.use("/patient/appointments", patientAppointmentRoutes);
app.use("/doctor/appointments", doctorAppointmentRoutes);
app.use("/doctor", doctorIndexRoutes);
// app.use("/nurse", nurseIndexRoutes);
app.use("/receptionist", receptionistIndexRoutes);
app.use("/receptionist/appointments", receptionistAppoinmentRoutes);

app.get("/", function(req, res) {
    // res.render("landing");
    res.send("Welcome to HMS!");
});


// 1. "/" => doctor dashboard

app.listen(port, process.env.IP, function() {
    console.log("Hospital Management System server is ready ...");
});