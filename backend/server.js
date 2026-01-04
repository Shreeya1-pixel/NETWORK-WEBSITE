import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { addToWaitlist, addPartnershipRequest } from './services/dynamodb.js';
import { rateLimiter } from './middleware/rateLimiter.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'Network Backend API',
    });
});

// Rate limiting middleware (10 requests per minute per IP)
const waitlistRateLimiter = rateLimiter(60000, 10); // 10 requests per minute
const partnershipRateLimiter = rateLimiter(60000, 5); // 5 requests per minute

/**
 * POST /api/waitlist
 * Add email to waitlist
 */
app.post('/api/waitlist', waitlistRateLimiter, async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Email is required',
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                success: false,
                error: 'Please enter a valid email address',
            });
        }

        // Add to waitlist
        const result = await addToWaitlist(email);

        if (result.success) {
            return res.status(200).json({
                success: true,
                message: result.message || "SUBMITTED! We'll be in touch.",
            });
        } else {
            const statusCode = result.duplicate ? 409 : 500; // 409 Conflict for duplicates
            return res.status(statusCode).json({
                success: false,
                error: result.error,
                duplicate: result.duplicate || false,
            });
        }
    } catch (error) {
        console.error('Error in /api/waitlist:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});

/**
 * POST /api/partner
 * Submit partnership request
 */
app.post('/api/partner', partnershipRateLimiter, async (req, res) => {
    try {
        const { organization, contact, email, phone } = req.body;

        // Validate required fields
        if (!organization || !organization.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Organization name is required',
            });
        }

        if (!contact || !contact.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Contact person name is required',
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Email is required',
            });
        }

        if (!phone || !phone.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Phone number is required',
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                success: false,
                error: 'Please enter a valid email address',
            });
        }

        // Add partnership request
        const result = await addPartnershipRequest({
            organization: organization.trim(),
            contact: contact.trim(),
            email: email.trim(),
            phone: phone.trim(),
        });

        if (result.success) {
            return res.status(200).json({
                success: true,
                message: result.message || 'Partnership request submitted successfully!',
            });
        } else {
            const statusCode = result.duplicate ? 409 : 500; // 409 Conflict for duplicates
            return res.status(statusCode).json({
                success: false,
                error: result.error,
                duplicate: result.duplicate || false,
            });
        }
    } catch (error) {
        console.error('Error in /api/partner:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 CORS enabled for: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
    console.log(`📊 DynamoDB Table: ${process.env.DYNAMODB_TABLE_NAME || 'waitlist'}`);
});

