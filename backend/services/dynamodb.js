import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client
const client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: process.env.AWS_ACCESS_KEY_ID ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    } : undefined, // If credentials not provided, use default AWS credentials (IAM role, etc.)
});

const dynamoDB = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'waitlist';

/**
 * Add email to waitlist
 * @param {string} email - Email address
 * @returns {Promise<Object>} Result object
 */
export async function addToWaitlist(email) {
    const timestamp = new Date().toISOString();
    const emailLower = email.toLowerCase().trim();

    try {
        // Check if email already exists
        const existingItem = await dynamoDB.send(
            new GetCommand({
                TableName: TABLE_NAME,
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
                TableName: TABLE_NAME,
                Item: {
                    email: emailLower,
                    createdAt: timestamp,
                    updatedAt: timestamp,
                    type: 'waitlist',
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
    const timestamp = new Date().toISOString();
    const emailLower = data.email.toLowerCase().trim();

    try {
        // Check if email already exists for partnership
        const existingItem = await dynamoDB.send(
            new GetCommand({
                TableName: TABLE_NAME,
                Key: {
                    email: emailLower,
                },
            })
        );

        if (existingItem.Item && existingItem.Item.type === 'partnership') {
            return {
                success: false,
                error: 'Partnership request already submitted with this email',
                duplicate: true,
            };
        }

        // Add partnership request
        await dynamoDB.send(
            new PutCommand({
                TableName: TABLE_NAME,
                Item: {
                    email: emailLower,
                    organization: data.organization,
                    contact: data.contact,
                    phone: data.phone,
                    createdAt: timestamp,
                    updatedAt: timestamp,
                    type: 'partnership',
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

