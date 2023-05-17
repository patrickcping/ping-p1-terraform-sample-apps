/**
Class representing PingOne registration and profile management API's integration.
This demo-specific class is developed and maintained by Ping Identity Technical Enablement.
Implements methods to integrate with PingOne authentication-related API endpoints.

@author Ping Identity Technical Enablement
{@link https://apidocs.pingidentity.com/pingone/platform/v1/api/#management-apis}
*/

class PingOneRegistration {
    /**
    Class constructor
    @param {string} authPath PingOne auth path for your regions tenant. (For BXR, could be the DG (PAZ) proxy host.)
    @param {string} envId PingOne environment ID needed for authZ integrations.
    */
    constructor(authPath, envId, apiPath) {
        this.authPath = authPath;
        this.envId = envId;
        this.apiPath = apiPath;
    }

    /**
    Registers a user with PingOne.
    {@link https://apidocs.pingidentity.com/pingone/platform/v1/api/#post-register-user}
    @param {object} regPayload User registration request payload.
    @param {string} flowId flowId from initial authorize endpoint call.
    @return {object} jsonResponse API response object in JSON format.
    **/
    async userRegister({ regPayload, flowId }) {
        console.info("Integration.PingOneRegistration.js", "Registering the user input at PingOne.");

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/vnd.pingidentity.user.register+json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: arguments[0]["regPayLoad"],
            redirect: "manual",
            credentials: "include"
        };

        const url = this.authPath + '/' + this.envId + "/flows/" + flowId;
        const response = await fetch(url, requestOptions);
        const jsonResponse = await response.json();
        return jsonResponse;
    }

    /**
    Verify the user's registration email code to complete registration.
    {@link https://apidocs.pingidentity.com/pingone/platform/v1/api/#post-verify-user}
    @param {object} rawPayload The verificationCode payload to send to the API.
    @param {string} flowId Id for the current authZ/authN transaction.
    @return {object} JSON formatted response object.
    */
    async userVerify({ regCodePayload, flowId }) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/vnd.pingidentity.user.verify+json");

        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: regCodePayload,
            redirect: "manual",
            credentials: "include"
        };

        const url = this.authPath + '/' + this.envId + "/flows/" + flowId;
        const response = await fetch(url, requestOptions);
        const jsonResponse = await response.json();
        return jsonResponse;
    }

    /**
     * Enroll an MFA device for a user.
     * {@link https://apidocs.pingidentity.com/pingone/platform/v1/api/#post-create-mfa-user-device-email}
     * @param {object} payload The device enrollment request payload.
     * @returns {object}
     */
    async enrollMFADevice(payload) {
        console.log("payload", payload);
        const payloadJSON = JSON.parse(payload);
        const accessToken = payloadJSON.accessToken;
        const emailaddress = payloadJSON.email;
        const userId = payloadJSON.userId;
        console.log("payloadJSON", payloadJSON);
        console.log("emailaddress", emailaddress);

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + accessToken);

        const raw = JSON.stringify({
            "type": "EMAIL",
            "email": emailaddress
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const url = this.apiPath + '/environments/' + this.envId + '/users/' + userId + '/devices'

        // fetch("{{apiPath}}/environments/{{envID}}/users/{{userID}}/devices", requestOptions)
        const response = await fetch(url, requestOptions);
        const jsonResponse = await response.json();
        
        return jsonResponse;
    }
}
export default PingOneRegistration;