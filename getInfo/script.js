// Improved Browser and OS Detection
function getBrowserInfo() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("chrome") && !ua.includes("edg")) return "Google Chrome";
    if (ua.includes("firefox")) return "Mozilla Firefox";
    if (ua.includes("safari") && !ua.includes("chrome")) return "Safari";
    if (ua.includes("edg")) return "Microsoft Edge";
    if (ua.includes("opr") || ua.includes("opera")) return "Opera";
    if (ua.includes("msie") || ua.includes("trident")) return "Internet Explorer";
    return "Unknown Browser";
}

function getOSInfo() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("win")) return "Windows";
    if (ua.includes("mac")) return "MacOS";
    if (ua.includes("x11") || ua.includes("linux")) return "Linux";
    if (ua.includes("android")) return "Android";
    if (ua.includes("iphone") || ua.includes("ipad")) return "iOS";
    return "Unknown OS";
}

// Fetch IP Address using a public API
async function fetchIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unavailable';
    }
}

// Get Device Type
function getDeviceType() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscape = width > height;

    // Check if the device has a battery (common for laptops but not desktops)
    const isBatteryPowered = navigator.getBattery ? true : false;

    // Laptop criteria: Larger screen size but with touch or battery (often true for laptops)
    const isLaptop = isBatteryPowered && !isTouchDevice && width >= 1024 && width < 1600;
    
    // Mobile: Smaller screens, usually touch devices
    const isMobile = isTouchDevice && width <= 768;
    
    // Tablet: Medium-sized screens with touch capability
    const isTablet = isTouchDevice && width > 768 && width <= 1024;
    
    // Desktop: Larger screens without touch, or not battery-powered
    const isDesktop = !isTouchDevice && width >= 1600 && !isBatteryPowered;

    if (isMobile) return "Mobile";
    if (isTablet) return "Tablet";
    if (isLaptop) return "Laptop";
    if (isDesktop) return "Desktop";

    // Fallback for unknown device types
    return "Unknown Device";
}



// Get Connection Type
function getConnectionType() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection ? connection.effectiveType : "Unknown";
}

// Get Battery Status
async function getBatteryStatus() {
    if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        return `Level: ${(battery.level * 100)}%, Charging: ${battery.charging ? "Yes" : "No"}`;
    }
    return "Unavailable";
}

// Display Client Information
async function displayClientInfo() {
    const ip = await fetchIPAddress();
    const browser = getBrowserInfo();
    const os = getOSInfo();
    const resolution = `${window.screen.width}x${window.screen.height}`;
    const language = navigator.language;
    const userAgent = navigator.userAgent;
    const deviceType = getDeviceType();
    const connectionType = getConnectionType();
    const batteryStatus = await getBatteryStatus();
    const colorDepth = `${window.screen.colorDepth}-bit`;
    const pixelRatio = window.devicePixelRatio;
    const cookiesEnabled = navigator.cookieEnabled ? "Yes" : "No";
    const javascriptEnabled = "Yes";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = new Date().toLocaleString();
    const doNotTrack = navigator.doNotTrack === "1" ? "Enabled" : "Disabled";
    const onlineStatus = navigator.onLine ? "Online" : "Offline";

    // Display the gathered information
    const info = `
        <p><strong>IP Address:</strong> ${ip}</p>
        <p><strong>Browser:</strong> ${browser}</p>
        <p><strong>Operating System:</strong> ${os}</p>
        <p><strong>Device Type:</strong> ${deviceType}</p>
        <p><strong>Screen Resolution:</strong> ${resolution}</p>
        <p><strong>Color Depth:</strong> ${colorDepth}</p>
        <p><strong>Pixel Ratio:</strong> ${pixelRatio}</p>
        <p><strong>Language:</strong> ${language}</p>
        <p><strong>User Agent:</strong> ${userAgent}</p>
        <p><strong>Connection Type:</strong> ${connectionType}</p>
        <p><strong>Battery Status:</strong> ${batteryStatus}</p>
        <p><strong>Cookies Enabled:</strong> ${cookiesEnabled}</p>
        <p><strong>JavaScript Enabled:</strong> ${javascriptEnabled}</p>
        <p><strong>Timezone:</strong> ${timezone}</p>
        <p><strong>Local Time:</strong> ${localTime}</p>
        <p><strong>Do Not Track:</strong> ${doNotTrack}</p>
        <p><strong>Online Status:</strong> ${onlineStatus}</p>
    `;
    document.getElementById("info").innerHTML = info;
}

window.onload = displayClientInfo;
