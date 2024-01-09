import Axios from 'axios';
import { DOMAIN_URL } from "../utils/constants";

const customApi = Axios.create({
    baseURL: `${DOMAIN_URL}/erp-api`,
});

export const signup = async payload => {
    try {
        const { data } = await customApi.post(`/patients/`, payload);
        return data;
    } catch (error) {
        return console.log('error', error);
    }
};
export const sendOtp = async body => {
    try {
        const { data } = await customApi.post(`/patient_login/send_otp/`, body);
        return data;
    } catch (error) {
        return console.log('error', error);
    }
};
export const verifyOtp = async payload => {
    try {
        const { data } = await customApi.post(`/patient_login/verify_otp/`, payload);
        return data;
    } catch (error) {
        return console.log('error', error);
    }
};

