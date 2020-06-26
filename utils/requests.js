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
    }
};

export const newRequest = (request, callback = () => {}) => {
    const newRequest = firebase.database().ref("requests").push();
    newRequest.set({ ...request, id: newRequest.key }, callback);
    // firebase.database().ref(`users/${Authentication.getCurrentUserUid()}/requests`).push(newRequest, callback);
    return newRequest;
}

export const donateToRequest = (requestId, donation, callback = () => {}) => {
    firebase.database().ref(`requests/${requestId}`).once("value").then(snapshot => {
        const status = snapshot.val().status;
        switch (status) {
            case Constants.Status.OPEN:
                // TODO: Set callback for push
                const newDonation = firebase.database().ref("donations").push(donation).key;
                firebase.database().ref(`requests/${requestId}/donors`).push(newDonation, callback);
                return newDonation;
            default:
                console.log("status unknown");
        }
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