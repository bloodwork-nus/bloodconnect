import firebase from "./firebase";
import * as Authentication from "./auth";

export const Constants = {
    Status: {
        OPEN: "OPEN",
        COMPLETED: "COMPLETED",
        CANCELLED: "CANCELLED"
    },

    RequestTypes: {
        BLOOD: "BLOOD",
        PLATELETS: "PLATELETS",
        PLASMA: "PLASMA"
    },

    // Remember to update BloodTypes and BloodTypesLabel when adding/changing
    // blood types values. This splitting is to prevent O(n) operations when
    // converting blood type ID (from Firebase) to display in Explore.
    BloodTypes: [
        { id: "ANEG", value: "A-", short: "A-" },
        { id: "OPOS", value: "O+", short: "O+" },
        { id: "APOS", value: "A+", short: "A+" },
        { id: "ONEG", value: "O-", short: "O-" },
        { id: "ABPOS", value: "AB+", short: "AB+" },
        { id: "ABNEG", value: "AB-", short: "AB-" },
        { id: "BPOS", value: "B+", short: "B+" },
        { id: "BNEG", value: "B-", short: "B-" },
        { id: "ANY", value: "Any blood groups", short: "Any" },
        { id: "OTHER", value: "Other (specify in description)", short: "*" }
    ],

    BloodTypesLabel: {
        ANEG: { value: "A-", short: "A-" },
        OPOS: { value: "O+", short: "O+" },
        APOS: { value: "A+", short: "A+" },
        ONEG: { value: "O-", short: "O-" },
        ABPOS: { value: "AB+", short: "AB+" },
        ABNEG: { value: "AB-", short: "AB-" },
        BPOS: { value: "B+", short: "B+" },
        BNEG: { value: "B-", short: "B-" },
        ANY: { value: "Any blood groups", short: "Any" },
        OTHER: { value: "Other blood groups", short: "*" }
    },

    DonorCompatibility: {
        ABPOS: ["ABPOS"],
        ABNEG: ["ABPOS", "ABNEG"],
        BPOS: ["ABPOS", "BPOS"],
        BNEG: ["ABPOS", "ABNEG", "BPOS", "BNEG"],
        APOS: ["ABPOS", "APOS"],
        ANEG: ["ABPOS", "ABNEG", "APOS", "ANEG"],
        OPOS: ["ABPOS", "BPOS", "APOS", "OPOS"],
        ONEG: ["ABPOS", "ABNEG", "BPOS", "BNEG", "APOS", "ANEG", "OPOS", "ONEG"],
        ANY: ["ABPOS", "ABNEG", "BPOS", "BNEG", "APOS", "ANEG", "OPOS", "ONEG", "OTHER"],
        ANY: ["ABPOS", "ABNEG", "BPOS", "BNEG", "APOS", "ANEG", "OPOS", "ONEG", "OTHER"],
    }
};

export const newRequest = (request, callback = () => {}) => {
    const newRequest = firebase.database().ref("requests").push();
    newRequest.set({ ...request, id: newRequest.key }, callback);
    // firebase.database().ref(`users/${Authentication.getCurrentUserUid()}/requests`).push(newRequest, callback);
    return newRequest;
}

export const donateToRequest = (requestId, donation, callback = () => {}, onClosedRequest = () => {}) => {
    firebase.database().ref(`requests/${requestId}`).once("value").then(snapshot => {
        const status = snapshot.val().status;
        switch (status) {
            case Constants.Status.OPEN:
                // TODO: Set callback for push
                const newDonation = firebase.database().ref("donations").push(donation).key;
                firebase.database().ref(`requests/${requestId}/donors`).push(newDonation, callback);
                return newDonation;
            default:
                return onClosedRequest();
        }
    });
}

export const closeRequest = (requestId) => {
    firebase.database().ref(`requests/${requestId}`).update({
        status: Constants.Status.CANCELLED
    });
}

export const deleteRequest = (requestId) => {
    firebase.database().ref(`requests/${requestId}`).remove();
}

export const completeRequest = (requestId, contactName, contactNumber) => {
    firebase.database().ref(`requests/${requestId}`).update({
        status: Constants.Status.COMPLETED,
        donor: { contactName, contactNumber },
        dateCompleted: Date.now()
    });
}

// firebase.auth()
//     .signInWithEmailAndPassword("phillmont@bloodwork.org", "testingaccount")
//     .then(({ user }) => newRequest({
//         requester: user.uid,
//         donors: [1, 2, 3],
//         status: "OPEN",
//         dateCreated: Date.now(),
//         payload: {
//             bloodType: "A+",
//             requestType: "BLOOD",
//             numberOfUnits: 5,
//             contactName: user.displayName,
//             contactNumber: "9127 2719",
//             isWhatsApp: true,
//             description: "Holadesc",
//             isEmergency: true,
//             location: "Holaspital",
//             venueType: "HOSPITAL"
//         }
//     }))
//     .catch(error => alert("ERROR: " + error))

// const handleSignUp = () => {
//     firebase.auth()
//     .signInWithEmailAndPassword("phillmont@bloodwork.org", "testingaccount")
//     .then(({ user }) => donateToRequest("-MAH2SsmZdHtTjYvKWUZ", {
//         donor: user.uid,
//         requestId: "-MAChnISKrj9OqXIGKrh",
//         dateCreated: Date.now(),
//         payload: {
//             bloodType: "O",
//             contactName: "Jancuk",
//             contactNumber: "9127 2719",
//             isPassedSurvey: true
//         }
//     }))
//     .catch(error => alert("ERROR: " + error));
// }