# Patrick's WebAuthn Test Application
This is a basic application that provides the following functionality:
- Register a credential with a security key (roaming authenticator) with WebAuthn
  - I was able to test with a Yubikey 5 NFC
- Get the credential off the security key to emulate passwordless authentication
  - There is no backend server present to store the public key, so I am insecurely storing in web browser for demonstrative purposes only. Don't ever do this in practice!
  
# Based on information found at the following sources: 
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API
- https://demo.yubico.com/webauthn-technical/
- https://developers.yubico.com/WebAuthn/WebAuthn_Walk-Through.html
- https://www.w3.org/TR/webauthn-2/
