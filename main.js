// 1. التأكد إننا مش في صفحة الدعم لمنع اللوب
if (window.location.href.includes("samyahmed480.github.io/su-s")) {
    console.log("نحن الآن في صفحة الدعم، تم إيقاف الفحص.");
} else {
    // 2. استخراج الكود من الميتا تاج
    const metaTag = document.querySelector('meta[name="client_code"]');
    const clientCode = metaTag ? metaTag.getAttribute('content') : null;

    // 3. رابط صفحة الدعم الصحيح بتاعك
    const supportPage = "https://samyahmed480.github.io/su-s/"; 
    
    // 4. رابط جوجل شيت بتاعك (من الصورة اللي إنت بعتها)
    const googleSheetURL = "https://script.google.com/macros/s/AKfycbwjmU9Np1K-B2bUmsdYAjrkuGbKsMYPnfxOVdl29MqbEcd7RtURRvL2frx1Vq2b4yLJqQ/exec";

    // 5. الفحص والتحويل
    if (!clientCode) {
        window.location.replace(supportPage);
    } else {
        fetch(googleSheetURL)
            .then(response => response.json())
            .then(data => {
                // لو الكود مش موجود في الشيت أو حالته 2 (موقوف)
                if (!data.hasOwnProperty(clientCode) || data[clientCode].status === "2") {
                    window.location.replace(supportPage);
                } 
                // لو الكود حالته 1 (شغال)
                else if (data[clientCode].status === "1") {
                    console.log("رخصة الموقع فعالة.");
                }
            })
            .catch(error => {
                console.error("خطأ في الاتصال بالخادم:", error);
            });
    }
}
