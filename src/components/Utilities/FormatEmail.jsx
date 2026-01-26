const FormatEmail = (email) => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 1) return email;
    const maskedPart = localPart[0] + '*'.repeat(localPart.length - 1);
    return `${maskedPart}@${domain}`;
}

export default FormatEmail;