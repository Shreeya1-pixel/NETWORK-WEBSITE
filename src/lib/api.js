// API configuration
const API_BASE_URL = 'https://cfws27kvecbus5gnrfqeifnocu0lqmtg.lambda-url.us-east-1.on.aws/api';

/**
 * Submit email to waitlist
 * @param {string} email - Email address
 * @returns {Promise<Object>} Response object
 */
export async function submitToWaitlist(email) {
    try {
        const response = await fetch(`${API_BASE_URL}/waitlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to submit email');
        }

        return data;
    } catch (error) {
        console.error('Error submitting to waitlist:', error);
        throw error;
    }
}

/**
 * Submit partnership request
 * @param {Object} formData - Partnership form data
 * @returns {Promise<Object>} Response object
 */
export async function submitPartnershipRequest(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/partner`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to submit partnership request');
        }

        return data;
    } catch (error) {
        console.error('Error submitting partnership request:', error);
        throw error;
    }
}

/**
 * Health check
 * @returns {Promise<Object>} Health status
 */
export async function checkHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return await response.json();
    } catch (error) {
        console.error('Health check failed:', error);
        throw error;
    }
}

