import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client
const client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
    // Credentials will be automatically loaded from environment (IAM Role) or local config
});

const dynamoDB = DynamoDBDocumentClient.from(client);
const WAITLIST_TABLE = process.env.WAITLIST_TABLE || 'wishlist';
const PARTNER_TABLE = process.env.PARTNER_TABLE || 'NetworkPartnerRequests';

/**
 * Add email to waitlist
 * @param {string} email - Email address
 * @returns {Promise<Object>} Result object
 */
export async function addToWaitlist(email) {
    const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp
    const emailLower = email.toLowerCase().trim();
    const requestId = uuidv4();

    try {
        // Check if email already exists
        const existingItem = await dynamoDB.send(
            new GetCommand({
                TableName: WAITLIST_TABLE,
                Key: {
                    email: emailLower,
                },
            })
        );

        if (existingItem.Item) {
            return {
                success: false,
                error: 'Email already exists in waitlist',
                duplicate: true,
            };
        }

        // Add email to waitlist
        await dynamoDB.send(
            new PutCommand({
                TableName: WAITLIST_TABLE,
                Item: {
                    email: emailLower,
                    timestamp: timestamp, // Match Python lambda structure
                    requestId: requestId,
                    type: 'waitlist',
                    createdAt: new Date().toISOString()
                },
            })
        );

        return {
            success: true,
            message: 'Email added to waitlist successfully',
        };
    } catch (error) {
        console.error('Error adding to waitlist:', error);
        return {
            success: false,
            error: 'Failed to add email to waitlist',
            details: error.message,
        };
    }
}

/**
 * Add partnership request
 * @param {Object} data - Partnership form data
 * @returns {Promise<Object>} Result object
 */
export async function addPartnershipRequest(data) {
    const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp
    const requestId = uuidv4();

    try {
        // Add partnership request
        // Note: We cannot easily check for duplicates by email here because the PK is requestId.
        // We rely on frontend/rate-limiting for that, or we'd need a GSI.

        await dynamoDB.send(
            new PutCommand({
                TableName: PARTNER_TABLE,
                Item: {
                    requestId: requestId, // Primary Key
                    type: 'partner',
                    organization: data.organization,
                    contact: data.contact,
                    email: data.email,
                    phone: data.phone,
                    timestamp: timestamp,
                    status: 'PENDING',
                    createdAt: new Date().toISOString()
                },
            })
        );

        return {
            success: true,
            message: 'Partnership request submitted successfully',
        };
    } catch (error) {
        console.error('Error adding partnership request:', error);
        return {
            success: false,
            error: 'Failed to submit partnership request',
            details: error.message,
        };
    }
}

/**
 * Check if email exists in waitlist
 * @param {string} email - Email address
 * @returns {Promise<boolean>} True if exists, false otherwise
 */
export async function checkEmailExists(email) {
    const emailLower = email.toLowerCase().trim();

    try {
        const result = await dynamoDB.send(
            new GetCommand({
                TableName: TABLE_NAME,
                Key: {
                    email: emailLower,
                },
            })
        );

        return !!result.Item;
    } catch (error) {
        console.error('Error checking email:', error);
        return false;
    }
}

