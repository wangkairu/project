export function uploadExcel(fileName, blob) {
    const elink = document.createElement("a");
    elink.download = fileName;
    elink.style.display = "none";
    let href = URL.createObjectURL(blob);
    elink.href=href
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
    URL.revokeObjectURL(elink.href);
    //
    // URL.revokeObjectURL(href);
}