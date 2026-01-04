// Email validation - checks format and valid domain
export const validateEmail = (email) => {
    if (!email || !email.trim()) {
        return { isValid: false, error: 'Email is required' };
    }

    const trimmedEmail = email.trim().toLowerCase();
    
    // Basic email format regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(trimmedEmail)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }

    // Check for valid domain structure (must have valid TLD)
    const parts = trimmedEmail.split('@');
    if (parts.length !== 2) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }

    const domain = parts[1];
    const domainParts = domain.split('.');
    
    // Domain must have at least one dot and TLD must be at least 2 characters
    if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
        return { isValid: false, error: 'Please enter a valid email domain' };
    }

    // Check for valid TLD (at least 2 characters, only letters)
    const tld = domainParts[domainParts.length - 1];
    if (!/^[a-z]{2,}$/i.test(tld)) {
        return { isValid: false, error: 'Please enter a valid email domain' };
    }

    // Check domain name is not empty
    if (domainParts[0].length === 0) {
        return { isValid: false, error: 'Please enter a valid email domain' };
    }

    return { isValid: true, error: null };
};

// Phone validation for Dubai and India numbers
export const validatePhone = (phone) => {
    if (!phone || !phone.trim()) {
        return { isValid: false, error: 'Phone number is required' };
    }

    // Remove all spaces, dashes, and parentheses for easier validation
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Dubai phone numbers:
    // +971XXXXXXXXX (12 digits total: +971 + 9 digits)
    // 971XXXXXXXXX (12 digits: 971 + 9 digits)
    // 0XXXXXXXXX (10 digits: 0 + 9 digits)
    // XXXXXXXXX (9 digits)
    
    // India phone numbers:
    // +91XXXXXXXXXX (13 digits total: +91 + 10 digits)
    // 91XXXXXXXXXX (12 digits: 91 + 10 digits)
    // 0XXXXXXXXXX (11 digits: 0 + 10 digits)
    // XXXXXXXXXX (10 digits)

    // Check for Dubai numbers
    const dubaiPatterns = [
        /^\+971[5-9]\d{8}$/,           // +971 followed by 9 digits starting with 5-9
        /^971[5-9]\d{8}$/,             // 971 followed by 9 digits starting with 5-9
        /^0[5-9]\d{8}$/,               // 0 followed by 9 digits starting with 5-9
        /^[5-9]\d{8}$/                 // 9 digits starting with 5-9
    ];

    // Check for India numbers
    const indiaPatterns = [
        /^\+91[6-9]\d{9}$/,            // +91 followed by 10 digits starting with 6-9
        /^91[6-9]\d{9}$/,              // 91 followed by 10 digits starting with 6-9
        /^0[6-9]\d{9}$/,               // 0 followed by 10 digits starting with 6-9
        /^[6-9]\d{9}$/                 // 10 digits starting with 6-9
    ];

    const isDubai = dubaiPatterns.some(pattern => pattern.test(cleanedPhone));
    const isIndia = indiaPatterns.some(pattern => pattern.test(cleanedPhone));

    if (isDubai || isIndia) {
        return { isValid: true, error: null, country: isDubai ? 'dubai' : 'india' };
    }

    return { 
        isValid: false, 
        error: 'Please enter a valid phone number from Dubai or India (e.g., +971501234567 or +919876543210)' 
    };
};

// Format phone number for display
export const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    
    // If starts with +971, format as +971 XX XXX XXXX
    if (cleaned.startsWith('+971') && cleaned.length === 13) {
        return `+971 ${cleaned.slice(4, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
    }
    
    // If starts with 971 (without +), format similarly
    if (cleaned.startsWith('971') && cleaned.length === 12) {
        return `+971 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }
    
    // If starts with 0 and 10 digits (Dubai), format as +971
    if (cleaned.startsWith('0') && cleaned.length === 10 && /^0[5-9]/.test(cleaned)) {
        return `+971 ${cleaned.slice(1, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    
    // If starts with +91, format as +91 XXXXX XXXXX
    if (cleaned.startsWith('+91') && cleaned.length === 13) {
        return `+91 ${cleaned.slice(3, 8)} ${cleaned.slice(8)}`;
    }
    
    // If starts with 91 (without +), format similarly
    if (cleaned.startsWith('91') && cleaned.length === 12) {
        return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    }
    
    // If starts with 0 and 11 digits (India), format as +91
    if (cleaned.startsWith('0') && cleaned.length === 11 && /^0[6-9]/.test(cleaned)) {
        return `+91 ${cleaned.slice(1, 6)} ${cleaned.slice(6)}`;
    }
    
    return phone; // Return original if no format matches
};

