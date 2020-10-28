// DONT EVER DO THIS IN REAL LIFE
var rawID = null;

// Login object
var getCredentialDefaultArgs = {
    publicKey: {
        timeout: 60000,
        // allowCredentials: [newCredential] // see below
        challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
            0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
            0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
        ]).buffer
    },
};

// register / create a new credential
function registerCredential() {
    var emailAddress = document.forms["TestInfo"]["emailAddress"].value;
    var displayName = document.forms["TestInfo"]["displayName"].value;

    // Registration Object
    var createCredentialDefaultArgs = {
        publicKey: {
            rp: {
                name: "Patrick-WebAuthn-TestApp"
            },
            authenticatorSelection: {
                "requireResidentKey": false,
                "userVerification": "discouraged"
            },
            user: {
                id: new Uint8Array(16),
                name: emailAddress,
                displayName: displayName
            },
            pubKeyCredParams: [{
                type: "public-key",
                alg: -7 //ES256 elliptic curve
            }],
            attestation: "direct",
            timeout: 90000,
            challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
                0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
                0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
            ]).buffer
        }
    };

    return navigator.credentials.create(createCredentialDefaultArgs)
        .then((cred) => {
            console.log("NEW CREDENTIAL", cred);
            rawID = cred.rawId;
            document.getElementById("registration").textContent = "Success!";
        })
        .catch((err) => {
            console.log("ERROR", err);
            document.getElementById("registration").textContent = "Failure :(";
        });
}

function authenticate() {
    var idList = [{
        id: rawID,
        transports: ["usb", "nfc"],
        type: "public-key"
    }];

    getCredentialDefaultArgs.publicKey.allowCredentials = idList;

    return navigator.credentials.get(getCredentialDefaultArgs)
        .then((assertion) => {
            console.log("ASSERTION", assertion);
            document.getElementById("authentication").textContent = "Success! Public Key Cred ID - " + assertion.id;
        })
        .catch((err) => {
            console.log("ERROR", err);
            document.getElementById("authentication").textContent = "Failure :(";
        });
}