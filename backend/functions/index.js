const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(function (req, res, next) {
  // res.setHeader('Access-Control-Allow-Origin', 'https://exprezy-67be7.web.app');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

exports.app = functions.https.onRequest(app);
var admin = require("firebase-admin");

var serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://exprezy-18e3e.firebaseio.com"
});
let db = admin.firestore();

// ===================================get req =======================================

app.get('/try', (req, res) => {
  res.send("working")
})

app.get('/api/auth', function (req, res) {
  var data = {};
  db.collection('garages').get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      snapshot.forEach(doc => {
        res.send(doc.data().id);
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
      res.send("without then")
    });
})

app.get('/viewreq', (req, res) => {

  db.collection('garages').get()
    .then(snapshot => {
      serviceRequests = [];
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      snapshot.forEach(doc => {
        serviceRequests = doc.data().serviceRequests
      })
      res.json({
        serviceRequests: serviceRequests
      })
    })
    .catch(err => {
      console.log("Error in getting doc", err);
    })

})

app.get('/getuserdata', (req, res) => {


  var reqdata = [];
  var serviceRequest = ['7378956754_MH42G56', '9823305790_MH42GH1984'];
  serviceRequest.forEach(doc => {
    doc = doc.split('_')
    db.collection('users').doc(doc[0]).get()
      .then(snapshot => {

        reqdata.push({
          id: doc[0] + '_' + doc[1],
          name: snapshot.data().name,
          address: snapshot.data().address,
          pincode: snapshot.data().pincode,
          email: snapshot.data().email,
          vehicle: snapshot.data().vehicles[doc[1]],
          requestedservice: snapshot.data().requestedservices[doc[1]]
        })
        if (reqdata.length == serviceRequest.length) {
          res.json({
            data: reqdata
          })
        }
      })
      .catch(err => {
        console.log("Error in getting doc", err);
      })
  })
})

app.get('/broadcast', (req, res) => {
  db.collection('users').doc('7378956754').get()
    .then(snapshot => {
      // console.log(snapshot.data)
      res.render('broadcast', {
        vehicles: snapshot.data().vehicles,
        mobile: snapshot.id
      })
    })
})

// ===================================get req =======================================

app.post('/api/auth', function (req, res) {

  db.collection('garages').where('id', '==', req.body.username).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().password == req.body.password) {
          var token = jwt.sign({
            userID: req.body.username,
            garageId: doc.id,
            clientId: doc.data().client
          }, 'todo-app-super-shared-secret', {
            expiresIn: '2h'
          });
          res.json({
            token: token
          });
        } else {
          res.json({
            token: false
          });
        }
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
      res.json({
        token: false
      });
    });
})

app.post('/viewreq', (req, res) => {

  db.collection('garages').where('id', '==', req.body.userId).get()
    .then(snapshot => {
      serviceRequests = [];
      snapshot.forEach(doc => {
        serviceRequests = doc.data().serviceRequests
      })
      res.json({
        serviceRequests: serviceRequests
      })
    })
    .catch(err => {
      console.log("Error in getting doc", err);
    })
})

app.post('/getuserdata', (req, res) => {

  if (req.body.serviceRequest == "Npsr") {
    res.json({
      data: []
    })
  } else {
    var reqdata = [];
    req.body.serviceRequest.forEach(doc => {
      doc = doc.split('_')
      db.collection('users').doc(doc[0]).get()
        .then(snapshot => {
          reqdata.push({
            id: doc[0] + '_' + doc[1],
            name: snapshot.data().name,
            address: snapshot.data().address,
            pincode: snapshot.data().pincode,
            email: snapshot.data().email,
            vehicle: snapshot.data().vehicles[doc[1]],
            requestedservice: snapshot.data().requestedservices[doc[1]]
          })
          if (reqdata.length == req.body.serviceRequest.length) {
            console.log(snapshot.data().vehicles[doc[1]])
            res.json({
              data: reqdata
            })
          }
        })
        .catch(err => {
          res.json({ data: "npsr" })
          console.log("Error in getting doc", err);
        })
    })
  }
})

app.post('/broadcast', (req, res) => {
  var garagelist = {
    eHB7qlOsxSUD0xHRia05: false
  };

  db.collection('users').doc('7378956754').get()
    .then(snapshot => {
      var fakedata = snapshot.data().requestedservices
      var newdata = {
        status: "pending",
        GarageList: garagelist,
        job: [req.body.job1, req.body.job2]
      }
      fakedata[req.body.vehicleno] = newdata;
      db.collection('users').doc('7378956754').update({
        requestedservices: fakedata
      })
        .then(snapshot => {

          var c = 0;
          var l = Object.keys(garagelist).length
          for (var i in garagelist) {

            var ide = '7378956754_' + req.body.vehicleno;
            db.collection('garages').doc(i).get()
              .then(snapshot => {

                db.collection('garages').doc(snapshot.id).update({
                  serviceRequests: admin.firestore.FieldValue.arrayUnion(ide)
                })
                  .then(secsnapshot => {

                    db.collection('clientgarage').doc(snapshot.data().client).update({
                      serviceRequests: admin.firestore.FieldValue.arrayUnion(ide)
                    })
                      .then(snapshot => {

                        c++;
                        if (c == l) {
                          res.send("job done")
                        }
                      })
                  })
              })
          }

        })
    })

})

app.post('/acceptedjob', (req, res) => {

  var user1 = req.body.user.split('_');
  var data
  var garagcol = db.collection('garages').doc(req.body.garageId)
  var usercol = db.collection('users').doc(user1[0])
  var clientgarage = db.collection('clientgarage').doc(req.body.clientId)

  db.runTransaction(async (s) => {

    var user = await s.get(usercol)

    data = user.data().requestedservices

    if (Object.values(data[user1[1]].GarageList).includes(true)) {
      return Promise.reject()
    }
    data[user1[1]].GarageList[req.body.garageId] = true
    data[user1[1]].status = "accepted";
    s.update(usercol, { requestedservices: data });

  })
    .then(() => {

      db.runTransaction(async (t) => {

        var clientgarageupdatelist
        for (var i in data[user1[1]].GarageList) {

          if (!data[user1[1]].GarageList[i]) {

            clientgarageupdatelist = await t.get(db.collection('garages').doc(i))

            t.update(db.collection('garages').doc(i), {
              serviceRequests: admin.firestore.FieldValue.arrayRemove(req.body.user)
            })
            t.update(db.collection('clientgarage').doc(clientgarageupdatelist.data().client), {
              serviceRequests: admin.firestore.FieldValue.arrayRemove(req.body.user)
            })
          }
        }

        t.update(garagcol, {
          acceptedServices: admin.firestore.FieldValue.arrayUnion(req.body.user)
        });
        t.update(garagcol, {
          serviceRequests: admin.firestore.FieldValue.arrayRemove(req.body.user)
        });
        t.update(clientgarage, {
          acceptedServices: admin.firestore.FieldValue.arrayUnion(req.body.user)
        });
        t.update(clientgarage, {
          serviceRequests: admin.firestore.FieldValue.arrayRemove(req.body.user)
        });

      })
        .then(() => {
          res.json({ msg: "done" })
        })
        .catch(err => {
          res.json({ msg: "not done" })
        })

    })

    .catch(err => {
      res.json({ msg: "already accepted" })
      console.log("Er", err);
    })

})

app.post('/rejectedjob', (req, res) => {

  db.collection('garages').doc(req.body.garageId).update({
    serviceRequests: admin.firestore.FieldValue.arrayRemove(req.body.user)
  })
    .then(snapshot => {
      db.collection('clientgarage').doc(req.body.clientId).update({
        serviceRequests: admin.firestore.FieldValue.arrayRemove(req.body.user)
      })
        .then(snapshot => {
          res.json({
            msg: "done"
          })
        })
        .catch(err => {
          res.json({
            msg: "some error occured"
          })
        })
    })

    .catch(err => {
      res.json({
        msg: "some error occured"
      })
    })
})


app.post('/jobstarted', (req, res) => {
  db.collection('services').doc(req.body.id).set(req.body.jobdata)
    .then(() => {
      db.runTransaction(async (t) => {
        var usermob = await t.get(db.collection('users').doc(req.body.jobdata.ownerMobileno))
        var update = usermob.data().requestedservices
        update[req.body.jobdata.vehicleNumber]['status'] = 'ongoing'
        update[req.body.jobdata.vehicleNumber]['servideId'] = req.body.id
        var varr = {}
        var varr2 = 'requestedservices.' + req.body.jobdata.vehicleNumber;
        varr[varr2] = update[req.body.jobdata.vehicleNumber]
        t.update(db.collection('users').doc(req.body.jobdata.ownerMobileno), varr)

      })
        .then(() => {
          db.runTransaction(async (t) => {

            var uid = req.body.jobdata.ownerMobileno + "_" + req.body.jobdata.vehicleNumber
            t.update(db.collection('garages').doc(req.body.garageId), { ongoingServices: admin.firestore.FieldValue.arrayUnion(req.body.id) })
            t.update(db.collection('garages').doc(req.body.garageId), { acceptedServices: admin.firestore.FieldValue.arrayRemove(uid) })

            t.update(db.collection('clientgarage').doc(req.body.clientId), { ongoingServices: admin.firestore.FieldValue.arrayUnion(req.body.id) })
            t.update(db.collection('clientgarage').doc(req.body.clientId), { acceptedServices: admin.firestore.FieldValue.arrayRemove(uid) })
          })
            .then(() => {

              res.json({ data: "done" })
            })
            .catch(() => {
              console.log("not done from 2 trans")
            })
        })
        .catch(() => {
          console.log("not done from trans")
        })
    })
    .catch(err => {
      console.log("not done from catch");
    })
})

app.post('/offlinejob', (req, res) => {
  db.collection('services').doc(req.body.id).set(req.body.jobdata)
    .then(() => {
      db.runTransaction(async (t) => {

        var uid = req.body.jobdata.ownerMobileno + "_" + req.body.jobdata.vehicleNumber
        t.update(db.collection('garages').doc(req.body.garageId), { ongoingServices: admin.firestore.FieldValue.arrayUnion(req.body.id) })
        t.update(db.collection('garages').doc(req.body.garageId), { acceptedServices: admin.firestore.FieldValue.arrayRemove(uid) })

        t.update(db.collection('clientgarage').doc(req.body.clientId), { ongoingServices: admin.firestore.FieldValue.arrayUnion(req.body.id) })
        t.update(db.collection('clientgarage').doc(req.body.clientId), { acceptedServices: admin.firestore.FieldValue.arrayRemove(uid) })
      })
        .then(() => {

          res.json({ data: "done" })
        })
        .catch(() => {
          console.log("not done from 2 trans")
        })
    })
    .catch(err => {
      console.log("not done from catch");
    })
})



app.post('/getongoingservicedata', (req, res) => {

  if (req.body.ongoingservicedata == "Npsr") {
    res.json({
      data: []
    })
  } else {
    var reqdata = [];
    req.body.ongoingservicedata.forEach(doc => {

      db.collection('services').doc(doc).get()
        .then(snapshot => {
          reqdata.push(snapshot.data())

          if (reqdata.length == req.body.ongoingservicedata.length) {
            res.json({
              data: reqdata
            })
          }

        })
        .catch(err => {
          console.log("Error in getting doc", err);
        })
    })
  }
})

app.post('/jobupdate', (req, res) => {

  db.runTransaction(async (t) => {
    if (req.body.message != null && req.body.message != "")
      t.update(db.collection('services').doc(req.body.serviceId), { message: req.body.message })
    t.update(db.collection('services').doc(req.body.serviceId), { outDate: req.body.outdate })
    var varr;
    var varr2 = {};
    for (var i = 0; i < req.body.item.length; i++) {
      varr = 'jobs.' + req.body.item[i]
      varr2[varr] = true
    }
    if (req.body.item.length > 0)
      t.update(db.collection('services').doc(req.body.serviceId), varr2)
  })
    .then(() => {
      res.json({ msg: "done" })
    })
    .catch(err => {
      res.json({ msg: "not done" })
    })
})

app.post('/deliver', (req, res) => {
  console.log("deliver t \n \n")
  db.runTransaction(async (t) => {
    var date = new Date()
    var invno = "EX" + req.body.garageId.substring(0, 4) + date.getFullYear().toString() + "0000000".substring(0, 6 - req.body.count.toString().length) + (req.body.count + 1).toString()
    // console.log(invo, "invo \n \n")  
    var varr = 'requestedservices.' + req.body.keydata.vehicleNumber
    var varr2 = {}
    varr2[varr] = admin.firestore.FieldValue.delete()
    console.log("1==========================", invno)
    t.update(db.collection('users').doc(req.body.keydata.ownerMobileno), varr2)

    t.update(db.collection('users').doc(req.body.keydata.ownerMobileno), { previousservices: admin.firestore.FieldValue.arrayUnion(req.body.keydata.serviceId) })

    t.update(db.collection('garages').doc(req.body.garageId), { ongoingServices: admin.firestore.FieldValue.arrayRemove(req.body.keydata.serviceId) })

    t.update(db.collection('garages').doc(req.body.garageId), { completedServices: admin.firestore.FieldValue.arrayUnion(req.body.keydata.serviceId) })

    t.update(db.collection('clientgarage').doc(req.body.clientId), { ongoingServices: admin.firestore.FieldValue.arrayRemove(req.body.keydata.serviceId) })

    t.update(db.collection('clientgarage').doc(req.body.clientId), { completedServices: admin.firestore.FieldValue.arrayUnion(req.body.keydata.serviceId) })

    t.update(db.collection('services').doc(req.body.keydata.serviceId), { serviceCompleted: true })

    t.update(db.collection('services').doc(req.body.keydata.serviceId), { invoice: invno })

  })
    .then(() => {
      res.json({ msg: "done" })
    })
    .catch(err => {
      console.log("inside catch", err)
      res.json({ msg: "not done" })
    })
})
