const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const dataSql = fs.readFileSync('./Backend/sql_scripts/newDB.sql').toString();

// Possibly remove
const PORT = process.env.PORT || 4000;
app.use(cors({
  origin: 'http://localhost:3000' 
}));

// app.use(express.static('./public'))
app.use(express.static(path.resolve(__dirname, '../Frontend/build')));
app.use(bodyparser.json())
app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
);    

var db = require('./database');
db.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }
  console.log('Database connected.')
});

const approvedFundingRoute = require('./routes/approved_funding_route');
const branchRoute = require('./routes/branch_route');
const clinRoute = require('./routes/clin_route');
const contractRoute = require('./routes/contract_route');
const contractorRoute = require('./routes/contractor_route');
const dependencyRoute = require('./routes/dependency_route');
const expenditureRoute = require('./routes/expenditure_route');
const fundingTypeRoute = require('./routes/funding_type_route');
const obligationRoute = require('./routes/obligation_route');
const projectRoute = require('./routes/project_route');
const userRoute = require('./routes/user_route');
const uploadRoute = require('./routes/upload_route');
const wbsRoute = require('./routes/wbs_route');


app.use('/api/approved', approvedFundingRoute);
app.use('/api/branch', branchRoute);
app.use('/api/clin', clinRoute);
app.use('/api/contract', contractRoute);
app.use('/api/contractor', contractorRoute);
app.use('/api/dependency', dependencyRoute);
app.use('/api/expenditure', expenditureRoute)
app.use('/api/fundingType', fundingTypeRoute)
app.use('/api/obligation', obligationRoute)
app.use('/api/project', projectRoute);
app.use('/api/user', userRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/wbs', wbsRoute);

//All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../Frontend/build', 'index.html'));
// });

let nodeServer = app.listen(PORT, function () {
  let port = nodeServer.address().port
  let host = nodeServer.address().address
  console.log('App working on: ', host, port)
  console.log(__dirname);
});