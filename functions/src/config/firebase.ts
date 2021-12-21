// import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
var serviceAccount = require("../../../secrets.json");



admin.initializeApp({
    // credential: admin.credential.cert({
    //   privateKey: functions.config().private.key.replace(/\\n/g, '\n'),
    //   projectId: functions.config().project.id,
    //   clientEmail: functions.config().client.email
    // }),
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://antessio-whisky-price-engine.firebaseio.com'
  })

  const db = admin.firestore()
  export { admin, db }