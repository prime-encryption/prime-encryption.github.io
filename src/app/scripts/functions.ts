export function copyToClipboard(str: string) {
    let el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.display = "none";
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 9999999);
    document.execCommand('copy');
    document.body.removeChild(el);
}