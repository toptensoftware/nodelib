import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


export const monthNames = [
    'January', 'Febrary', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

// Filter an object creating a new object with keys removed
// The callback predicate takes (key, value) of the object being filtered.
// Return true to keep the key, false to remove it
export function filterObject(obj, predicate)
{
    let newObj = {};
    for (let k of Object.keys(obj))
    {
        if (predicate(k, obj[k]))
            newObj[k] = obj[k];
    }
    return newObj;
}

export function promisifyChildProcess(proc)
{
    return new Promise((resolve, reject) => {
        proc.on('exit', resolve);
        proc.on('error', reject);
    });
}

export function changeExtension(filename, newExt)
{
    if (!newExt.startsWith('.'))
        newExt = '.' + newExt;
    let ext = path.extname(filename);
    return filename.substr(0, filename.length - ext.length) + newExt;
}

export async function existsAsync(filename)
{
    try
    {
        await fsPromises.access(filename);
        return true;
    }
    catch (err)
    {
        if (err.code == 'ENOENT')
            return false;
        throw err;
    }
}

export function getMonthName(month)
{
    return monthNames[month-1];
}

export function getDayName(day)
{
    return dayNames[day];
}

export function properCase(stri)
{
    return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
}

export function trimSlashes(str)
{
    while (str.startsWith('/'))
        str = str.substring(1);
    while (str.endsWith('/'))
        str = str.substring(0, str.length-1);
    return str;
}

export function formatLocalDate(d)
{
    let now = new Date();
    d = new Date(d + (now.getTimezoneOffset() * 60000));
    return d.toLocaleDateString(undefined, { dateStyle: "medium" });
}

export function formatDateUtc(d)
{
    d = new Date(d);
    return d.toLocaleDateString(undefined, { dateStyle: "medium" });
}

export function formatLocalTime(d)
{
    let now = new Date();
    d = new Date(d + (now.getTimezoneOffset() * 60000));
    return d.toLocaleTimeString(undefined, { timeStyle: "short" });
}

export function formatTimeUtc(d)
{
    d = new Date(d);
    return d.toLocaleTimeString(undefined, { timeStyle: "short" });
}

export function htmlEncode(str)
{
    return str.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
        return '&#'+i.charCodeAt(0)+';';
    });
}

export function formatTimeRemaining(ms)
{
    let secs = Math.round(ms / 1000);
    if (secs < 60)
    {
        return `${secs} second${secs == 1 ? '' : 's'}`;
    }
    
    let mins = Math.round(secs / 60);
    if (mins < 60)
    {
        return `${mins} minute${mins == 1 ? '' : 's'}`;
    }

    if (mins < 60 * 8 && Math.floor(mins % 60) != 0)
    {
        return `${Math.floor(mins / 60)} hours, ${Math.floor(mins % 60)} minutes`;
    }

    return `${Math.floor(mins / 60)} hours`;
}

export function localPath(url, append)
{
    let dirname = path.dirname(fileURLToPath(url));
    return path.join(dirname, append);
}
