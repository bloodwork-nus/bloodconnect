import firebase from "./firebase";

export const Constants = {
    Status: {
        OPEN: "OPEN"
    },

    RequestTypes: {
        BLOOD: "BLOOD",
        PLATELETS: "PLATELETS",
        PLASMA: "PLASMA"
    }
};

export const newRequest = (request, callback = () => {}) => {
    // TODO: Set callback for push
    const newRequest = firebase.database().ref("requests").push(request, callback).key;
    //firebase.database().ref("users/").
    return newRequest;
}

export const donateToRequest = (requestId, donation) => {
    firebase.database().ref(`requests/${requestId}`).once("value").then(snapshot => {
        const status = snapshot.val().status;
        switch (status) {
            case Constants.Status.OPEN:
                // TODO: Set callback for push
                const newDonation = firebase.database().ref("donations").push(donation).key;
                firebase.database().ref(`requests/${requestId}/donors`).push(newDonation);
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