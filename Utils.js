import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export function localPath(url, append)
{
    let dirname = path.dirname(fileURLToPath(url));
    return path.join(dirname, append);
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

