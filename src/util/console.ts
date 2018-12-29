import { clearLine, cursorTo } from 'readline';

export function rewriteLine(message: string, end: boolean = false) {
    clearLine(process.stdout, 0);
    cursorTo(process.stdout, 0);
    process.stdout.write(message + (end ? '\n' : ''));
}
