var emailAddress = prompt("Please enter your email address", "harry.j.potter@hogwarts.ac.uk");
var displayName = prompt("Please enter your name", "Harry James Potter");

// Registration object
var createCredentialDefaultArgs = {
    publicKey: {
        rp: {
            name: "Patrick-WebAuthnTestApp"
        },
        user: {
            id: new Uint8Array(16),
            name: emailAddress,
            displayName: displayName
        },
        pubKeyCredParams: [{
            type: "public-key",
            alg: -7
        }],
        attestation: "direct",
        timeout: 60000,
        challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
            0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
            0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
        ]).buffer
    }
};

// Login object goes here