export function isValidISBN(isbn) {
    if (!/^\d{13}$/.test(isbn)) {
        return false; // not 13 digits
    }

    if (isbn.charAt(0) !== "9") {
        return false; // doesn't start with 9
    }

    // Compute weighted sum checksum
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        let digit = parseInt(isbn.charAt(i));
        sum += (i % 2 === 0) ? digit : digit * 3;
    }
    let checksum = (10 - (sum % 10)) % 10;

    return parseInt(isbn.charAt(12)) === checksum;
}

