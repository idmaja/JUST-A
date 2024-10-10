const FormatEmail = (email) => {
    const [localPart, domain] = email.split('@'); // Pisahkan bagian sebelum dan sesudah '@'
    if (localPart.length <= 1) return email; // Jika hanya satu karakter sebelum '@', tidak perlu diubah
    const maskedPart = localPart[0] + '*'.repeat(localPart.length - 1); // Karakter pertama + bintang dinamis
    return `${maskedPart}@${domain}`;
}

export default FormatEmail;